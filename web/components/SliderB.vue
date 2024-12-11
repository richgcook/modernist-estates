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
import { useCursorStore } from '~/store/cursor'

const props = defineProps({
	images: Array,
	mediaOverlayOpen: Boolean,
})

const [viewport, embla] = emblaCarouselVue({
	loop: true,
	align: 'start',
	containScroll: 'trimSnaps',
})

const cursorStore = useCursorStore()

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

	if (props.mediaOverlayOpen) {
		setEagerLoadingForClosestSlides()
	}
	
}

const pointerPosition = ref(null)

const pointerMove = () => {
	const target = viewport.value
	const targetBounds = target.getBoundingClientRect()
    const xRelativeToTarget = event.clientX - targetBounds.left
	if (xRelativeToTarget < target.offsetWidth/2) {
		pointerPosition.value = 'left'
		cursorStore.setDirection('left')
	} else {
		pointerPosition.value = 'right'
		cursorStore.setDirection('right')
	}
}

const pointerEnter = (event) => {
	if (event.pointerType !== 'mouse') return
	cursorStore.turnOn()
}

const pointerLeave = (event) => {
	if (event.pointerType !== 'mouse') return
	cursorStore.turnOff()
}

const pointerPositionReset = () => {
	pointerPosition.value = null
}

const onSlideClick = () => {
	const target = viewport.value
	const targetBounds = target.getBoundingClientRect()
    const xRelativeToTarget = event.clientX - targetBounds.left
	slideToFromClick(xRelativeToTarget, target.offsetWidth)
}

const slideToFromClick = (xRelativeToTarget, targetWidth) => {
	if (xRelativeToTarget < targetWidth/2) {
		embla.value.scrollPrev()
	} else {
		embla.value.scrollNext()
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
	height: 100%;
	display: flex;
    flex-flow: column nowrap;
    align-items: center;
	row-gap: var(--padding-base);
	div.viewport {
		position: relative;
		height: 100%;
		width: 100%;
		overflow: hidden;
		touch-action: manipulation;
		cursor: none;
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
					top: 50%;
					left: 50%;
					height: calc(100% - ((var(--padding-base) * 4) + 28px));
					width: calc(100% - (var(--padding-base) * 2));
					transform: translate(-50%, -50%);
					max-width: none;
					object-fit: contain;
					object-position: center;
					@include media('phone') {
						height: calc(100% - ((var(--padding-base) * 4) + 20px));
					}
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
		font-size: var(--font-size-sm);
		text-transform: uppercase;
		letter-spacing: 0.06em;
		span {
			color: var(--color-highlight);
		}
	}
}

</style>