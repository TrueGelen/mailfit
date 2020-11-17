import Rellax from 'rellax'

window.addEventListener('load', () => {
  new Rellax('.firstBlock__triangle', {
    // speed: (window.innerWidth > 768) ? 4 :
    //   (window.innerWidth > 560) ? 3 : 2,
    speed: 2,
    center: false,
    round: true,
    vertical: true,
    horizontal: false
  })

  new Rellax('.decision__triangle', {
  	/* speed: (window.innerWidth > 768) ? -2 :
  		(window.innerWidth > 560) ? 3 : 2, */
    speed: 2,
    center: false,
    round: true,
    vertical: true,
    horizontal: false
  })

  new Rellax('.result__triangle', {
  	/* speed: (window.innerWidth > 768) ? -2 :
  		(window.innerWidth > 560) ? 3 : 2, */
    speed: 3,
    center: false,
    round: true,
    vertical: true,
    horizontal: false
  })
})