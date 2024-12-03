<template>
	<div class="slider-container" ref="container">
		<div class="viewport" ref="viewport" @mousemove="pointerMove()" @pointerenter="pointerEnter" @pointerleave="pointerLeave">
			<div class="slider" ref="slider">
				<div v-for="(image, index) in images" :key="index" class="slide" @click="onSlideClick">
					<Img 
						:src="image?.asset?.url" 
						:alt="image?.alt" 
						:lazy="index === 0 ? 'eager' : 'lazy'"
						:priority="index === 0 ? 'high' : 'auto'"
						v-if="image"
					/>
				</div>
			</div>
		</div>
		<div class="counter"><span>{{ selectedScrollSnapWithPadding }}</span> | {{ totalImages }}</div>
	</div>
</template>

<script setup>

import emblaCarouselVue from 'embla-carousel-vue'

const props = defineProps({
	images: Array,
})

const [viewport, embla] = emblaCarouselVue({
	loop: true,
	align: 'start',
	containScroll: 'trimSnaps',
})

const selectedScrollSnap = ref(0)
const canScrollPrev = ref(false)
const canScrollNext = ref(true)

const selectedScrollSnapWithPadding = computed(() => {
	let index = selectedScrollSnap.value + 1
	return index.toString().padStart(2, '0')
})

const totalImages = computed(() => {
	let length = props.images.length
	return length.toString().padStart(2, '0')
})

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
    for (let i = 1; i <= 1; i++) {
        setEagerLoading(selectedScrollSnap.value + i)
    }
    // Previous X slides
    for (let i = 1; i <= 2; i++) {
        setEagerLoading(selectedScrollSnap.value - i)
    }
}

const onSelect = () => {
	selectedScrollSnap.value = embla.value.selectedScrollSnap()
	canScrollPrev.value = embla.value.canScrollPrev()
	canScrollNext.value = embla.value.canScrollNext()

	if (window.matchMedia('(max-width: 767px)').matches) {
		setEagerLoadingForClosestSlides()
	}
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
    flex-flow: column nowrap;
    align-items: center;
	aspect-ratio: 4 / 3;
	width: 100vw;
	margin: 0 calc(50% - 50vw);
	display: none;
	@include media('phone') {
		display: flex;
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
				}
			}
		}
	}
	div.counter {
		position: absolute;
		bottom: calc(var(--padding-base) - 5px);
		right: var(--padding-base);
		flex-shrink: 0;
		font-family: var(--font-sans);
		font-size: 20px;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		span {
			color: var(--color-highlight);
		}
	}
}

</style>