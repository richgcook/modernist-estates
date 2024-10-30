<template>
	<div class="image">
		<Img 
			:src="src"
			:srcSet="srcSet"
			:sizes="sizes"
			:alt="alt"
			:orientation="orientation"
			:loading="lazy"
			:fetchpriority="priority"
		/>
	</div>
</template>

<script setup>

const props = defineProps({
	src: String,
	srcSet: Array,
	sizes: String,
	alt: String,
	orientation: String,
	lazy: {
		type: String,
		default: 'lazy'
	},
	priority: {
		type: String,
		default: null
	},
	ratio: {
		type: Number,
		default: null
	},
})
</script>

<style scoped lang="scss">

div.image {
	position: relative;
	@supports (aspect-ratio: 1 / 1) {
		aspect-ratio: v-bind(ratio);
	}
	img {
		position: absolute;
		inset: 0;
		height: 100%;
		width: 100%;
		object-fit: cover;
	}
}

</style>