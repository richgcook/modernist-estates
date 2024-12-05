<template>
	<div class="article">
		<NuxtLink :to="useInternalLinkUrl(article)" class="featured-image" v-if="article.featuredImage?.asset">
			<ImgWithRatio 
				:src="article.featuredImage.asset.url" 
				:sizes="`
					(max-width: 768px) 100vw, 
					50vw
				`"
				:alt="article.featuredImage.alt" 
				:ratio="`4/3`"
			/>
		</NuxtLink>
		<div class="details">
			<h5 class="subtitle" v-if="article.subtitle">{{ article.subtitle }}</h5>
			<h3 class="title">{{ article.titleFormatted }}</h3>
			<NuxtLink :to="useInternalLinkUrl(article)" class="view-more">Read</NuxtLink>
		</div>
	</div>
</template>

<script setup>

const props = defineProps({
	article: Object
})

</script>

<style lang="scss" scoped>

div.article {
	display: grid;
	row-gap: calc(var(--padding-base) / 2);
	align-content: flex-start;
	a.featured-image {
		display: block;
	}
	div.details {
		@include media('phone') {
			padding: 0 var(--padding-base);
			margin-top: var(--padding-base);
		}
	}
	h5.subtitle {
		font-family: var(--font-sans);
		font-size: 15px;
		font-weight: 900;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		margin-bottom: 5px;
		@include media('phone') {
			font-size: 12px;
		}
	}
	h3.title {
		font-size: var(--font-size-md);
		line-height: 1.25;
		white-space: pre-wrap;
	}
	a.view-more {
		display: inline-flex;
		margin-top: 10px;
		@include media('phone') {
			font-size: var(--font-size-md);
		}
	}
}

</style>