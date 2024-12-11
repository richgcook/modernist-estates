<template>
	<div class="page-layout">
		<h2 class="page-title">{{ data.journalPage.title }}</h2>
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
	@include media('tablet-portrait-and-phone') {
		grid-template-columns: 1fr;
		padding: 0;
		row-gap: var(--padding-base);
	}
	h2.page-title {
		grid-column: 1 / -1;
		font-size: var(--font-size-lg);
		text-align: center;
		display: none;
		@include media('tablet-portrait-and-phone') {
			display: block;
		}
	}
	div.journal-layout {
		grid-column: 2 / span 10;
		display: grid;
		grid-template-columns: subgrid;
		row-gap: calc(var(--padding-base) * 2);
		@include media('tablet-landscape') {
			grid-column: 1 / -1;
		}
		@include media('tablet-portrait-and-phone') {
			grid-template-columns: auto;
			grid-column: 1 / -1;
			grid-template-columns: 1fr;
		}
		div.article {
			grid-column: span 5;
			@include media('tablet-landscape') {
				grid-column: span 6;
			}
			@include media('tablet-portrait-and-phone') {
				grid-column: 1 / -1;
			}
			&:nth-child(2) {
				margin-top: calc(var(--padding-base) * 2);
				@include media('tablet-portrait-and-phone') {
					margin-top: 0;
				}
			}
			&:not(:first-child):nth-child(odd) {
				margin-top: calc(-1 * (var(--padding-base) * 2));
				@include media('tablet-portrait-and-phone') {
					margin-top: 0;
				}
			}
		}
	}
}

</style>