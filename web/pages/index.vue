<template>
	<div class="home-layout">

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
					<h3>{{ block.title }}</h3>
				</NuxtLink>
			</div>
		</div>

		<SliderA :slides="data.homePage.testimonials" v-if="data.homePage.testimonials?.length" />

		<div class="properties-sections">

			<div class="properties-section" data-type="sale">
				<h2 class="section-title title-h1">Featured Sales</h2>
				<div class="properties-layout">
					<div v-for="property in data.homePage.featuresSales" :key="property._id" class="property">
						<div class="featured-image" v-if="property.featuredImage?.asset">
							<ImgWithRatio 
								:src="property.featuredImage.asset.url" 
								:sizes="`
									(max-width: 768px) 100vw, 
									50vw
								`"
								:alt="property.featuredImage.alt" 
								:ratio="`4/3`"
							/>
						</div>
						<div class="details">
							<h5 class="title-h5">{{ property.status.title }}</h5>
							<h3 class="title">{{ property.titleFormatted }}</h3>
							<NuxtLink :to="useInternalLinkUrl(property)" class="view-more">View more</NuxtLink>
						</div>
					</div>
				</div>
				<NuxtLink to="/sales" class="view-all">View all sales listing</NuxtLink>
			</div>

			<div class="properties-section" data-type="holiday">
				<h2 class="section-title title-h1">Featured Holidays</h2>
				<div class="properties-layout">
					<div v-for="property in data.homePage.featuresSales" :key="property._id" class="property">
						<div class="featured-image" v-if="property.featuredImage?.asset">
							<ImgWithRatio 
								:src="property.featuredImage.asset.url" 
								:sizes="`
									(max-width: 768px) 100vw, 
									50vw
								`"
								:alt="property.featuredImage.alt" 
								:ratio="`4/3`"
							/>
						</div>
						<div class="details">
							<h5 class="title-h5">{{ property.status.title }}</h5>
							<h3 class="title">{{ property.titleFormatted }}</h3>
							<NuxtLink :to="useInternalLinkUrl(property)" class="view-more">View more</NuxtLink>
						</div>
					</div>
				</div>
			</div>

			<div class="properties-section" data-type="letting">
				<h2 class="section-title title-h1">Featured Lettings</h2>
				<div class="properties-layout">
					<div v-for="property in data.homePage.featuresSales" :key="property._id" class="property">
						<div class="featured-image" v-if="property.featuredImage?.asset">
							<ImgWithRatio 
								:src="property.featuredImage.asset.url" 
								:sizes="`
									(max-width: 768px) 100vw, 
									50vw
								`"
								:alt="property.featuredImage.alt" 
								:ratio="`4/3`"
							/>
						</div>
						<div class="details">
							<h5 class="title-h5">{{ property.status.title }}</h5>
							<h3 class="title">{{ property.titleFormatted }}</h3>
							<NuxtLink :to="useInternalLinkUrl(property)" class="view-more">View more</NuxtLink>
						</div>
					</div>
				</div>
			</div>

		</div>

		<div class="home-journal-layout" v-if="data.homePage.featuredJournal?.length">
			<div v-for="journal in data.homePage.featuredJournal" :key="journal._id" class="journal">
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
						<h3 class="title-h3">{{ journal.subtitle }}</h3>
						<h2 class="title-h1">{{ journal.title }}</h2>
					</div>
				</NuxtLink>
			</div>
		</div>

	</div>
</template>

<script setup>

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

const { $seoQuery, $imageQuery, $internalLinkQuery } = useNuxtApp()

const query = groq`{ 

	"homePage": *[_type == "homePage"] {
		_id, _type, title, slug, seo {
			${$seoQuery}
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
			}
		},
		testimonials[] {
			quote,
			image {
				${$imageQuery}
			},
		},
		featuresSales[]->{
			_id, _type, title, slug, seo {
				${$seoQuery}
			},
			titleFormatted,
			featuredImage {
				${$imageQuery}
			},
			images[] {
				${$imageQuery}
			},
			propertyGroup->{
				_id, _type, title, slug, seo {
					${$seoQuery}
				},
			},
			status->{
				_id, _type, title, slug, seo {
					${$seoQuery}
				},
			},
			statusOther,
			location->{
				_id, _type, title, slug, seo {
					${$seoQuery}
				},
			},
			locationOther,
			priceRange->{
				_id, _type, title, slug, seo {
					${$seoQuery}
				},
			},
			bedroomCount->{
				_id, _type, title, slug, seo {
					${$seoQuery}
				},
			},
			details[] {
				label, value,
			},
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

const onAnimationComplete = (el, done) => {

	gsap.to(el, {
		opacity: 0,
		duration: 1,
		onComplete: () => {
			done()
		}
	})

}

</script>

<style lang="scss" scoped>

div.home-layout {
	display: grid;
	row-gap: calc(var(--padding-base) * 2);
}
div.home-featured-blocks {
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	gap: calc(var(--padding-base) / 2);
	padding: 0 var(--padding-base);
	div.block {
		a.inner {
			display: block;
			position: relative;
			&:hover {
				&:after {
					background-color: rgba(0, 0, 0, 0.4);
				}
			}
			&:after {
				content: '';
				position: absolute;
				inset: 0;
				height: 100%;
				width: 100%;
				background-color: rgba(0, 0, 0, 0.3);
				transition: background-color 0.5s;
				z-index: 1;
			}
			h3 {
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
		padding: var(--padding-base) 0;
		&[data-type="holiday"] {
			background-color: red;
		}
		&[data-type="letting"] {
			background-color: cyan;
		}
		h2.section-title {
			text-align: center;
		}
		a.view-all {
			display: inline-flex;
			font-family: var(--font-sans);
			font-size: var(--font-size-title-sm);
			letter-spacing: 0.1em;
			text-transform: uppercase;
			border: 1px solid black;
			margin: 0 auto;
			padding: 20px 40px;
			&:hover {
				background-color: black;
				color: white;
			}
		}
	}
}

div.properties-layout {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: calc(var(--padding-base) / 2);
	padding: 0 var(--padding-base);
	div.property {
		h3.title {
			white-space: pre;
		}
		a.view-more {
			display: inline-flex;
			margin-top: 10px;
		}
	}
}

div.home-journal-layout {
	display: grid;
	grid-template-columns: 2fr 1fr;
	grid-template-rows: 1fr 1fr;
	gap: calc(var(--padding-base) / 2);
	padding: 0 var(--padding-base);
	div.journal {
		&:nth-of-type(1) {
			grid-column: 1 / span 1;
			grid-row: 1 / span 2;
			a.inner {
				height: 100%;
				width: 100%;
			}
		}
		&:nth-of-type(2) {
			grid-column: 2 / span 1;
			grid-row: 1 / span 1;
			a.inner {
				@supports (aspect-ratio: 1 / 1) {
					aspect-ratio: 4 / 3;
				}
			}
		}
		&:nth-of-type(3) {
			grid-column: 2 / span 1;
			grid-row: 2 / span 1;
			a.inner {
				@supports (aspect-ratio: 1 / 1) {
					aspect-ratio: 4 / 3;
				}
			}
		}
		a.inner {
			display: block;
			position: relative;
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
				row-gap: calc(var(--padding-base) / 2);
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
				h3 {
					font-family: var(--font-sans);
					text-transform: uppercase;
				}
			}
		}
	}
}

</style>