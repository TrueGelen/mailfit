var gulp = require('gulp'),
  sass = require('gulp-sass'),
  browserSync = require('browser-sync'),
  notify = require('gulp-notify'),
  smartgrid = require('smart-grid'),
  gcmq = require('gulp-group-css-media-queries'),
  autoprefixer = require('gulp-autoprefixer'),
  cleanCSS = require('gulp-clean-css'),
  del = require('del'),
  gulpif = require('gulp-if'),
  sourcemaps = require('gulp-sourcemaps'),
  webpack = require('webpack-stream'),
  svgSprite = require('gulp-svg-sprite'),
  svgmin = require('gulp-svgmin'),
  cheerio = require('gulp-cheerio'),
  replace = require('gulp-replace');

let isDev = false
let isProd = !isDev
let isSync = false

/* It's principal settings in smart grid project */
var settings = {
  outputStyle: 'sass', /* less || scss || sass || styl */
  columns: 12, /* number of grid columns */
  offset: '30px', /* gutter width px || % || rem */
  mobileFirst: false, /* mobileFirst ? 'min-width' : 'max-width' */
  container: {
    maxWidth: 'calc(91.1%)', /* max-width оn very large screen */
    fields: '30px' /* side fields */
  },
  breakPoints: {
    // elg: {
    // 	width: '1440px', /* -> @media (max-width: 1100px) */
    // },
    // lg: {
    // 	width: '1440px',
    // },
    md: {
      width: '1439px'
    },
    sm: {
      width: '767px',
      fields: '30px',/* set fields only if you want to change container.fields */
      offset: '0px'
    },
    // xs: {
    // 	width: '560px',
    // 	fields: '15px',
    // 	offset: '0px'

    // },
    // xxs: {
    // 	width: '420px',
    // 	fields: '15px',
    // 	offset: '0px'
    // }
  }
};

smartgrid('./source/scss', settings);

//for getting an actual flag isDev
function getWebpackConfig(isDev) {
  let webpackConfig = {
    output: {
      filename: 'bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          loader: 'babel-loader',
          exclude: /(node_modules|bower_components)/
        }
      ]
    },
    mode: isDev ? 'development' : 'production',
    devtool: isDev ? 'cheap-module-eval-source-map' : false,
  }

  return webpackConfig
}

gulp.task('js', function () {
  return gulp.src('./source/js/main.js')
    .pipe(webpack(getWebpackConfig(isDev)))
    .pipe(gulp.dest('./dist/js'))
    .pipe(gulpif(isSync, browserSync.stream()))
});

gulp.task('styles', function () {
  //return gulp.src('app/sass/*.+(sass|scss)')
  return gulp.src('source/scss/main.scss')
    .pipe(gulpif(isDev, sourcemaps.init()))
    .pipe(sass({ outputStyle: 'expanded' }).on("error", notify.onError()))
    .pipe(gcmq())
    .pipe(gulpif(isProd, autoprefixer({
      overrideBrowserslist: ["last 2 versions"],
      cascade: false
    })))
    .pipe(gulpif(isProd, cleanCSS({ level: 2 })))
    .pipe(gulpif(isDev, sourcemaps.write()))
    .pipe(gulp.dest('dist/css'))
    .pipe(gulpif(isSync, browserSync.reload({ stream: true })))
});

gulp.task('makeSvgSprite', function (done) {
  //[simpleSvg, difficultSvg]
  const arrOfPath = ['./source/svg/*.svg', './source/svg/dif/*.svg']
  for (let i = 0; i < arrOfPath.length; i++) {
    if (i === 0)
      makeSprite(arrOfPath[i], false)
    else
      makeSprite(arrOfPath[i], true)
  }

  function makeSprite(srcPath, isDif) {
    console.log(srcPath, isDif)
    return gulp.src(srcPath)
      .pipe(svgmin())
      .pipe(gulpif(!isDif, cheerio({
        run: function ($) {
          $('[fill]').removeAttr('fill');
          $('[stroke]').removeAttr('stroke');
          $('[style]').removeAttr('style');
        },
        parserOptions: { xmlMode: true }
      })))
      .pipe(replace('&gt;', '>'))
      .pipe(svgSprite({
        mode: {
          symbol: {
            dest: '',
            sprite: !isDif ? 'sprite.svg' : 'difsprite.svg'
          }
        },
        svg: {
          namespaceClassnames: ''
        }
      }))
      .pipe(gulp.dest('./dist/svgSprite/'))
  }
  done()
})

gulp.task('browser-sync', function () {
  browserSync({
    server: {
      baseDir: './dist/'
    },
    notify: false
  });
});

gulp.task('cleanDist', async function () {
  const notToDel = [
    'dist/**',
    '!dist/img',
    '!dist/fonts',
    '!dist/video'
  ]
  const deletedPaths = await del(notToDel);
  console.log('Deleted files and directories:\n', deletedPaths.join('\n'));
})

gulp.task('html', function () {
  return gulp.src('./source/*.html')
    .pipe(gulp.dest('./dist/'))
    .pipe(gulpif(isSync, browserSync.stream()))
})

function devFlags(done) {
  isSync = true
  isDev = true
  done()
}

function prodFlags(done) {
  isSync = true
  isDev = false
  done()
}

function smallProd(done) {
  isSync = false
  isDev = false
  done()
}

function watcher() {
  gulp.watch('source/scss/**/*.+(sass|scss)', gulp.parallel('styles'))
  gulp.watch('./source/*.html', gulp.parallel('html'))
  gulp.watch('source/js/*.js', gulp.parallel('js'))
}

gulp.task('dev', gulp.series(devFlags, 'makeSvgSprite', 'html', 'styles', 'js', gulp.parallel('browser-sync', watcher)))
gulp.task('build', gulp.series('cleanDist', prodFlags, 'makeSvgSprite', 'html', 'styles', 'js', gulp.parallel('browser-sync', watcher)))
gulp.task('fast', gulp.series('cleanDist', smallProd, 'makeSvgSprite', 'html', 'styles', 'js'))
