<template>
	<div class="blocks-layout">

		<div v-for="(block, index) in content" :key="index" class="block" ref="blocks" :data-type="useBlockType(block._type)">

			<div v-if="useBlockType(block._type) == 'text'">
				<RichText :blocks="block.text" />
			</div>

			<div v-else-if="useBlockType(block._type) == 'image'" :data-image-size="block.settings?.mediaSize">
				<ImgWithRatio 
					:src="block.image.asset.url" 
					:sizes="`100vw`"
					:alt="block.image.alt" 
					:ratio="block.image.asset.ratio"
				/>
				<div class="caption" v-if="block.caption?.length">
					<RichText :blocks="block.caption" />
				</div>
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
	grid-column: 1 / -1;
	display: grid;
	grid-template-columns: subgrid;
	row-gap: calc(var(--padding-base) * 2);
	> div.block {
		grid-column: 1 / -1;
		&[data-type="text"] {
			grid-column: 4 / span 6;
		}
		&[data-type="image"] {
			grid-column: 1 / -1;
			display: grid;
			grid-template-columns: subgrid;
			> div {
				grid-column: 3 / span 8;
				&[data-image-size="full"] {
					grid-column: 1 / -1;
				}
			}
			div.caption {
				font-size: 18px;
				margin-top: 10px;
			}
		}
	}
}

</style>