<template>
	<div class="page-layout">
		<PageHero :image="data.lettingPage.featuredImage" v-if="data.lettingPage.featuredImage?.asset" />
		<div class="content">
			<div class="introduction">
				<h2>{{ data.lettingPage.title }}</h2>
				<RichText :blocks="data.lettingPage.introduction" v-if="data.lettingPage.introduction?.length" />
			</div>
			<PageBuilderC :content="data.lettingPage.content" v-if="data.lettingPage.content?.length" />
		</div>
		<ContactForm 
			:title="`Landlord enquiry form`"
			:successMessage="data.lettingPage.formSuccessMessage" 
		/>
	</div>
</template>

<script setup>

const { $seoQuery, $imageQuery, $richTextQuery, $pageBuilderCQuery } = useNuxtApp()

const query = groq`{ 

	"lettingPage": *[_type == "lettingPage"] {
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

const { title, description, image, bodyClass } = useMetaBodyHelpers(data?.value.lettingPage)

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
	div.content {
		display: grid;
		grid-template-columns: repeat(12, 1fr);
		grid-gap: var(--padding-base) calc(var(--padding-base) / 2);
		padding: 0 var(--padding-base);
		div.introduction {
			grid-column: 4 / span 6;
			h2 {
				font-size: var(--font-size-lg);
				margin-bottom: calc(var(--padding-base) / 2);
				text-align: center;
			}
			div.text {
				font-size: var(--font-size-md);
				line-height: calc(38/28 * 1em);
			}
		}
	}
}

</style>