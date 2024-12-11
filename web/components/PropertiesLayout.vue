<template>
	<div class="properties-layout">
		<slot></slot>
	</div>
</template>

<style lang="scss" scoped>

div.properties-layout {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: calc(var(--padding-base) / 2);
	padding: 0 var(--padding-base);
	@include media('tablet-landscape') {
		grid-template-columns: 1fr 1fr;

	}
	@include media('tablet-portrait-and-phone') {
		grid-template-columns: 1fr;
		padding: 0;
		row-gap: calc(var(--padding-base) * 2);
	}
}

</style>