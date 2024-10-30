function vh() {
	let vh = window.innerHeight * 0.01
	document.documentElement.style.setProperty('--vh', `${vh}px`)
}

export default defineNuxtPlugin(nuxtApp => {
	vh()
	window.addEventListener('resize', () => vh())
})