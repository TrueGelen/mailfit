window.addEventListener('load', () => {
	const from561 = `<h2 class="mainTitle targetAudience__title">Целевая<br>аудитория</h2>
	<div class="targetAudience__audience">
		<p>Мужчины, женщины</p>
		<p><span>Возраст:</span> 25+</p>
		<p><span>Доход:</span> ниже среднего, средний,<br> выше среднего</p>
		<p><span>Средний размер домохозяйства:</span><br> 3 человека</p>
		<p><span>Интересы:</span> кулинария, свежие<br>и качественные продукты, семья<br>и семейный досуг.</p>`

	const to560 = `<h2 class="mainTitle targetAudience__title">Целевая аудитория</h2>
		<div class="targetAudience__audience">
			<p>Мужчины, женщины</p>
			<p><span>Возраст:</span> 25+</p>
			<p><span>Доход:</span> ниже среднего, средний, выше среднего</p>
			<p><span>Средний размер домохозяйства:</span> 3 человека</p>
			<p><span>Интересы:</span> кулинария, свежие и качественные продукты, семья и семейный досуг.</p>`

	const targetAudience__content = document.querySelector('.uniqueizer11221 .targetAudience .container .targetAudience__content')

	function buildHtml() {
		if (window.innerWidth <= 560)
			targetAudience__content.innerHTML = to560
		else
			targetAudience__content.innerHTML = from561
	}

	buildHtml()

	window.addEventListener('resize', () => {
		buildHtml()
	})
})