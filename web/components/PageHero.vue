<template>
	<div class="page-hero" :data-context="context">
		<Img 
			:src="image.asset.url" 
			:sizes="`100vw`"
			:loading="`eager`"
			:priority="`high`"
			:alt="image.alt" 
		/>
	</div>
</template>

<script setup>

const props = defineProps({
	image: Object,
	context: String,
})

</script>

<style lang="scss" scoped>

div.page-hero {
	aspect-ratio: 4 / 2;
	margin: 0 var(--padding-base);
	position: relative;
	@include media('tablet-portrait') {
		margin: 0;
	}
	@include media('phone') {
		display: none;
	}
	&[data-context="home"] {
		display: block;
		@include media('tablet-portrait-and-phone') {
			aspect-ratio: auto;
			height: calc(100vh - var(--header-height));
			@supports (height: 100svh) {
				height: calc(100svh - var(--header-height));
			}
			margin: 0 0 calc(var(--padding-base) * 2) 0;
		}
	}
	img {
		position: absolute;
		inset: 0;
		height: 100%;
		width: 100%;
		object-fit: cover;
		object-position: center;
	}
}

</style>