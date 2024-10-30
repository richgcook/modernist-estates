<template>
	<div class="slider-container" ref="container">
		<div class="viewport" ref="viewport" @mousemove="pointerMove()" @pointerenter="pointerEnter" @pointerleave="pointerLeave">
			<div class="slider" ref="slider">

				<div class="slide" data-type="fake" @click="onSlideClick"></div>

				<template v-for="(slide, index) in slides" :key="index">

					<div class="slide" 
						@click="onSlideClick" 
						data-type="description" 
						v-if="project.description?.length && index == 0"
					>
						<RichText :blocks="project.description" />
					</div>

					<div class="slide" 
						@click="onSlideClick" 
						:data-type="useBlockType(slide._type)" 
						:data-image-orientation="slide.image?.asset?.orientation" 
						:data-image-size="slide.settings?.imageSize" 
						v-else
					>
						<template v-if="useBlockType(slide._type) == 'image'">
							<Img 
								:src="slide.image?.asset?.url"
								:alt="slide.image?.alt"
								:loading="index == 0 ? `eager` : `lazy`"
								:priority="index == 0 ? `high` : null"
							/>
						</template>

						<template v-else-if="useBlockType(slide._type) == 'video'">
							<VideoSlide
								:poster="slide.image"
								:video="slide.video"
								:playsInline="slide.settings?.playsInline"
								:index="index"
							/>
						</template>
					</div>

				</template>

				<div class="slide" data-type="related-projects" :data-projects-count="relatedProjects?.length" @click="onSlideClick" v-if="relatedProjects?.length">
					<div class="projects-grid-layout">
						<ProjectItem v-for="project in relatedProjects" :key="project._id" :project="project" />
					</div>
				</div>

			</div>
		</div>

		<div class="title" v-if="slideTitle">{{ slideTitle }}</div>
		<div class="counter" v-if="slides.length > 1">{{ selectedScrollSnap + 1 }}/{{ scrollSnaps.length }}</div>
		<div class="navigation --prev" v-show="canScrollPrev && pointerPosition == 'left'"><SymbolArrowPrev /></div>
		<div class="navigation --next" v-show="canScrollNext && pointerPosition == 'right'"><SymbolArrowNext /></div>

		<div class="init-slide" 
			:data-type="useBlockType(slides[0]._type)" 
			:data-image-orientation="slides[0].image?.asset?.orientation" 
			:data-image-size="slides[0].settings?.imageSize" 
			v-if="slides?.length && slides[0].image?.asset"
		>
			<Img 
				:src="slides[0].image?.asset?.url"
				:alt="slides[0].image?.alt"
				:loading="`eager`"
				:priority="`high`"
			/>
		</div>

	</div>
</template>

<script setup>

import { useThemeModeStore } from '~/store/themeMode'
import { storeToRefs } from 'pinia'

import emblaCarouselVue from 'embla-carousel-vue'
import gsap from 'gsap'
import { useSwipe, useMagicKeys, useFocus } from '@vueuse/core'
import { computed } from 'vue'

const props = defineProps({
	slides: Array,
	project: Object,
	relatedProjects: Array,
})

const [viewport, embla] = emblaCarouselVue({
	align: 'start',
	containScroll: 'trimSnaps',
})

const themeModeStore = useThemeModeStore()

const container = ref(null)

const scrollSnaps = ref([])
const selectedScrollSnap = ref(0)
const canScrollPrev = ref(false)
const canScrollNext = ref(true)

const hasRelatedProjects = computed(() => props.relatedProjects && props.relatedProjects.length > 0)

const currentSlide = computed(() => {
	if (selectedScrollSnap.value > 1) {
		return props.slides[selectedScrollSnap.value - 1]
	}
	return props.slides[selectedScrollSnap.value]
})

const isLastSlide = computed(() => {
	if (hasRelatedProjects.value) return selectedScrollSnap.value == props.slides.length + 1
	return selectedScrollSnap.value == props.slides.length - 1
})

