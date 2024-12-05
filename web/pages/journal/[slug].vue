<template>
	<div class="page-layout">
		<div class="page-navigation">
			<ul>
				<li class="--prev" v-if="prevArticle"><NuxtLink :to="useInternalLinkUrl(prevArticle)">&larr; Previous</NuxtLink></li>
				<li class="--all"><NuxtLink :to="useInternalLinkUrl(data.journalPage)">Journal</NuxtLink></li>
				<li class="--next" v-if="nextArticle"><NuxtLink :to="useInternalLinkUrl(nextArticle)">Next &rarr;</NuxtLink></li>
			</ul>
		</div>
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

	"articles": *[_type == "journalArticle"] | order(publishedDate desc) {
		_id, _type, title, slug,
	},

	"journalPage": *[_type == "journalPage"] {
		_id, _type, title, slug,
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

const articleIndex = ref(0)

data?.value.articles.forEach((each, i) => {
	if (each.slug.current === route.params.slug) {
		articleIndex.value = i
	}
})

const prevArticle = computed(() => data?.value.articles[articleIndex.value - 1])
const nextArticle = computed(() => data?.value.articles[articleIndex.value + 1])

</script>

<style lang="scss" scoped>

div.page-layout {
	display: grid;
	grid-template-columns: repeat(12, 1fr);
	grid-gap: var(--padding-base) calc(var(--padding-base) / 2);
	padding: 0 var(--padding-base);
	@include media('phone') {
		grid-template-columns: 1fr;
	}
	div.page-navigation {
		display: none;
		@include media('phone') {
			display: block;
		}
		ul {
			display: grid;
			grid-template-columns: 1fr 1fr 1fr;
			align-items: center;
			li {
				&.--prev,
				&.--next {
					font-family: var(--font-sans);
					font-size: 12px;
					text-transform: uppercase;
					letter-spacing: 0.06em;
				}
				&.--prev {
					text-align: left;
				}
				&.--all {
					grid-column: 2 / span 1;
					font-size: var(--font-size-lg);
					text-align: center;
				}
				&.--next {
					text-align: right;
				}
			}
		}
	}
	div.title {
		text-align: center;
		grid-column: 4 / span 6;
		@include media('phone') {
			grid-column: 1 / -1;
		}
		h3 {
			font-size: var(--font-size-md);
			font-style: italic;
			margin-bottom: 10px;
			@include media('phone') {
				margin-bottom: 5px;
			}
		}
		h1 {
			font-size: var(--font-size-lg);
			line-height: 1.25;
			white-space: pre-wrap;
			@include media('phone') {
				white-space: normal;
			}
		}
	}
	
}

</style>