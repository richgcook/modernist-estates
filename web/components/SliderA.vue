<template>
	<div class="slider-container" ref="container">
		<div class="viewport" ref="viewport">
			<div class="slider" ref="slider">
				<template v-for="(slide, index) in slides" :key="index">
					<div class="slide" @click="onSlideClick">
						<Img 
							:src="slide.image?.asset?.url"
							:alt="slide.image?.alt"
							:loading="index == 0 ? `eager` : `lazy`"
							:priority="index == 0 ? `high` : `auto`"
						/>
					</div>
				</template>
			</div>
		</div>
		<div class="caption">
			<h3>Testimonials</h3>
			<h2>{{ slides[selectedScrollSnap].quote }}</h2>
		</div>
	</div>
</template>

<script setup>

import { useThemeModeStore } from '~/store/themeMode'
import { storeToRefs } from 'pinia'

import emblaCarouselVue from 'embla-carousel-vue'
import Autoplay from 'embla-carousel-autoplay'
import Fade from 'embla-carousel-fade'

const props = defineProps({
	slides: Array,
})

const [viewport, embla] = emblaCarouselVue({
	align: 'start',
	loop: true,
}, [
	Autoplay({
		delay: 5000,
		stopOnInteraction: false,
		stopOnFocusIn: false,
	 }),
	 Fade(),
])

const container = ref(null)

const scrollSnaps = ref([])
const selectedScrollSnap = ref(0)
const canScrollPrev = ref(false)
const canScrollNext = ref(true)

const processedSlides = new Set()
processedSlides.add(0)

const setEagerLoading = (index) => {
    const allSlides = embla.value.slideNodes()
    const totalSlides = allSlides.length

	 // Wrap the index around if it is out of bounds
	const validIndex = (index + totalSlides) % totalSlides

	if (!processedSlides.has(validIndex)) {
        const slide = allSlides[validIndex]
		const images = slide.querySelectorAll('img')

		if (images?.length) {
			images.forEach(image => {
				image.setAttribute('loading', 'eager')
				// Mark this slide as processed
				processedSlides.add(validIndex)
			})
		}
    }
	
}

const setEagerLoadingForClosestSlides = () => {
    // Next X slides
    for (let i = 1; i <= 2; i++) {
        setEagerLoading(selectedScrollSnap.value + i)
    }
    // Previous X slides
    for (let i = 1; i <= 2; i++) {
        setEagerLoading(selectedScrollSnap.value - i)
    }
}

const onSelect = () => {
	scrollSnaps.value = embla.value.scrollSnapList()
	selectedScrollSnap.value = embla.value.selectedScrollSnap()
	canScrollPrev.value = embla.value.canScrollPrev()
	canScrollNext.value = embla.value.canScrollNext()

	setEagerLoadingForClosestSlides()
}

watchEffect(() => {
	if (!embla.value) return
	setTimeout(() => {
		embla.value.reInit()
	}, 100)
})

onMounted(() => {
	if (embla.value) {
		embla.value.on('select', onSelect)
		onSelect()
	}
})

</script>

<style lang="scss" scoped>

div.slider-container {
	position: relative;
	display: flex;
    flex-flow: column nowrap;
    align-items: center;
	aspect-ratio: 4 / 2;
	margin: 0 var(--padding-base);
	@include media('phone') {
		aspect-ratio: 4 / 3;
		margin: 0;
		background-color: var(--color-lettings);
	}
	div.viewport {
		position: relative;
		height: 100%;
		width: 100%;
		overflow: hidden;
		touch-action: manipulation;
		div.slider {
			position: absolute;
			top: 0;
			left: 0;
			height: 100%;
			width: 100%;
			display: flex;
			flex-flow: row nowrap;
			div.slide {
				flex-shrink: 0;
				height: 100%;
				width: 100%;
				position: relative;
				&:after {
					content: '';
					position: absolute;
					inset: 0;
					height: 100%;
					width: 100%;
					background-color: rgba(0, 0, 0, 0.3);
					z-index: 1;
					@include media('phone') {
						content: none;
					}
				}
				img, video {
					position: absolute;
					inset: 0;
					height: 100%;
					width: 100%;
					max-width: none;
					max-height: none;
					object-fit: cover;
					object-position: center;
					user-select: none;
					@include media('phone') {
						display: none;
					}
				}
			}
		}
	}
	div.caption {
		position: absolute;
		width: 75%;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 1;
		color: white;
		text-align: center;
		display: grid;
		row-gap: 10px;
		@include media('phone') {
			color: black;
		}
		h3 {
			font-family: var(--font-sans);
			font-size: 20px;
			font-weight: 900;
			text-transform: uppercase;
			letter-spacing: 0.1em;
			@include media('phone') {
				font-size: 12px;
			}
		}
		h2 {
			font-size: var(--font-size-lg);
			line-height: 1.25;
			letter-spacing: 0.02em;
		}
	}
}

</style>