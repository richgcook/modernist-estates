<template>
	<div>
		<div class="page-layout">
			<div class="details">
				<div class="inner">
					<div class="top">
						<h5 class="status">{{ data.property.status ? data.property.status.title : data.property.statusOther }}</h5>
						<h3 class="title">{{ data.property.titleFormatted }}</h3>
						<div class="meta-details" v-if="data.property.details?.length">
							<div v-for="(detail, index) in data.property.details" :key="index" class="item">
								<h3>{{ detail.label }}</h3>
								<p>{{ detail.value }}</p>
							</div>
						</div>
						<div class="links">
							<ul>
								<li v-for="(link, index) in data.property.links" :key="index">
									<NuxtLink :to="useLinkLink(link)">{{ link.label }}</NuxtLink>
								</li>
								<li v-if="data.property.locationMap">
									<button type="button" @click="mapOpen = true">Map</button>
								</li>
								<li v-if="data.property.images?.length">
									<button type="button" @click="mediaOverlayOpen = true">View all images</button>
								</li>
							</ul>
						</div>

						<div class="contact">
							<h3 v-if="data.property.contact?.title">{{ data.property.contact.title }}</h3>
							<RichText :blocks="data.property.contact?.details" v-if="data.property.contact?.details?.length" />
							<ul class="buttons">
								<li v-if="data.property.contact?.showEnquiryButton"><button type="button">{{ data.property.contact.enquireButtonLabel ? data.property.contact.enquireButtonLabel : `Contact` }}</button></li>
								<li v-if="data.property.contact?.showAlternativeContactButton"><NuxtLink :to="data.property.contact.alternativeContactLink" target="_blank">{{ data.property.contact.alternativeContactLabel ? data.property.contact.alternativeContactLabel : `Contact` }}</NuxtLink></li>
							</ul>
						</div>

					</div>
					<div class="bottom">
						<button type="button" class="more-info" @click="scrollToInfo" v-if="data.property.description?.length"><span>More info</span><SymbolPlusB /></button>
					</div>
				</div>
			</div>
			<div class="content">
				<div class="featured-image" v-if="data.property.featuredImage?.asset">
					<Img 
						:src="data.property.featuredImage.asset?.url"
						:alt="data.property.featuredImage.alt"
						:loading="`eager`"
						:priority="`high`"
					/>
				</div>
				<div class="description" ref="descriptionElem" v-if="data.property.description?.length">
					<RichText :blocks="data.property.description" />
				</div>
			</div>
		</div>
		<div class="page-navigation" v-if="data.property.propertiesByCurrentPropertyGroup">
			<ul>
				<li v-if="prevProperty"><NuxtLink :to="useInternalLinkUrl(prevProperty)">&larr; Previous property</NuxtLink></li>
				<li class="--all"><NuxtLink to="/homes">All properties</NuxtLink></li>
				<li v-if="nextProperty"><NuxtLink :to="useInternalLinkUrl(nextProperty)">Next property &rarr;</NuxtLink></li>
			</ul>
		</div>
		<div class="map-popup" v-if="data.property.locationMap" v-show="mapOpen">
			<button type="button" @click="mapOpen = false" class="close"><SymbolClose /></button>
			<GoogleMap :marker="data.property.locationMap" :circleFillColor="mapCircleFillColor" :circleStrokeColor="mapCircleStrokeColor" />
		</div>
		<div class="media-overlay" v-if="data.property.images?.length" v-show="mediaOverlayOpen" ref="mediaOverlayElem">
			<button type="button" @click="mediaOverlayOpen = false" class="close"><SymbolClose /></button>
			<SliderB :images="data.property.images" />
		</div>
	</div>
</template>

<script setup>

import { lock, unlock } from 'tua-body-scroll-lock'
import { onKeyStroke } from '@vueuse/core'
import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { useCssVar } from '@vueuse/core'

const { $propertyQuery } = useNuxtApp()

