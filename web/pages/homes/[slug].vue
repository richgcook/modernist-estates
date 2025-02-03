<template>
	<div>
		<PropertiesNav :activePropertyGroup="data.property.propertyGroup" />

		<div class="page-layout">

			<div class="featured-image-xs" v-if="data.property.featuredImages.imagePrimary?.asset" @click="data.property.images?.length ? mediaOverlayOpen = true : null">
				<ImgWithRatio 
					:src="data.property.featuredImages.imagePrimary.asset.url" 
					:sizes="`100vw`"
					:alt="data.property.featuredImages.imagePrimary.alt" 
					:ratio="`4/3`"
					:loading="`eager`"
					:priority="`high`"
				/>
			</div>

			<div class="actions-bar">
				<PropertyActions :property="data.property" @openMap="mapOpen = true" @openMedia="mediaOverlayOpen = true" :class="{ '--has-sep': hasContactDetails }" v-if="hasActions" />
				<PropertyContacts :property="data.property" @openContactForm="contactFormOpen = true" v-if="hasContactDetails" />
			</div>

			<div class="details">
				<div class="inner">
					<div class="top">
						<h5 class="status" :class="{ '--unavailable': data.property.status && usePropertyIsUnavailable(data.property.status) }">{{ data.property.status ? data.property.status.title : data.property.statusOther }}</h5>
						<h3 class="title">{{ data.property.titleFormatted }}</h3>
						<div class="meta-details" v-if="data.property.details?.length">
							<div v-for="(detail, index) in data.property.details" :key="index" class="item">
								<h3>{{ detail.label }}</h3>
								<p>{{ detail.value }}</p>
							</div>
						</div>
						<div class="contact" v-if="data.property.contact?.title || data.property.contact?.details?.length">
							<h3 v-if="data.property.contact?.title">{{ data.property.contact.title }}</h3>
							<RichText :blocks="data.property.contact?.details" v-if="data.property.contact?.details?.length" />
						</div>
						<div class="description" v-if="data.property.description?.length">
							<RichText :blocks="data.property.description" />
						</div>
						<div class="actions-container">
							<PropertyActions :property="data.property" @openMap="mapOpen = true" @openMedia="mediaOverlayOpen = true" />
							<PropertyContacts :property="data.property" @openContactForm="contactFormOpen = true" />
						</div>
					</div>
					<div class="bottom">
						<button type="button" class="more-info" @click="scrollToInfo" v-if="data.property.description?.length"><span>More info</span><SymbolPlusB /></button>
					</div>
				</div>
			</div>

			<div class="content">
				<div class="featured-image" v-if="data.property.featuredImages?.imagePrimary?.asset" @click="data.property.images?.length ? mediaOverlayOpen = true : null">
					<Img 
						:src="data.property.featuredImages.imagePrimary.asset?.url"
						:alt="data.property.featuredImages.imagePrimary.alt"
						:sizes="`100vw`"
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
				<li class="--prev" v-if="prevProperty"><NuxtLink :to="useInternalLinkUrl(prevProperty)">&larr; Previous<span> property</span></NuxtLink></li>
				<li class="--all"><NuxtLink :to="useInternalLinkUrl(data.property.propertyGroup)">All properties</NuxtLink></li>
				<li class="--next" v-if="nextProperty"><NuxtLink :to="useInternalLinkUrl(nextProperty)">Next<span> property</span> &rarr;</NuxtLink></li>
			</ul>
		</div>

		<div class="contact-form-popup" v-show="contactFormOpen" v-cloak ref="contactFormPopupElem" v-if="data.property.contact?.showEnquiryButton && data.property.propertyGroup">
			<div class="inner">
				<button type="button" @click="contactFormOpen = false" class="close"><SymbolClose /></button>
				<div class="property-details">
					<h4 class="subtitle">{{ data.property.propertyGroup.enquiryFormSettings?.subtitle }}</h4>
					<h3 class="title">{{ data.property.titleFormatted }}</h3>
					<div class="disclaimer" v-if="data.property.propertyGroup.enquiryFormSettings?.disclaimer">
						<p>{{ data.property.propertyGroup.enquiryFormSettings?.disclaimer }}</p>
					</div>
				</div>
				<PropertyContactForm :property="data.property" />
			</div>
		</div>

		<div class="map-popup" v-show="mapOpen" v-cloak ref="mapPopUpElem" v-if="data.property.locationMap">
			<button type="button" @click="mapOpen = false" class="close"><SymbolClose /></button>
			<GoogleMap :marker="data.property.locationMap" :circleFillColor="mapCircleFillColor" :circleStrokeColor="mapCircleStrokeColor" />
		</div>

		<div class="media-overlay" v-show="mediaOverlayOpen" v-cloak ref="mediaOverlayElem" v-if="data.property.images?.length">
			<button type="button" @click="mediaOverlayOpen = false" class="close"><SymbolClose /></button>
			<SliderB :images="data.property.images" :mediaOverlayOpen="mediaOverlayOpen" />
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
	return useCssVar('--color-blue').value
})
const mapCircleStrokeColor = computed(() => {
	return useCssVar('--color-blue').value
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

const hasActions = computed(() => {
	return !!(
		data?.value.property.links?.length ||
		data?.value.property.locationMap ||
		data?.value.property.images?.length
	)
})

const hasContactDetails = computed(() => {
    return !!(
        data?.value.property.contact?.title ||
        data?.value.property.contact?.details?.length ||
        data?.value.property.contact?.showEnquiryButton ||
        data?.value.property.contact?.showAlternativeContactButton
    )
})

const contactFormPopupElem = ref(null)
const contactFormOpen = ref(false)

watch(contactFormOpen, (isOpen, wasOpen) => {
	if (isOpen) lock(contactFormPopupElem.value)
	if (wasOpen) unlock(contactFormPopupElem.value)
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
	@include media('tablet-portrait-and-phone') {
		grid-template-columns: 1fr;
		grid-gap: 0;
		padding: 0;
	}
	div.featured-image-xs {
		display: none;
		@include media('tablet-portrait-and-phone') {
			display: block;
		}
	}
	div.actions-bar {
		position: sticky;
		top: calc(var(--header-height) + 32px);
		flex-flow: column nowrap;
		column-gap: 10px;
		background-color: var(--color-bg);
		border-bottom: 1px solid black;
		overflow-y: auto;
		-ms-overflow-style: none;
		scrollbar-width: none;
		&::-webkit-scrollbar {
  			display: none;
		}
		z-index: 10;
		display: none;
		@include media('tablet-portrait-and-phone') {
			display: flex;
		}
		> div {
			padding: 15px var(--padding-base);
		}
		div.actions {
			&.--has-sep {
				border-bottom: 1px solid black;
			}
		}
	}
	div.details {
		grid-column: 1 / span 3;
		@include media('tablet-landscape') {
			grid-column: 1 / span 4;
		}
		@include media('tablet-portrait-and-phone') {
			grid-column: 1 / -1;
			padding: 0 var(--padding-base);
			margin-top: var(--padding-base);
		}
		div.inner {
			position: sticky;
			top: calc(var(--header-height) + var(--padding-base) + 21px);
			display: flex;
			flex-flow: column nowrap;
			row-gap: calc(var(--padding-base) / 2);
			justify-content: space-between;
			min-height: calc(100vh - (var(--header-height) + var(--padding-base) + 21px + var(--padding-base)));
			@supports (height: 100svh) {
				min-height: calc(100svh - (var(--header-height) + var(--padding-base) + 21px + var(--padding-base)));
			}
			div.bottom {
				@include media('tablet-portrait-and-phone') {
					display: none;
				}
			}
		}
		h5.status {
			font-family: var(--font-sans);
			font-size: var(--font-size-xs);
			font-weight: 900;
			text-transform: uppercase;
			letter-spacing: 0.06em;
			margin-bottom: 5px;
			&.--unavailable {
				color: var(--color-highlight);
			}
		}
		h3.title {
			font-size: var(--font-size-md);
			line-height: 1.25;
			white-space: pre-wrap;
		}
		div.meta-details {
			display: grid;
			row-gap: calc(var(--padding-base) / 2);
			margin-top: calc(var(--padding-base) / 2);
			div.item {
				h3 {
					font-family: var(--font-sans);
					font-size: var(--font-size-xs);
					text-transform: uppercase;
					letter-spacing: 0.06em;
					margin-bottom: 5px;
				}
				p {
					font-size: var(--font-size-md);
					line-height: 1.25;
				}
			}
		}
		div.contact {
			margin-top: var(--padding-base);
			font-size: var(--font-size-md);
			display: none;
			@include media('tablet-portrait-and-phone') {
				display: block;
			}
			h3 {
				font-family: var(--font-sans);
				font-size: var(--font-size-sm);
				font-weight: normal;
				text-transform: uppercase;
				letter-spacing: 0.06em;
			}
		}
		div.description {
			font-size: var(--font-size-md);
			margin-top: var(--padding-base);
			display: none;
			@include media('tablet-portrait-and-phone') {
				display: block;
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
			font-size: var(--font-size-sm);
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
		@include media('tablet-landscape') {
			grid-column: 5 / span 8;
		}
		@include media('tablet-portrait-and-phone') {
			display: none;
		}
		div.featured-image {
			position: relative;
			width: 100%;
			cursor: pointer;
			height: calc(100vh - (var(--header-height) + var(--padding-base) + 21px + var(--padding-base)));
			@supports (height: 100svh) {
				height: calc(100svh - (var(--header-height) + var(--padding-base) + 21px + var(--padding-base)));
			}
			@include media('tablet-landscape') {
				height: auto;
				aspect-ratio: 4.75 / 3;
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
			@include media('tablet-portrait-and-phone') {
				max-width: 80%;
			}
			@include media('tablet-landscape') {
				max-width: none;
			}
		}
	}
	div.actions-container {
		margin-top: var(--padding-base);
		display: flex;
		flex-flow: column nowrap;
		row-gap: var(--padding-base);
		@include media('tablet-portrait-and-phone') {
			display: none;
		}
	}
}
div.page-navigation {
	margin: calc(var(--padding-base) * 4) 0 calc(var(--padding-base) * 2) 0;
	@include media('tablet-portrait-and-phone') {
		margin: calc(var(--padding-base) * 2) 0 var(--padding-base) 0;
	}
	ul {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		gap: 0 var(--padding-base);
		padding: 0 var(--padding-base);
		@include media('tablet-portrait-and-phone') {
			gap: 0;
		}
		li {
			font-family: var(--font-sans);
			font-size: var(--font-size-sm);
			text-transform: uppercase;
			letter-spacing: 0.06em;
			text-align: center;
			@include media('tablet-portrait-and-phone') {
				font-size: var(--font-size-xs);
			}
			&.--prev {
				@include media('tablet-portrait-and-phone') {
					text-align: left;
				}
			}
			&.--all {
				grid-column: 2 / span 1;
			}
			&.--next {
				@include media('tablet-portrait-and-phone') {
					text-align: right;
				}
			}
			span {
				@include media('tablet-portrait-and-phone') {
					display: none;
				}
			}
		}
	}
}
div.contact-form-popup {
	position: fixed;
	inset: 0;
	height: 100%;
	width: 100%;
	padding: var(--header-height) 0;
	background-color: var(--color-bg);
	display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: center;
    overflow-y: auto;
	z-index: 25;
	div.inner {
		background-color: var(--color-bg);
		padding: var(--padding-base);
		max-width: 768px;
		position: relative;
		div.property-details {
			width: calc(100% - (var(--padding-base) + 20px));
			margin-bottom: var(--padding-base);
			h4.subtitle {
				font-family: var(--font-sans);
				font-size: var(--font-size-xs);
				font-weight: 900;
				text-transform: uppercase;
				letter-spacing: 0.06em;
				margin-bottom: 5px;
			}
			h3.title {
				font-size: var(--font-size-md);
				line-height: 1.2;
				white-space: pre-wrap;
			}
			div.disclaimer {
				font-family: var(--font-sans);
				font-size: var(--font-size-xs);
				text-transform: uppercase;
				margin-top: 10px;
				white-space: pre-wrap;
			}
		}
	}
	button.close {
		all: unset;
		box-sizing: border-box;
		cursor: pointer;
		position: absolute;
		top: var(--padding-base);
		right: var(--padding-base);
		z-index: 1;
		svg {
			height: 22px;
			width: 22px;
			@include media('phone') {
				height: 14px;
				width: 14px;
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
		top: var(--padding-base);
		right: var(--padding-base);
		z-index: 1;
		svg {
			height: 22px;
			width: 22px;
			@include media('phone') {
				height: 14px;
				width: 14px;
			}
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
		@include media('tablet-portrait-and-phone') {
			top: var(--padding-base);
		}
		svg {
			height: 22px;
			width: 22px;
			@include media('tablet-portrait-and-phone') {
				height: 14px;
				width: 14px;
			}
		}
	}
}

</style>