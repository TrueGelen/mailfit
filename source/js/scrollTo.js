window.addEventListener('load', () => {
	const firstButton = document.querySelector('.uniqueizer11221 .firstBlock .firstBlock__container .firstBlock__arrow')
	const tasksBlock = document.querySelector('#forFirstButton')

	firstButton.addEventListener('click', (e) => {
		tasksBlock.scrollIntoView({
			behavior: "smooth",
			block: "start"
		})
	})
})