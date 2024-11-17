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
}

</style>