<template>
	<div>
		<div class="landing" ref="landing" @click="skipLanding" v-show="!hideLanding" v-if="data.homePage.landing.image?.asset">
			<Img 
				:src="data.homePage.landing.image.asset.url" 
				:sizes="`100vw`"
				:loading="`eager`"
				:priority="`high`"
				:alt="data.homePage.landing.image.alt" 
			/>
			<div class="titles">
				<Logo ref="landingLogo" />
				<RichText :blocks="data.homePage.landing.text" v-if="data.homePage.landing.text?.length" ref="landingText" />
			</div>
		</div>
		<div class="home-layout">

			<PageHero :image="data.homePage.hero?.image" v-if="data.homePage.hero.image?.asset" />

			<div class="home-featured-blocks" v-if="data.homePage.featuredLinks?.length">
				<div v-for="block in data.homePage.featuredLinks" :key="block._id" class="block">
					<NuxtLink :to="useInternalLinkUrl(block.internalLink)" class="inner">
						<ImgWithRatio 
							:src="block.image.asset.url" 
							:sizes="`
								(max-width: 768px) 100vw, 
								33vw
							`"
							:alt="block.image.alt" 
							:ratio="`3.5/4.2`"
							v-if="block.image?.asset"
						/>
						<div class="overlay" :style="{ backgroundColor: block.bgColor?.value }"></div>
						<h3>{{ block.title }}</h3>
					</NuxtLink>
				</div>
			</div>

			<SliderA :slides="data.homePage.testimonials" v-if="data.homePage.testimonials?.length" />

			<div class="properties-sections">

				<div class="properties-section" data-type="sales" v-if="data.homePage.featuredSales?.length">
					<h2 class="section-title">Featured Sales</h2>
					<PropertiesLayout>
						<PropertyCard v-for="property in data.homePage.featuredSales" :key="property._id" :property="property" />
					</PropertiesLayout>
					<NuxtLink :to="useInternalLinkUrl(data.propertiesForSalePage)" class="view-all" v-if="data.propertiesForSalePage">View all sales listings</NuxtLink>
				</div>

				<div class="properties-section" data-type="holidays" v-if="data.homePage.featuredHolidays?.length">
					<h2 class="section-title">Featured Holidays</h2>
					<PropertiesLayout>
						<PropertyCard v-for="property in data.homePage.featuredHolidays" :key="property._id" :property="property" />
					</PropertiesLayout>
					<NuxtLink :to="useInternalLinkUrl(data.propertiesForHolidayPage)" class="view-all" v-if="data.propertiesForHolidayPage">View all holiday listings</NuxtLink>
				</div>

				<div class="properties-section" data-type="lettings" v-if="data.homePage.featuredLets?.length">
					<h2 class="section-title">Featured Lettings</h2>
					<PropertiesLayout>
						<PropertyCard v-for="property in data.homePage.featuredLets" :key="property._id" :property="property" />
					</PropertiesLayout>
					<NuxtLink :to="useInternalLinkUrl(data.propertiesForRentPage)" class="view-all" v-if="data.propertiesForRentPage">View all lettings listings</NuxtLink>
				</div>

			</div>

			<div class="home-journal-layout" v-if="data.latestJournalArticles?.length">
				<div v-for="journal in data.latestJournalArticles" :key="journal._id" class="journal">
					<NuxtLink :to="useInternalLinkUrl(journal)" class="inner">
						<Img 
							:src="journal.featuredImage.asset.url" 
							:sizes="`
								(max-width: 768px) 100vw, 
								50vw
							`"
							:alt="journal.featuredImage.alt" 
							v-if="journal.featuredImage?.asset"
						/>
						<div class="titles">
							<h1>{{ data.journalPage?.title }}</h1>
							<h3>{{ journal.subtitle }}</h3>
							<h2>{{ journal.title }}</h2>
						</div>
					</NuxtLink>
					<div class="titles --xs">
						<h5>{{ journal.subtitle }}</h5>
						<h3><NuxtLink :to="useInternalLinkUrl(journal)">{{ journal.title }}</NuxtLink></h3>
					</div>
				</div>
			</div>

		</div>
	</div>
</template>

<script setup>

import { gsap } from 'gsap'
import { lock, unlock } from 'tua-body-scroll-lock'

const { $seoQuery, $imageQuery, $internalLinkQuery, $richTextQuery, $propertyQuery } = useNuxtApp()

const query = groq`{ 

	"homePage": *[_type == "homePage"] {
		_id, _type, title, slug, seo {
			${$seoQuery}
		},
		landing {
			image {
				${$imageQuery}
			},
			text[] {
				${$richTextQuery}
			},
		},
		hero {
			image {
				${$imageQuery}
			},
		},
		featuredLinks[] {
			_type,
			_type == "linkBlock" => {
				image {
					${$imageQuery}
				},
				title,
				internalLink->{
					${$internalLinkQuery}
				},
				bgColor,
			}
		},
		testimonials[] {
			quote,
			image {
				${$imageQuery}
			},
		},
		featuredSales[]->{
			${$propertyQuery},
		},
		featuredHolidays[]->{
			${$propertyQuery},
		},
		featuredLets[]->{
			${$propertyQuery},
		},
		featuredJournal[]->{
			_id, _type, title, slug, seo {
				${$seoQuery}
			},
			titleFormatted, subtitle,
			featuredImage {
				${$imageQuery}
			},
		},
	}[0],

	"latestJournalArticles": *[_type == "journalArticle"] | order(publishedDate desc) {
		_id, _type, title, slug, seo {
			${$seoQuery}
		},
		titleFormatted, subtitle,
		featuredImage {
			${$imageQuery}
		},
	}[0..2],

	"journalPage": *[_type == "journalPage"] {
		_id, _type, title, slug, seo {
			${$seoQuery}
		},
	}[0],

	"propertiesForSalePage": *[_type == "propertiesForSalePage"] {
		_id, _type, title, slug, seo {
			${$seoQuery}
		},
	}[0],

	"propertiesForHolidayPage": *[_type == "propertiesForHolidayPage"] {
		_id, _type, title, slug, seo {
			${$seoQuery}
		},
	}[0],

	"propertiesForRentPage": *[_type == "propertiesForRentPage"] {
		_id, _type, title, slug, seo {
			${$seoQuery}
		},
	}[0],
	
}`

const { data } = await useSanityQuery(query)

const { title, description, image, bodyClass } = useMetaBodyHelpers(data?.value.homePage)

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

const hideLanding = ref(false)

const landing = ref(null)
const landingLogo = ref(null)
const landingText = ref(null)

let landingTl
let mm = gsap.matchMedia()

const skipLanding = () => {
	landingTl.pause()

	gsap.to(landing.value, {
		opacity: 0,
		ease: "power3.out",
		duration: 1,
		onComplete: () => {
			hideLanding.value = true
			unlock(landing.value)
		}
	})

}

onMounted(() => {

	lock(landing.value)

	mm.add({
		isLandscape: `(orientation: landscape)`,
		isPortrait: `(orientation: portrait)`,
	}, (context) => {
		let { isLandscape, isPortrait } = context.conditions

		gsap.context(() => {

			landingTl = gsap.timeline({
				onComplete: () => {
					hideLanding.value = true
					unlock(landing.value)
				}
			})

			landingTl
			.to(landingLogo.value.$el, {
				opacity: 1,
				ease: "power3.out",
				duration: 1,
			})
			.to(landingText.value.$el, {
				opacity: 1,
				ease: "power3.out",
				duration: 1,
			})
			.to(landing.value, {
				opacity: 0,
				ease: "power3.out",
				duration: 1,
				delay: 2,
			})

		})

	})

})

onUnmounted(() => {
	mm.revert()
})

</script>

<style lang="scss" scoped>

div.landing {
	position: fixed;
	inset: 0;
	height: 100%;
	width: 100%;
	background-color: var(--color-bg);
	z-index: 30;
	cursor: pointer;
	&:after {
		content: '';
		position: absolute;
		inset: 0;
		height: 100%;
		width: 100%;
		background-color: rgba(0, 0, 0, 0.3);
		z-index: 1;
	}
	img, video {
		position: absolute;
		inset: 0;
		height: 100%;
		width: 100%;
		object-fit: cover;
		object-position: center;
	}
	div.titles {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: calc(100% - (var(--padding-base) * 4));
		z-index: 2;
		display: grid;
		row-gap: calc(var(--padding-base) * 2);
		color: white;
		text-align: center;
		svg {
			height: 28px;
			fill: currentColor;
			margin: 0 auto;
			opacity: 0;
			@include media('phone') {
				height: 16px;
			}
		}
		div.text {
			font-family: var(--font-sans);
			font-size: 34px;
			font-weight: 900;
			letter-spacing: 0.02em;
			opacity: 0;
			@include media('phone') {
				font-size: 24px;
				white-space: normal;
			}
		}
	}
}
div.home-layout {
	display: grid;
	row-gap: calc(var(--padding-base) * 2);
	@include media('phone') {
		row-gap: 0;
	}
	div.page-hero {
		@include media('phone') {
			display: none;
		}
	}
}
div.home-featured-blocks {
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	gap: calc(var(--padding-base) / 2);
	padding: 0 var(--padding-base);
	@include media('phone') {
		grid-template-columns: 1fr;
		padding: 0;
		row-gap: calc(var(--padding-base) * 2);
	}
	div.block {
		a.inner {
			display: block;
			position: relative;
			&:hover {
				div.overlay {
					opacity: 1;
				}
			}
			div.image {
				@include media('phone') {
					aspect-ratio: auto;
					height: calc(100vh - var(--header-height));
					@supports (height: 100svh) {
						height: calc(100svh - var(--header-height));
					}
				}
			}
			div.overlay {
				position: absolute;
				inset: 0;
				height: 100%;
				width: 100%;
				z-index: 1;
				opacity: 0;
				pointer-events: none;
				transition: opacity 0.3s;
			}
			h3 {
				font-size: var(--font-size-lg);
				color: white;
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				z-index: 2;
			}
		}
	}
}

div.properties-sections {
	div.properties-section {
		display: grid;
		row-gap: var(--padding-base);
		padding: calc(var(--padding-base) * 2) 0;
		&[data-type="sales"] {
			padding-top: 0;
		}
		&[data-type="holidays"] {
			background-color: var(--color-holidays);
		}
		&[data-type="lettings"] {
			background-color: var(--color-lettings);
		}
		h2.section-title {
			font-size: var(--font-size-lg);
			text-align: center;
		}
		a.view-all {
			display: inline-flex;
			font-family: var(--font-sans);
			font-size: 16px;
			letter-spacing: 0.1em;
			text-transform: uppercase;
			border: 1px solid black;
			margin: var(--padding-base) auto 0 auto;
			padding: 15px 40px;
			@include media('phone') {
				font-size: 12px;
				padding: 10px var(--padding-base);
			}
			&:hover {
				background-color: black;
				color: white;
			}
		}
	}
}

div.home-journal-layout {
	display: grid;
	grid-template-columns: 2fr 1fr;
	grid-template-rows: 1fr 1fr;
	gap: calc(var(--padding-base) / 2);
	padding: 0 var(--padding-base);
	@include media('phone') {
		grid-template-columns: 1fr;
		grid-template-rows: auto;
		padding: 0;
		margin-top: calc(var(--padding-base) * 2);
	}
	div.journal {
		&:nth-of-type(1) {
			grid-column: 1 / span 1;
			grid-row: 1 / span 2;
			@include media('phone') {
				grid-column: 1 / -1;
				grid-row: auto;
			}
			a.inner {
				height: 100%;
				width: 100%;
				@include media('phone') {
					height: auto;
					width: auto;
				}
			}
		}
		&:nth-of-type(2) {
			grid-column: 2 / span 1;
			grid-row: 1 / span 1;
			@include media('phone') {
				display: none;
			}
			a.inner {
				@supports (aspect-ratio: 1 / 1) {
					aspect-ratio: 4 / 3;
				}
			}
		}
		&:nth-of-type(3) {
			grid-column: 2 / span 1;
			grid-row: 2 / span 1;
			@include media('phone') {
				display: none;
			}
			a.inner {
				@supports (aspect-ratio: 1 / 1) {
					aspect-ratio: 4 / 3;
				}
			}
		}
		a.inner {
			display: block;
			position: relative;
			@include media('phone') {
				aspect-ratio: 3.5 / 4.2;
			}
			&:hover {
				div.titles {
					opacity: 1;
				}
			}
			img {
				position: absolute;
				inset: 0;
				height: 100%;
				width: 100%;
				object-fit: cover;
				object-position: center;
			}
			div.titles {
				display: grid;
				row-gap: 10px;
				align-content: center;
				background-color: rgba(0, 0, 0, 0.3);
				color: white;
				text-align: center;
				position: absolute;
				inset: 0;
				height: 100%;
				width: 100%;
				padding: 0 var(--padding-base);
				z-index: 2;
				opacity: 0;
				transition: opacity 0.5s;
				@include media('phone') {
					opacity: 1;
				}
				h1 {
					font-size: var(--font-size-lg);
					display: none;
					@include media('phone') {
						display: block;
					}
				}
				h3 {
				    font-family: var(--font-sans);
					font-size: 20px;
					font-weight: 900;
					text-transform: uppercase;
					letter-spacing: 0.1em;
					@include media('phone') {
						display: none;
					}
				}
				h2 {
					font-size: var(--font-size-md);
					@include media('phone') {
						display: none;
					}
				}
			}
		}
		div.titles.--xs {
			display: none;
			padding: 0 var(--padding-base);
			margin-top: var(--padding-base);
			@include media('phone') {
				display: block;
			}
			h5 {
				font-family: var(--font-sans);
				font-size: 15px;
				font-weight: 900;
				text-transform: uppercase;
				letter-spacing: 0.1em;
				margin-bottom: 5px;
			}
			h3 {
				font-size: var(--font-size-md);
				line-height: 1.25;
				white-space: pre-wrap;
			}
		}
	}
}

</style>