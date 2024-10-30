<template>
	<img
		:srcset="buildSrcSet"
		:sizes="sizes"
		:alt="alt"
		:data-orientation="orientation"
		:loading="lazy"
		:fetchpriority="priority"
	/>
</template>

<script setup>

const props = defineProps({
	src: {
		type: String,
		required: true
	},
	srcSet: {
		type: Array,
		default: () => [150, 300, 500, 768, 1080, 1440, 1920, 3000]
	},
	sizes: {
		type: String,
		default: '100vw'
	},
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
})

const { $urlFor } = useNuxtApp()

const buildSrcSet = props.srcSet.map(size => {
	return `${$urlFor(props.src).size(size).url()} ${size}w`
}).join(', ')

</script>