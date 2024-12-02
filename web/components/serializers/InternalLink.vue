<template>
	<NuxtLink :to="useInternalLinkUrl(reference)" :class="{ '--has-symbol': symbolArrow }">
		<slot />
		<SymbolArrowNext v-if="symbolArrow" />
	</NuxtLink>
</template>

<script setup>

const props = defineProps({
	reference: Object,
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