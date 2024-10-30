<template>
	<NuxtLink :to="toPath">
		<slot />
	</NuxtLink>
</template>

<script setup>

const props = defineProps({
	slug: {
		type: String,
		default: ''
	},
	dataType: {
		type: String,
		default: ''
	}
})

const toPath = computed(() => {
	if (props.dataType === 'project') return `/projects/${props.slug}`
	if (props.dataType === 'projectProgramme') return `/projects/hmmm/${props.slug}`
	return props.slug
})

</script>

<style lang="scss" scoped>

a {
	color: currentColor;
}

</style>