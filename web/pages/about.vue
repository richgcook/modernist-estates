<template>
	<div class="page-layout">
		<PageHero :image="data.aboutPage.featuredImage" v-if="data.aboutPage.featuredImage?.asset" />
		<div class="content">
			<div class="introduction">
				<h2>{{ data.aboutPage.title }}</h2>
				<RichText :blocks="data.aboutPage.introduction" v-if="data.aboutPage.introduction?.length" />
			</div>
			<PageBuilderC :content="data.aboutPage.content" v-if="data.aboutPage.content?.length" />
		</div>
		<div class="services" v-if="data.aboutPage.services.contentBlocks?.length">
			<h3 class="section-title">{{data.aboutPage.services.title }}</h3>
			<div v-for="(service, index) in data.aboutPage.services.contentBlocks" :key="index" class="service">
				<NuxtLink :to="useInternalLinkUrl(service.internalLink)" class="image" v-if="service.image?.asset">
					<ImgWithRatio
						:src="service.image.asset.url" 
						:sizes="`
							(max-width: 768px) 100vw, 
							33vw
						`"
						:ratio="`4/3`"
						:alt="service.image.alt" 
					/>
				</NuxtLink>
				<h4><NuxtLink :to="useInternalLinkUrl(service.internalLink)">{{ service.title }}</NuxtLink></h4>
				<div class="text-container" v-if="service.description?.length">
					<RichText :blocks="service.description" />
				</div>
			</div>
		</div>

	</div>
</template>

<script setup>

const { $seoQuery, $imageQuery, $internalLinkQuery, $richTextQuery } = useNuxtApp()

const query = groq`{ 

	"aboutPage": *[_type == "aboutPage"] {
		_id, _type, title, slug, seo {
			${$seoQuery}
		},
		featuredImage {
			${$imageQuery}
		},
		introduction[] {
			${$richTextQuery}
		},
		content[] {
			_type,
			_type == "textBlock" => {
				title,
				text[] {
					${$richTextQuery}
				},
			},
		},
		services {
			title,
			contentBlocks[] {
				_type,
				_type == "imageTextBlock" => {
					image {
						${$imageQuery}
					},
					internalLink->{
						${$internalLinkQuery}
					},
					title,
					description[] {
						${$richTextQuery}
					},
				},
			}
		}
	}[0],
	
}`

const { data } = await useSanityQuery(query)

const { title, description, image, bodyClass } = useMetaBodyHelpers(data?.value.aboutPage)

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

</script>

<style lang="scss" scoped>

div.page-layout {
	display: grid;
	row-gap: calc(var(--padding-base) * 2);
	div.page-hero {
		@include media('phone') {
			display: none;
		}
	}
	div.content {
		display: grid;
		grid-template-columns: repeat(12, 1fr);
		grid-gap: 0 calc(var(--padding-base) / 2);
		padding: 0 var(--padding-base);
		@include media('phone') {
			grid-template-columns: 1fr;
			row-gap: var(--padding-base);
		}
		div.introduction {
			grid-column: 4 / span 6;
			@include media('laptop') {
				grid-column: 3 / span 8;
				padding: 0 5%;
			}
			@include media('phone') {
				grid-column: 1 / -1;
			}
			h2 {
				font-size: var(--font-size-lg);
				margin-bottom: calc(var(--padding-base) / 2);
				text-align: center;
			}
			div.text {
				font-size: var(--font-size-md);
				line-height: 1.35;
			}
		}
	}
	div.services {
		display: grid;
		grid-template-columns: repeat(12, 1fr);
		grid-gap: var(--padding-base) calc(var(--padding-base) / 2);
		padding: 0 var(--padding-base);
		@include media('phone') {
			grid-template-columns: 1fr;
			padding: 0;
		}
		h3.section-title {
			grid-column: 1 / -1;
			font-family: var(--font-sans);
			font-size: var(--font-size-sm);
			text-transform: uppercase;
			letter-spacing: 0.06em;
			text-align: center;
			margin-bottom: calc(var(--padding-base) / 2);
			@include media('phone') {
				margin-bottom: 0;
			}
		}
		div.service {
			grid-column: span 4;
			@include media('phone') {
				grid-column: 1 / -1;
			}
			h4 {
				font-family: var(--font-sans);
				font-size: var(--font-size-sm);
				text-transform: uppercase;
				letter-spacing: 0.06em;
				text-align: center;
				margin: calc(var(--padding-base) / 2) 0 calc(var(--padding-base) / 4) 0;
				@include media('phone') {
					margin: var(--padding-base) 0 calc(var(--padding-base) / 2) 0;
				}
			}
			div.text-container {
				max-width: 90%;
				@include media('phone') {
					max-width: none;
					font-size: var(--font-size-md);
					padding: 0 var(--padding-base);
				}
			}
		}
	}
}

</style>