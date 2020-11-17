window.addEventListener('load', () => {
  const lines = [...document.querySelectorAll('.titleLine')]

  window.addEventListener('scroll', () => {
    showLine()
  })

  function showLine() {
    lines.forEach(line => {
      if (window.pageYOffset >= ((line.getBoundingClientRect().y + window.pageYOffset) - window.innerHeight / 100 * 80)) {
        if (!line.classList.contains('titleLine_show'))
          line.classList.add('titleLine_show')
      }
      if (window.pageYOffset >= ((line.getBoundingClientRect().y + window.pageYOffset) - window.innerHeight / 100 * 0.1) || line.getBoundingClientRect().y + window.pageYOffset > window.pageYOffset + window.innerHeight) {
        if (line.classList.contains('titleLine_show'))
          line.classList.remove('titleLine_show')
      }
    })
  }
  showLine()
})