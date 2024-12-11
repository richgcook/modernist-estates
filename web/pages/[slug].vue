<template>
	<div class="page-layout">
		<div class="content">
			<h2>{{ data.pageA.title }}</h2>
			<PageBuilderC :content="data.pageA.content" v-if="data.pageA.content?.length" />
		</div>
	</div>
</template>

<script setup>

const { $seoQuery, $pageBuilderCQuery } = useNuxtApp()

const route = useRoute()

const query = groq`{ 

	"pageA": *[_type == "pageA" && slug.current == $slug] {
		_id, _type, title, slug, seo {
			${$seoQuery}
		},
		content[] {
			${$pageBuilderCQuery}
		},
		formSuccessMessage,
	}[0],
	
}`

const { data } = await useSanityQuery(query, { 
    slug: route.params.slug,
})

const { title, description, image, bodyClass } = useMetaBodyHelpers(data?.value.pageA)

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
		@include media('tablet-portrait-and-phone') {
			grid-template-columns: 1fr;
			row-gap: var(--padding-base);
		}
		h2 {
			grid-column: 1 / -1;
			font-size: var(--font-size-lg);
			text-align: center;
		}
	}
}

</style>