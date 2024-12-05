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
						<h4><button type="button" @click="toggleAccordionItem(`${index}${itemIndex}`)"><span>{{ item.title }}</span><SymbolPlus /></button></h4>
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
	@include media('phone') {
		grid-template-columns: auto;
	}
	> div.block {
		grid-column: 1 / -1;
		&[data-type="text"] {
			grid-column: 4 / span 6;
			h3 {
				font-family: var(--font-sans);
				font-size: 20px;
				text-transform: uppercase;
				letter-spacing: 0.06em;
				margin-bottom: calc(var(--padding-base) / 4);
				@include media('phone') {
					font-size: 14px;
				}
			}
		}
		&[data-type="accordion-list"] {
			grid-column: 4 / span 6;
			h3 {
				font-family: var(--font-sans);
				font-size: 20px;
				text-transform: uppercase;
				letter-spacing: 0.06em;
				margin-bottom: calc(var(--padding-base) / 4);
				@include media('phone') {
					font-size: 14px;
				}
			}
			ul.list {
				li {
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
							display: inline-flex;
							column-gap: 5px;
							align-items: center;
							svg {
								flex-shrink: 0;
								display: block;
								height: 16px;
								width: 16px;
								transition: transform 0.3s;
								@include media('phone') {
									height: 14px;
									width: 14px;
								}
							}
						}
					}
					div.content {
						padding: 10px 0 10px calc(var(--padding-base) / 2);
						@include media('phone') {
							padding-left: var(--padding-base);
						}
					}
				}
			}

		}
	}
}

</style>