const slideTitle = computed(() => {
	if (isLastSlide.value && hasRelatedProjects.value) return 'Related projects'
	return props.project?.title
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
    for (let i = 1; i <= 2; i++) {
        setEagerLoading(selectedScrollSnap.value + i)
    }
    // Previous X slides
    for (let i = 1; i <= 2; i++) {
        setEagerLoading(selectedScrollSnap.value - i)
    }
}

const currentTheme = computed(() => {
	if (selectedScrollSnap.value == 1) return 'dark'
	if (isLastSlide.value && hasRelatedProjects.value) return 'light'
	if (currentSlide.value?.settings?.themeMode) {
		return currentSlide.value.settings?.themeMode
	} else {
		return 'light'
	}
})

const onSelect = () => {
	scrollSnaps.value = embla.value.scrollSnapList()
	selectedScrollSnap.value = embla.value.selectedScrollSnap()
	canScrollPrev.value = embla.value.canScrollPrev()
	canScrollNext.value = embla.value.canScrollNext()

	themeModeStore.setMode(currentTheme.value)

	setEagerLoadingForClosestSlides()
}

const slidePointerEntered = ref(false)
const pointerPosition = ref(null)

const pointerMove = () => {

	const target = viewport.value
	const targetBounds = target.getBoundingClientRect()
    const xRelativeToTarget = event.clientX - targetBounds.left

	if (xRelativeToTarget < target.offsetWidth/2) { // Previous
		pointerPosition.value = 'left'
	} else { // Next
		pointerPosition.value = 'right'
	}

}

const pointerEnter = (event) => {
	if (event.pointerType !== 'mouse') return
}

const pointerLeave = (event) => {
	if (event.pointerType !== 'mouse') return
}

const slidePointerEnter = (event) => {
	if (event.pointerType !== 'mouse') return
}

const slidePointerLeave = (event) => {
	if (event.pointerType !== 'mouse') return
}

const onSlideClick = (event) => {
	if (event.target.closest('div.controls')) return
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

// Keyboard navigation
const { arrowleft, arrowright } = useMagicKeys()

watch(arrowleft, (v) => {
	if (v) embla.value.scrollPrev()
})
watch(arrowright, (v) => {
	if (v) embla.value.scrollNext()
})

const textAndAssetColor = computed(() => {
	if (themeModeStore.getMode == 'dark') {
		return 'white'
	} else {
		return 'black'
	}
})

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
	position: fixed;
	inset: 0;
	height: 100%;
	width: 100%;
	display: flex;
    flex-flow: column nowrap;
    align-items: center;
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
				&[data-type="image"] {
					background-color: var(--color-bg);
					img, video {
						position: absolute;
						top: 50%;
						left: 50%;
						height: 100%;
						width: 100%;
						max-height: 100%;
						max-width: 100%;
						transform: translate(-50%, -50%);
						object-fit: contain;
						object-position: center;
						user-select: none;
					}
				}
				&[data-type="image"] {
					&[data-image-orientation="landscape"] {
						img {
							@include max-width-grid-columns(15, 9, var(--padding-base));
						}
					}
					&[data-image-orientation="portrait"] {
						img {
							@include max-width-grid-columns(15, 5, var(--padding-base));
						}
					}
					&[data-image-size="fullbleed"] {
						img {
							max-width: none;
							max-height: none;
							object-fit: cover;
						}
					}
				}
				&[data-type="description"] {
					font-size: 24px;
					line-height: 1.45;
					background-color: rgba(0, 0, 0, 0.7);
					color: white;
					display: grid;
					grid-template-columns: repeat(15, 1fr);
					column-gap: var(--padding-base);
					padding: 0 var(--padding-base);
					align-content: center;
					> div {
						grid-column: 4 / span 9;
					}
				}
				&[data-type="related-projects"] {
					display: flex;
					flex-flow: row nowrap;
					justify-content: center;
					align-items: center;
					padding: 0 var(--padding-base);
					background-color: var(--color-bg);
					user-select: none;
					&[data-projects-count="3"] {
						div.projects-grid-layout {
							div.project {
								&:nth-child(1) {
									grid-column: 4 / span 3
								}
							}
						}
					}
					&[data-projects-count="4"] {
						div.projects-grid-layout {
							div.project {
								&:nth-child(1) {
									grid-column: 1 / span 3
								}
							}
						}
					}
					div.projects-grid-layout {
						display: grid;
						grid-template-columns: repeat(15, 1fr);
						gap: var(--padding-base);
						width: 100%;
						div.project {
							grid-column: span 3;
						}
					}
				}
			}
		}
	}
	div.init-slide {
		position: absolute;
		inset: 0;
		height: 100%;
		width: 100%;
		z-index: -1;
		pointer-events: none;
		background-color: var(--color-bg);
		&[data-type="image"] {
			&[data-image-orientation="landscape"] {
				img {
					@include max-width-grid-columns(15, 9, var(--padding-base));
				}
			}
			&[data-image-orientation="portrait"] {
				img {
					@include max-width-grid-columns(15, 5, var(--padding-base));
				}
			}
			&[data-image-size="fullbleed"] {
				img {
					max-width: none;
					max-height: none;
					object-fit: cover;
				}
			}
		}
		img, video {
			position: absolute;
			top: 50%;
			left: 50%;
			height: 100%;
			width: 100%;
			max-height: 100%;
			max-width: 100%;
			transform: translate(-50%, -50%);
			object-fit: contain;
			object-position: center;
			user-select: none;
		}
	}
	div.title {
		position: absolute;
		bottom: var(--padding-base);
		left: var(--padding-base);
		z-index: 1;
		font-size: var(--font-size-lg);
		color: v-bind(textAndAssetColor);
	}
	div.counter {
		position: absolute;
		bottom: var(--padding-base);
		right: var(--padding-base);
		z-index: 1;
		font-size: var(--font-size-lg);
		color: v-bind(textAndAssetColor);
	}
	div.navigation {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		height: 37px;
		width: 50px;
		fill: v-bind(textAndAssetColor);
		pointer-events: none;
		z-index: 1;
		&.--prev {
			left: var(--padding-base);
		}
		&.--next {
			right: var(--padding-base);
		}
	}
}

</style>