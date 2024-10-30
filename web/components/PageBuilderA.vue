<template>
	<div class="blocks-layout">

		<div v-for="(block, index) in content" :key="index" class="block" ref="blocks" :data-type="useBlockType(block._type)">

			<div v-if="useBlockType(block._type) == 'text'">
				<RichText :blocks="block.text" />
			</div>

			<div v-else-if="useBlockType(block._type) == 'images' && block.images?.length">
				<SliderB :slides="block.images" />
			</div>

		</div>
	</div>
</template>

<script setup>

const props = defineProps({
	content: Array,
})

</script>

<style lang="scss" scoped>

div.blocks-layout {
	display: grid;
	grid-template-columns: repeat(12, 1fr);
	gap: var(--padding-base);
	padding: var(--padding-base);
	@include media('phone') {
		grid-template-columns: 1fr;
	}
	> div.block {
		grid-column: 1 / -1;
		&[data-type="text"] {
			grid-column: 1 / span 5;
		}
	}
}

</style>