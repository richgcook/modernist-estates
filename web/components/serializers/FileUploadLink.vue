<template>
	<a :href="`${file.url}?dl=`" target="_blank">
		<slot />
	</a>
</template>

<script setup>

const props = defineProps({
	file: Object
})

</script>

<style lang="scss" scoped>

a {
	color: currentColor;
	border-bottom: 1px solid currentColor;
}

</style>