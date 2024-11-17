<template>
	<div class="page-hero">
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
})

</script>

<style lang="scss" scoped>

div.page-hero {
	aspect-ratio: 4 / 2;
	margin: 0 var(--padding-base);
	position: relative;
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