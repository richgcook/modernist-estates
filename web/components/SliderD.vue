<template>
	<div class="slider-container" ref="container">
		<div class="viewport" ref="viewport" @mousemove="pointerMove()" @pointerenter="pointerEnter" @pointerleave="pointerLeave">
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
		<div class="caption-counter" v-if="slides.length > 1">
			<div class="caption"><RichText :blocks="slides[selectedScrollSnap].caption" /></div>
			<div class="counter"><span>{{ selectedScrollSnapWithPadding }}</span> | {{ totalImages }}</div>
		</div>
	</div>
</template>

<script setup>

import emblaCarouselVue from 'embla-carousel-vue'

const props = defineProps({
	slides: Array,
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
	let length = props.slides.length
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

const firstImageAspectRatio = () => {
	console.log(props.slides)
	const firstImage = props.slides[0].image
	if (!firstImage) return `4/3`
	return firstImage.asset.ratio
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
	aspect-ratio: v-bind('firstImageAspectRatio()');
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
	div.caption-counter {
		display: grid;
		grid-template-columns: 1fr 150px;
		grid-column-gap: var(--padding-base);
		font-family: var(--font-sans);
		font-size: 16px;
		margin-top: 10px;
		@include media('laptop') {
			font-size: 14px;
		}
		@include media('tablet-portrait-and-phone') {
			font-size: var(--font-size-xs);
			margin: 10px var(--padding-base) 0 var(--padding-base);
		}
		div.counter {
			text-align: right;
			span {
				color: var(--color-highlight);
			}
		}
	}
}

</style>