
import { Swiper, Navigation, Pagination } from 'swiper/js/swiper.esm'

window.addEventListener('load', () => {
  Swiper.use([Navigation, Pagination]);

  function isTouchable() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)
  }
  let _breakPoints = breakPointSetter()

  function breakPointSetter(key = "init") {
    let breakPoints = {
      desktop: { active: false, width: 1440 },
      between: { active: false, width: 1339 },
      tablet: { active: false, width: 1024 },
      mobile: { active: false, width: 767 }
    }

    if (key in breakPoints) {
      for (let porop in breakPoints) {
        breakPoints[porop].active = false
      }
      breakPoints[key].active = true
    }

    if (key === "init")
      return breakPoints
    else
      _breakPoints = breakPoints
  }
  const directions = getDirection()

  const _slides = document.querySelectorAll('.directions .container .swiper-container .swiper-wrapper .direction')
  const _menuList = document.querySelector('.header .container .menu .menu__list')
  _menuList.addEventListener('click', changeActiveDirection)

  let swiper = initSlider()

  function getDirection() {
    const menu = document.querySelectorAll('.header .container .menu .menu__list .menu__item')
    const directionsObj = {}
      ;[...menu].forEach((dir) => {
        // console.log(dir)
        directionsObj[dir.getAttribute('data-direction')] = dir.classList.contains('menu__item_active') ? true : false
      })
    return directionsObj
  }

  function changeActiveDirection(e) {
    const dir = e.target.getAttribute('data-direction')
    if (dir in directions) {
      for (let key in directions) {
        directions[key] = false
      }
      directions[dir] = true
      styleDirectionItems(e.target, dir)
    }
  }

  function styleDirectionItems(elem, attr) {
    const ACTIVE_CLASS_FOR_MENU_ITEM = 'menu__item_active'
    if (!elem.classList.contains(ACTIVE_CLASS_FOR_MENU_ITEM)) {
      [..._menuList.children].forEach(child => {
        if (child.getAttribute('data-direction') === attr)
          child.classList.add(ACTIVE_CLASS_FOR_MENU_ITEM)
        else
          child.classList.remove(ACTIVE_CLASS_FOR_MENU_ITEM)
      })
      filterDirection(attr)
      return true
    } else {
      return false
    }
  }

  function filterDirection(attr) {
    swiper.removeAllSlides();
    if (attr === 'allDirections') {
      swiper.appendSlide(_slides)
    } else {
      ;[..._slides].forEach(slide => {
        if (slide.getAttribute('data-direction') === attr)
          swiper.appendSlide(slide)
      })
    }
    swiper.destroy();
    swiper = initSlider()
  }

  function stylesController(activeIndex, swiperParams) {
    const slides = [...document.querySelectorAll('.directions .container .swiper-container .swiper-wrapper .direction')]
    makeBoxShadow(activeIndex, swiperParams, slides)
    setHoverReaction(activeIndex, swiperParams, slides)
  }

  function makeBoxShadow(activeIndex, swiperParams, slides) {
    const BOX_SHADOW_CLASS = 'direction_shadow'
    const slidesPerView = swiperParams.slidesPerView
    const slidesPerColumn = swiperParams.slidesPerColumn
    slides.forEach((slide, ind) => {
      if (ind >= activeIndex * 2 && ind < (slidesPerView * slidesPerColumn + activeIndex * 2))
        slide.classList.add(BOX_SHADOW_CLASS)
      else
        slide.classList.remove(BOX_SHADOW_CLASS)
    })
  }

  function setHoverReaction(activeIndex, swiperParams, slides) {
    const slidesPerView = swiperParams.slidesPerView
    const slidesPerColumn = swiperParams.slidesPerColumn
    activeIndex *= 4
    const RIGHT_HOVER_FOR_SLIDE = 'direction_right'
    const LEFT_HOVER_FOR_SLIDE = 'direction_left'
    const RIGHT_HOVER_FOR_MORE = 'direction__more_right'
    const LEFT_HOVER_FOR_MORE = 'direction__more_left'
    slides.forEach((slide, ind) => {
      if (ind >= activeIndex && ind >= Number(((slidesPerView * slidesPerColumn + activeIndex) / 2))) {
        slide.classList.remove(RIGHT_HOVER_FOR_SLIDE)
        slide.classList.add(LEFT_HOVER_FOR_SLIDE)
        slide.querySelector('.direction__more').classList.remove(RIGHT_HOVER_FOR_MORE)
        slide.querySelector('.direction__more').classList.add(LEFT_HOVER_FOR_MORE)
      } else {
        slide.classList.remove(LEFT_HOVER_FOR_SLIDE)
        slide.classList.add(RIGHT_HOVER_FOR_SLIDE)
        slide.querySelector('.direction__more').classList.remove(LEFT_HOVER_FOR_MORE)
        slide.querySelector('.direction__more').classList.add(RIGHT_HOVER_FOR_MORE)
      }
    })
  }

  function onElementHover(e) {
    const elem = e instanceof Element ? e : e.target
    const moreInfo = elem.querySelector('.direction__more')
    const width = elem.getBoundingClientRect().width
    const marginRight = parseInt(elem.style.marginRight)
    const br = '.4rem'
    const p = '1.5rem'
    if (elem.classList.contains('direction_right')) {
      moreInfo.style.left = '0px'
      moreInfo.style.width = `calc(${width}px * 3 + ${marginRight}px * 2  + 2px)`
      moreInfo.style.paddingTop = p
      moreInfo.style.paddingBottom = p
      moreInfo.style.paddingLeft = `calc(${width}px + ${p})`
      moreInfo.style.paddingRight = p
      moreInfo.style.borderRadius = br
    }
    else {
      moreInfo.style.left = '0px'
      moreInfo.style.width = `calc(${width}px * 2 + ${marginRight}px * 2 + 2px)`
      moreInfo.style.paddingTop = p
      moreInfo.style.paddingBottom = p
      moreInfo.style.paddingLeft = p
      moreInfo.style.paddingRight = p
      moreInfo.style.transform = 'translateX(-100%)'
      moreInfo.style.borderRadius = `${br} 0 0 ${br}`
    }
  }
  function onElementLeave(e) {
    const elem = e instanceof Element ? e : e.target
    const moreInfo = elem.querySelector('.direction__more')
    moreInfo.style.left = ''
    moreInfo.style.width = ``
    moreInfo.style.paddingTop = ''
    moreInfo.style.paddingBottom = ''
    moreInfo.style.paddingLeft = ''
    moreInfo.style.paddingRight = ``
    moreInfo.style.borderRadius = ''
    moreInfo.style.transform = ''
  }

  function settingForDesktop() {
    const slider = new Swiper('.swiper-container', {
      slidesPerView: 6,
      slidesPerColumn: 2,
      spaceBetween: 30,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.directions .container .swiper-buttons .swiper-button_next',
        prevEl: '.directions .container .swiper-buttons .swiper-button_prev',
      },
    })
    slider.on("slideChange", () => {
      stylesController(slider.activeIndex, slider.passedParams)
    })
    stylesController(slider.activeIndex, slider.passedParams)

      ;[..._slides].forEach(slide => {
        slide.addEventListener('mouseenter', onElementHover)
        slide.addEventListener('mouseleave', onElementLeave)
      })

    return slider
  }

  function settingForTablet() {
    console.log("TABLET SET")
    const slider = new Swiper('.swiper-container', {
      slidesPerView: 3,
      slidesPerColumn: 2,
      spaceBetween: 30,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.directions .container .swiper-buttons .swiper-button_next',
        prevEl: '.directions .container .swiper-buttons .swiper-button_prev',
      },
    })
    slider.on("slideChange", () => {
      stylesController(slider.activeIndex, slider.passedParams)
    })
    stylesController(slider.activeIndex, slider.passedParams)
      ;[..._slides].forEach(slide => {
        slide.addEventListener('click', () => {
          const prevActiveEl = document.querySelector('#dirWrap .hovered')
          if (prevActiveEl) {
            prevActiveEl.classList.remove('hovered')
            onElementLeave(prevActiveEl)
          }
          slide.classList.add('hovered')
          onElementHover(slide)
        })
      })

    return slider
  }

  function initSlider() {
    // console.log("window.innerWidth:", window.innerWidth)
    // console.log("_breakPoints:", _breakPoints.between.width)
    // console.log("_breakPoints:", _breakPoints.tablet.width)
    // console.log("isTouchable:", !isTouchable())
    // console.log("_breakPoints:", _breakPoints)
    if (window.innerWidth >= _breakPoints.desktop.width &&
      !_breakPoints.desktop.active) {
      console.log(1)
      breakPointSetter("desktop")
      return settingForDesktop()
    }
    else if (window.innerWidth <= _breakPoints.between.width &&
      window.innerWidth > _breakPoints.tablet.width &&
      !isTouchable() &&
      !_breakPoints.desktop.active) {
      console.log(2)
      breakPointSetter("desktop")
      return settingForDesktop()
    }
    else if (window.innerWidth <= _breakPoints.between.width &&
      window.innerWidth > _breakPoints.tablet.width &&
      isTouchable() &&
      !_breakPoints.tablet.active) {
      breakPointSetter("tablet")
      return settingForTablet()
    }
    else if (window.innerWidth <= _breakPoints.tablet.width &&
      window.innerWidth > _breakPoints.mobile.width &&
      !_breakPoints.tablet.active) {
      breakPointSetter("tablet")
      return settingForTablet()
    }
    else {
      console.log("nothing")
    }
  }

  window.addEventListener('resize', () => {
    initSlider()
  })
})