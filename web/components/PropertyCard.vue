<template>
	<div class="property">
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
			<h5 class="status">{{ property.status ? property.status.title : property.statusOther }}</h5>
			<h3 class="title">{{ property.titleFormatted }}</h3>
			<NuxtLink :to="useInternalLinkUrl(property)" class="view-more">View more</NuxtLink>
		</div>
	</div>
</template>

<script setup>

const props = defineProps({
	property: Object
})

</script>

<style lang="scss" scoped>

div.property {
	display: grid;
	row-gap: calc(var(--padding-base) / 2);
	h5.status {
		font-family: var(--font-sans);
		font-size: 15px;
		font-weight: 900;
		text-transform: uppercase;
		letter-spacing: 0.1em;
	}
	h3.title {
		font-size: var(--font-size-md);
		white-space: pre;
	}
	a.view-more {
		display: inline-flex;
		font-size: 24px;
		margin-top: 10px;
	}
}

</style>