const route = useRoute()

const query = groq`{ 

	"property": *[_type == "property" && slug.current == $slug] {
		${$propertyQuery},
		"propertiesByCurrentPropertyGroup": *[_type == "property" && references(^.propertyGroup._ref)] {
			_id, _type, title, slug,
		},
	}[0],
	
}`

const { data } = await useSanityQuery(query, { 
    slug: route.params.slug,
})

const { title, description, image, bodyClass } = useMetaBodyHelpers(data?.value.property)

useHead({
	title: title.value,
	meta: useSeoFields({
		title: title.value,
		description: description.value,
		image: image.value
	}),
	bodyAttrs: {
		class: bodyClass.value
	}
})

gsap.registerPlugin(ScrollToPlugin)

const descriptionElem = ref(null)

const scrollToInfo = () => {

	const headerOffset = parseInt(useCssVar('--header-height').value)

	gsap.to(window, { 
		duration: 1, 
		scrollTo: {
			y: descriptionElem.value,
			offsetY: headerOffset,
			autoKill: true,
		},
	})
}

const mapPopupElem = ref(null)
const mapOpen = ref(false)

watch(mapOpen, (isOpen, wasOpen) => {
	if (isOpen) lock(mapPopupElem.value)
	if (wasOpen) unlock(mapPopupElem.value)
})

const mapCircleFillColor = computed(() => {
	// let fillColor = useCssVar('--color-highlight').value
	// if (data?.value.property.propertyGroup?.slug?.current == 'for-sale') {
	// 	fillColor = useCssVar('--color-primary').value
	// }
	// if (data?.value.property.propertyGroup?.slug?.current == 'for-rent') {
	// 	fillColor = useCssVar('--color-lettings').value
	// }
	// if (data?.value.property.propertyGroup?.slug?.current == 'holiday') {
	// 	fillColor = useCssVar('--color-holidays').value
	// }
	// return fillColor
	return useCssVar('--color-highlight').value
})
const mapCircleStrokeColor = computed(() => {
	return useCssVar('--color-highlight').value
})

const mediaOverlayElem = ref(null)
const mediaOverlayOpen = ref(false)

watch(mediaOverlayOpen, (isOpen, wasOpen) => {
	if (isOpen) lock(mediaOverlayElem.value)
	if (wasOpen) unlock(mediaOverlayElem.value)
})

onKeyStroke('Escape', (e) => {
	if (mediaOverlayOpen.value) {
		e.preventDefault()
		mediaOverlayOpen.value = false
	}
})

const propertyIndex = ref(0)

data?.value.property.propertiesByCurrentPropertyGroup.forEach((each, i) => {
	if (each.slug.current === route.params.slug) {
		propertyIndex.value = i
	}
})

const prevProperty = computed(() => data?.value.property.propertiesByCurrentPropertyGroup[propertyIndex.value - 1])
const nextProperty = computed(() => data?.value.property.propertiesByCurrentPropertyGroup[propertyIndex.value + 1])

</script>

<style lang="scss" scoped>

