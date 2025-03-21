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
				<SliderD :slides="block.images" />
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
	row-gap: var(--padding-base);
	@include media('tablet-portrait-and-phone') {
		grid-template-columns: auto;
	}
	> div.block {
		grid-column: 1 / -1;
		&[data-type="text"] {
			grid-column: 4 / span 6;
			@include media('laptop') {
				grid-column: 3 / span 8;
				padding: 0 5%;
			}
			@include media('tablet-landscape') {
				grid-column: 3 / span 8;
			}
			@include media('tablet-portrait-and-phone') {
				grid-column: 1 / -1;
			}
		}
		&[data-type="image"] {
			grid-column: 1 / -1;
			display: grid;
			grid-template-columns: subgrid;
			@include media('tablet-portrait-and-phone') {
				grid-template-columns: auto;
				width: 100vw;
				margin: 0 calc(50% - 50vw);
			}
			> div {
				grid-column: 3 / span 8;
				@include media('laptop') {
					grid-column: 2 / span 10;
					padding: 0 5%;
				}
				@include media('tablet-landscape') {
					grid-column: 2 / span 10;
				}
				@include media('tablet-portrait-and-phone') {
					grid-column: 1 / -1;
				}
				&[data-image-size="full"] {
					grid-column: 1 / -1;
				}
			}
			div.caption {
				font-family: var(--font-sans);
				font-size: 16px;
				margin-top: 10px;
				@include media('laptop') {
					font-size: 14px;
				}
				@include media('tablet-portrait-and-phone') {
					font-size: var(--font-size-xs);
					margin-left: var(--padding-base);
				}
			}
		}
		&[data-type="images"] {
			grid-column: 1 / -1;
			display: grid;
			grid-template-columns: subgrid;
			@include media('tablet-portrait-and-phone') {
				grid-template-columns: auto;
				width: 100vw;
				margin: 0 calc(50% - 50vw);
			}
			> div {
				grid-column: 3 / span 8;
				@include media('laptop') {
					grid-column: 2 / span 10;
					padding: 0 5%;
				}
				@include media('tablet-landscape') {
					grid-column: 2 / span 10;
				}
				@include media('tablet-portrait-and-phone') {
					grid-column: 1 / -1;
				}
			}
		}
	}
}

</style>