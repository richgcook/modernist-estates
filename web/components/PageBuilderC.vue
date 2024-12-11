<template>
	<div class="blocks-layout">

		<div v-for="(block, index) in content" :key="index" class="block" ref="blocks" :data-type="useBlockType(block._type)">

			<div v-if="useBlockType(block._type) == 'text'">
				<h3 v-if="block.title">{{ block.title }}</h3>
				<RichText :blocks="block.text" />
			</div>

			<div v-else-if="useBlockType(block._type) == 'accordion-list' && block.list?.length">
				<h3 v-if="block.title">{{ block.title }}</h3>
				<ul class="list">
					<li v-for="(item, itemIndex) in block.list" :key="itemIndex" :class="{ '--open': openAccordionItems.includes(`${index}${itemIndex}`) }">
						<h4><button type="button" @click="toggleAccordionItem(`${index}${itemIndex}`)">{{ item.title }}<span><SymbolPlus /></span></button></h4>
						<div class="content" v-show="openAccordionItems.includes(`${index}${itemIndex}`)" v-cloak>
							<RichText :blocks="item.text" />
						</div>
					</li>
				</ul>
			</div>

		</div>
	</div>
</template>


<script setup>

const props = defineProps({
	content: Array,
})

const openAccordionItems = ref([])

const toggleAccordionItem = (index) => {
	if (openAccordionItems.value.includes(index)) {
		openAccordionItems.value = openAccordionItems.value.filter(i => i !== index)
	} else {
		openAccordionItems.value.push(index)
	}
}

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
			h3 {
				font-family: var(--font-sans);
				font-size: var(--font-size-sm);
				text-transform: uppercase;
				letter-spacing: 0.06em;
				margin-bottom: calc(var(--padding-base) / 4);
			}
			div.text {
				@include media('tablet-portrait-and-phone') {
					font-size: var(--font-size-md);
				}
			}
		}
		&[data-type="accordion-list"] {
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
			h3 {
				font-family: var(--font-sans);
				font-size: var(--font-size-sm);
				text-transform: uppercase;
				letter-spacing: 0.06em;
				margin-bottom: calc(var(--padding-base) / 4);
			}
			ul.list {
				li {
					@include media('tablet-portrait-and-phone') {
						font-size: var(--font-size-md);
					}
					&.--open {
						h4 button svg {
							transform: rotate(45deg);
						}
					}
					h4 {
						button {
							all: unset;
							box-sizing: border-box;
							cursor: pointer;
							span {
								display: inline-flex;
								position: relative;
								height: 16px;
								width: 16px;
								padding-left: 5px;
								@include media('tablet-portrait-and-phone') {
									height: 14px;
									width: 14px;
								}
								svg {
									flex-shrink: 0;
									display: block;
									position: absolute;
									height: 100%;
									width: 100%;
									transition: transform 0.3s;
								}
							}
						}
					}
					div.content {
						padding: 10px 0 10px calc(var(--padding-base) / 2);
						@include media('tablet-portrait-and-phone') {
							padding-left: var(--padding-base);
						}
					}
				}
			}

		}
	}
}

</style>