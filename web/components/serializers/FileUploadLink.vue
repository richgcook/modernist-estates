<template>
	<NuxtLink :to="`${file.url}?dl=`" target="_blank">
		<slot />
	</NuxtLink>
</template>

<script setup>

const props = defineProps({
	file: Object,
	symbolArrow: Boolean,
})

</script>

<style lang="scss" scoped>

a {
	color: currentColor;
	&.--has-symbol {
		display: inline-flex;
		align-items: baseline;
		column-gap: 1ch;
		svg {
			height: 0.6em;
		}
	}
	&:not(.--has-symbol) {
		border-bottom: 1px solid currentColor;
	}
}

</style>