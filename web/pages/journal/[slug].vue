<template>
	<div class="page-layout">
		<div class="title">
			<h3 class="subtitle" v-if="data.article.subtitle">{{ data.article.subtitle }}</h3>
			<h1 class="title">{{ data.article.titleFormatted ? data.article.titleFormatted : data.article.title }}</h1>
		</div>
		<PageBuilderB :content="data.article.pageBuilder" v-if="data.article.pageBuilder?.length" />
	</div>
</template>

<script setup>

const { $journalArticleQuery } = useNuxtApp()

const route = useRoute()

const query = groq`{ 

	"article": *[_type == "journalArticle" && slug.current == $slug] {
		${$journalArticleQuery},
	}[0],
	
}`

const { data } = await useSanityQuery(query, { 
    slug: route.params.slug,
})

const { title, description, image, bodyClass } = useMetaBodyHelpers(data?.value.article)

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
	grid-template-columns: repeat(12, 1fr);
	grid-gap: var(--padding-base) calc(var(--padding-base) / 2);
	padding: 0 var(--padding-base);
	div.title {
		text-align: center;
		grid-column: 4 / span 6;
		h3 {
			font-size: var(--font-size-md);
			font-style: italic;
			margin-bottom: 10px;
		}
		h1 {
			font-size: var(--font-size-lg);
			line-height: 1.25em;
			white-space: pre-wrap;
		}
	}
	
}

</style>