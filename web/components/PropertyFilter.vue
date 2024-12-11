<template>
	<div class="filter" :class="{ '--last': isLast, '--open': open }">
		<button @click="open = !open"><span>{{ filter.title }}</span><SymbolPlus /></button>
		<ul class="items" v-show="open" v-if="filter.items?.length">
			<li v-for="(item, index) in filter.items" :key="index" class="item" :class="{ '--active': isFilterActive(filter._type, item) }">
				<button @click="filterAndSearchStore.toggleFilter(filter._type, item)">
					<span>{{ item.title }}</span>
					<span class="radio"></span>
				</button>
			</li>
		</ul>
	</div>
</template>

<script setup>

import { useFilterAndSearchStore } from '~/store/filterAndSearch'

const props = defineProps({
	filter: Object,
	isLast: Boolean,
})

const open = ref(false)

const filterAndSearchStore = useFilterAndSearchStore()

const isFilterActive = (filterType, item) => {
	// Check if the filterType exists in activeFilters and if the item is included in the filterType
	return filterAndSearchStore.activeFilters[filterType]?.some(activeFilter => activeFilter._id === item._id)
}

</script>

<style lang="scss" scoped>

div.filter {
	display: flex;
    flex-flow: column nowrap;
	border-bottom: 1px solid black;
	&.--last {
		border-bottom: none;
	}
	&.--open {
		> button svg {
			transform: rotate(45deg);
		}
	}
	> button {
		all: unset;
		box-sizing: border-box;
		cursor: pointer;
		display: inline-flex;
		column-gap: 5px;
		align-items: baseline;
		justify-content: space-between;
		font-family: var(--font-sans);
		font-size: 13px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		padding: 7px 0;
		svg {
			flex-shrink: 0;
			display: block;
			height: 12px;
			width: 12px;
			transition: transform 0.3s;
		}
	}
	> ul.items {
		max-height: 300px;
   		overflow-y: auto;
		padding-bottom: 5px;
		margin-top: -2px;
		li {
			font-family: var(--font-sans);
			font-size: 13px;
			letter-spacing: 0.04em;
			text-transform: uppercase;
			display: flex;
			flex-flow: row nowrap;
			&.--active {
				button {
					span.radio {
						&:before {
							content: '';
						}
					}
				}
			}
			button {
				all: unset;
				box-sizing: border-box;
				cursor: pointer;
				display: flex;
				column-gap: 10px;
				width: 100%;
				justify-content: space-between;
				align-items: baseline;
				position: relative;
				padding: 2px 0;
				@include media('phone') {
					align-items: baseline;
				}
				span.radio {
					height: 12px;
					width: 12px;
					border: 1px solid currentColor;
					position: relative;
					&:before {
						position: absolute;
						top: 50%;
						left: 50%;
						transform: translate(-50%, -50%);
						height: 100%;
						width: 100%;
						background-color: black;
					}
				}
			}
		}
	}
}


</style>