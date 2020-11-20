
import { Swiper, Navigation, Pagination } from 'swiper/js/swiper.esm'

window.addEventListener('load', () => {
  Swiper.use([Navigation, Pagination]);

  let swiper = initSlider()

  const ACTIVE_CLASS_FOR_MENU_ITEM = 'menu__item_active'
  const directions = getDirection()

  const menuList = document.querySelector('.header .container .menu .menu__list')
  menuList.addEventListener('click', changeActiveDirection)

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
    if (!elem.classList.contains(ACTIVE_CLASS_FOR_MENU_ITEM)) {
      [...menuList.children].forEach(child => {
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

  const _slides = document.querySelectorAll('.directions .container .swiper-container .swiper-wrapper .direction')
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

  function initSlider() {
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
    return slider
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
})