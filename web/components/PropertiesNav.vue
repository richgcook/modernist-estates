<template>
	<nav class="properties-groups" :data-context="route.name">
		<ul>
			<li><NuxtLink to="/homes">All</NuxtLink></li>
			<li v-if="data.propertiesForSalePage"><NuxtLink :to="useInternalLinkUrl(data.propertiesForSalePage)" :class="{ 'router-link-active': isActivePropertyGroup(data.propertiesForSalePage._id) }">{{ data.propertiesForSalePage.title }}</NuxtLink></li>
			<li v-if="data.propertiesForHolidayPage"><NuxtLink :to="useInternalLinkUrl(data.propertiesForHolidayPage)" :class="{ 'router-link-active': isActivePropertyGroup(data.propertiesForHolidayPage._id) }">{{ data.propertiesForHolidayPage.title }}</NuxtLink></li>
			<li v-if="data.propertiesForRentPage"><NuxtLink :to="useInternalLinkUrl(data.propertiesForRentPage)" :class="{ 'router-link-active': isActivePropertyGroup(data.propertiesForRentPage._id) }">{{ data.propertiesForRentPage.title }}</NuxtLink></li>
		</ul>
		<div class="filters" v-if="filters?.length" ref="filtersElem">
			<button type="button" @click="filtersOpen = !filtersOpen" class="filters-trigger">Filter</button>
			<div class="filters-panel" v-show="filtersOpen" v-cloak>
				<PropertyFilter v-for="(filter, index) in filtersWithItems" :key="index" :filter="filter" :isLast="index == filtersWithItems.length - 1" />
				<div v-show="Object.keys(filterAndSearchStore.getActiveFilters).length" class="clear-filters">
					<button class="clear" @click="filterAndSearchStore.clearFilters">Clear</button>
				</div>
			</div>
		</div>
	</nav>
</template>

<script setup>

import { useFilterAndSearchStore } from '~/store/filterAndSearch'
import { onClickOutside } from '@vueuse/core'

const props = defineProps({
	filters: Array,
	activePropertyGroup: String
})

const { $seoQuery } = useNuxtApp()

const query = groq`{ 

	"propertiesForSalePage": *[_type == "propertiesForSalePage"] {
		_id, _type, title, slug, seo {
			${$seoQuery}
		},
	}[0],

	"propertiesForHolidayPage": *[_type == "propertiesForHolidayPage"] {
		_id, _type, title, slug, seo {
			${$seoQuery}
		},
	}[0],

	"propertiesForRentPage": *[_type == "propertiesForRentPage"] {
		_id, _type, title, slug, seo {
			${$seoQuery}
		},
	}[0],
	
}`

const { data } = await useSanityQuery(query)

const filtersOpen = ref(false)

const filtersElem = ref(null)

const filtersWithItems = computed(() => {
	return props.filters.filter(filter => filter.items && filter.items.length > 0)
})

onClickOutside(filtersElem, () => {
	if (filtersOpen) filtersOpen.value = false
})

const isActivePropertyGroup = (id) => {
	return props.activePropertyGroup?._id === id
}

const route = useRoute()

const filterAndSearchStore = useFilterAndSearchStore()

</script>

<style lang="scss" scoped>

nav.properties-groups {
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	justify-content: center;
	padding: 0 var(--padding-base) calc(var(--padding-base) / 2) var(--padding-base);
	margin-bottom: calc(var(--padding-base) / 2);
	position: sticky;
	top: var(--header-height);
	background-color: var(--color-bg);
	z-index: 10;
	@include media('phone') {
		display: flex;
		flex-flow: column nowrap;
		row-gap: var(--padding-base);
		margin-bottom: 0;
	}
	&[data-context="homes-slug"] {
		@include media('phone') {
			padding-bottom: 15px;
		}
	}
	ul {
		grid-column: 2;
		display: flex;
		flex-flow: row nowrap;
		justify-content: center;
		column-gap: var(--padding-base);
		@include media('phone') {
			justify-content: center;
		}
		li {
			font-family: var(--font-sans);
			font-size: var(--font-size-xs);
			letter-spacing: 0.06em;
			text-transform: uppercase;
			a {
				color: black;
				&.router-link-active {
					text-decoration: 1px solid underline;
					text-underline-offset: 5px;
				}
			}
		}
	}
	div.filters {
		display: flex;
		justify-self: flex-end;
		position: relative;
		button.filters-trigger {
			all: unset;
			box-sizing: border-box;
			cursor: pointer;
			font-family: var(--font-sans);
			font-size: var(--font-size-xs);
			font-weight: 900;
			text-transform: uppercase;
			letter-spacing: 0.1em;
		}
		div.filters-panel {
			position: absolute;
			top: calc(var(--padding-base) / 2);
			//right: calc(-1 * var(--padding-base) / 2);
			right: 0;
			background-color: white;
			width: 280px;
			padding: 3px 10px;
			z-index: 5;
			@include media('phone') {
				right: auto;
				top: calc(var(--padding-base) / 1);
				//left: calc(-1 * var(--padding-base) / 2);
				left: 0;
				width: 240px;
			}
			div.clear-filters {
				button.clear {
					all: unset;
					box-sizing: border-box;
					cursor: pointer;
					display: block;
					width: 100%;
					text-align: center;
					font-family: var(--font-sans);
					font-size: 13px;
					font-weight: 700;
					text-transform: uppercase;
					letter-spacing: 0.1em;
					padding: 7px 0;
					border-top: 1px solid black;
				}
			}
		}
	}
}

</style>