div.page-layout {
	display: grid;
	grid-template-columns: repeat(12, 1fr);
	grid-gap: calc(var(--padding-base) * 2) calc(var(--padding-base) / 2);
	padding: 0 var(--padding-base);
	div.details {
		grid-column: 1 / span 3;
		div.inner {
			position: sticky;
			top: var(--header-height);
			display: flex;
			flex-flow: column nowrap;
			row-gap: calc(var(--padding-base) / 2);
			justify-content: space-between;
			height: calc(100vh - var(--header-height) - var(--padding-base));
			@supports (height: 100svh) {
				height: calc(100svh - var(--header-height) - var(--padding-base));
			}
		}
		h5.status {
			font-family: var(--font-sans);
			font-size: 15px;
			font-weight: 900;
			text-transform: uppercase;
			letter-spacing: 0.06em;
		}
		h3.title {
			font-size: var(--font-size-md);
			line-height: 1.33;
			white-space: pre-wrap;
		}
		div.meta-details {
			display: grid;
			row-gap: calc(var(--padding-base) / 2);
			margin-top: calc(var(--padding-base) / 2);
			div.item {
				h3 {
					font-family: var(--font-sans);
					font-size: 15px;
					text-transform: uppercase;
					letter-spacing: 0.06em;
				}
				p {
					font-size: var(--font-size-md);
					line-height: 1.2;
				}
			}
		}
		div.links {
			margin-top: var(--padding-base);
			ul {
				li {
					font-family: var(--font-sans);
					font-size: 20px;
					text-transform: uppercase;
					letter-spacing: 0.06em;
					button {
						all: unset;
						box-sizing: border-box;
						cursor: pointer;
					}
				}
			}
		}
		button.more-info {
			all: unset;
			box-sizing: border-box;
			cursor: pointer;
			display: inline-flex;
			flex-flow: row nowrap;
			align-items: center;
			column-gap: 1ch;
			font-family: var(--font-sans);
			font-size: 20px;
			text-transform: uppercase;
			letter-spacing: 0.06em;
			span {
				flex-shrink: 0;
			}
			svg {
				height: 14px;
				width: 14px;
			}
		}
	}
	div.content {
		grid-column: 4 / span 9;
		display: grid;
		row-gap: var(--padding-base);
		div.featured-image {
			position: relative;
			width: 100%;
			height: calc(100vh - var(--header-height) - var(--padding-base));
			@supports (height: 100svh) {
				height: calc(100svh - var(--header-height) - var(--padding-base));
			}
			img {
				position: absolute;
				inset: 0;
				height: 100%;
				width: 100%;
				max-width: none;
				object-fit: cover;
			}
		}
		div.text {
			max-width: 66%;
		}
	}
	div.contact {
		margin-top: var(--padding-base);
		h3 {
			font-family: var(--font-sans);
			font-size: 15px;
			text-transform: uppercase;
			letter-spacing: 0.06em;
		}
		ul.buttons {
			display: flex;
			flex-flow: column nowrap;
			row-gap: 15px;
			margin-top: calc(var(--padding-base) / 2);
			li {
				a, button {
					all: unset;
					box-sizing: border-box;
					cursor: pointer;
					display: inline-block;
					font-family: var(--font-sans);
					font-size: 20px;
					text-transform: uppercase;
					letter-spacing: 0.06em;
					border: 1px solid currentColor;
					padding: 5px 15px 5px 15px;
				}
			}
		}
	}
}
div.page-navigation {
	margin: calc(var(--padding-base) * 4) 0 calc(var(--padding-base) * 2) 0;
	ul {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		gap: 0 var(--padding-base);
		padding: 0 var(--padding-base);
		li {
			font-family: var(--font-sans);
			font-size: 20px;
			text-transform: uppercase;
			letter-spacing: 0.06em;
			text-align: center;
			&.--all {
				grid-column: 2 / span 1;
			}
		}
	}
}
div.map-popup {
	position: fixed;
	inset: 0;
	height: 100%;
	width: 100%;
	background-color: var(--color-bg);
	z-index: 100;
	button.close {
		all: unset;
		box-sizing: border-box;
		cursor: pointer;
		position: absolute;
		top: calc(var(--padding-base) - 5px);
		right: var(--padding-base);
		z-index: 1;
		svg {
			height: 22px;
			width: 22px;
		}
	}
}
div.media-overlay {
	position: fixed;
	inset: 0;
	height: 100%;
	width: 100%;
	background-color: var(--color-bg);
	z-index: 100;
	button.close {
		all: unset;
		box-sizing: border-box;
		cursor: pointer;
		position: absolute;
		top: calc(var(--padding-base) - 5px);
		right: var(--padding-base);
		z-index: 1;
		svg {
			height: 22px;
			width: 22px;
		}
	}
}

</style>