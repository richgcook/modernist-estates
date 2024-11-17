<template>
	<div class="page-layout">
		<div class="journal-layout">
			<JournalArticleCard v-for="article in data.articles" :key="article._id" :article="article" />
		</div>
	</div>
</template>

<script setup>

const { $seoQuery, $journalArticleQuery } = useNuxtApp()

const query = groq`{ 

	"articles": *[_type == "journalArticle"] | order(publishedDate desc) {
		${$journalArticleQuery},
	},

	"journalPage": *[_type == "journalPage"] {
		_id, _type, title, slug, seo {
			${$seoQuery}
		},
	}[0],
	
}`

const { data } = await useSanityQuery(query)

const { title, description, image, bodyClass } = useMetaBodyHelpers(data?.value.journalPage)

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
	grid-gap: calc(var(--padding-base) * 2) calc(var(--padding-base) / 2);
	padding: 0 var(--padding-base);
	div.journal-layout {
		grid-column: 2 / span 10;
		display: grid;
		grid-template-columns: subgrid;
		row-gap: calc(var(--padding-base) * 2);
		div.article {
			grid-column: span 5;
			&:nth-child(2) {
				margin-top: calc(var(--padding-base) * 2);
			}
			&:not(:first-child):nth-child(odd) {
				margin-top: calc(-1 * (var(--padding-base) * 2));
			}
		}
	}
}

</style>