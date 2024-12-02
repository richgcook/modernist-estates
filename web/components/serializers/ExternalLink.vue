<template>
	<NuxtLink :to="href" :target="blank ? '_blank' : false" :class="{ '--has-symbol': symbolArrow }">
   		<slot />
	</NuxtLink>
</template>

<script setup>

const props = defineProps({
	href: String,
	blank: Boolean,
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