<template>
	<div class="page-layout">
		<PageHero :image="data.sellingPage.featuredImage" v-if="data.sellingPage.featuredImage?.asset" />
		<div class="content">
			<div class="introduction">
				<h2>{{ data.sellingPage.title }}</h2>
				<RichText :blocks="data.sellingPage.introduction" v-if="data.sellingPage.introduction?.length" />
			</div>
			<PageBuilderC :content="data.sellingPage.content" v-if="data.sellingPage.content?.length" />
		</div>
		<ContactForm 
			:title="`Request a Valuation`"
			:successMessage="data.sellingPage.formSuccessMessage" 
		/>
	</div>
</template>

<script setup>

const { $seoQuery, $imageQuery, $richTextQuery, $pageBuilderCQuery } = useNuxtApp()

const query = groq`{ 

	"sellingPage": *[_type == "sellingPage"] {
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
			${$pageBuilderCQuery}
		},
		formSuccessMessage,
	}[0],
	
}`

const { data } = await useSanityQuery(query)

const { title, description, image, bodyClass } = useMetaBodyHelpers(data?.value.sellingPage)

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
		grid-gap: var(--padding-base) calc(var(--padding-base) / 2);
		padding: 0 var(--padding-base);
		@include media('tablet-portrait-and-phone') {
			grid-template-columns: 1fr;
			row-gap: var(--padding-base);
		}
		div.introduction {
			grid-column: 4 / span 6;
			@include media('laptop') {
				grid-column: 3 / span 8;
				padding: 0 5%;
			}
			@include media('tablet-landscape') {
				grid-column: 3 / span 8;
			}
			@include media('tablet-portrait-and-phone') {
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
}

</style>