
import { Swiper, Navigation } from 'swiper/js/swiper.esm'

window.addEventListener('load', () => {

	Swiper.use([Navigation]);

	const slider = new Swiper('.slider .slider__content .slider__wrapperSwiper .slider__swiper-container', {
		loop: true,
		slidesPerView: 1,
		speed: 500,
		navigation: {
			prevEl: '.slider .slider__content .slider__wrapperSwiper .slider__buttons .slider__btn_left',
			nextEl: '.slider .slider__content .slider__wrapperSwiper .slider__buttons .slider__btn_right',
		}
	})

	slider.on('slideChange', moveCurtain)

	const curtain = document.querySelector('.slider .slider__content .slider__wrapperSwiper .slider__swiper-container .slider__curtain')

	function endOfTrans() {
		curtain.style.transitionTimingFunction = 'cubic-bezier(1,.02,.81,1.16)'
		curtain.style.left = '100%'
		curtain.removeEventListener('transitionend', endOfTrans)
	}

	function moveCurtain() {
		curtain.style.transitionTimingFunction = 'ease'
		curtain.style.left = '0'
		curtain.addEventListener('transitionend', endOfTrans)
	}

})


