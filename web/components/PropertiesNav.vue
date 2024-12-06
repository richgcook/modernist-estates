<template>
	<nav class="properties-groups">
		<ul>
			<li><NuxtLink to="/homes">All</NuxtLink></li>
			<li v-if="data.propertiesForSalePage"><NuxtLink :to="useInternalLinkUrl(data.propertiesForSalePage)">{{ data.propertiesForSalePage.title }}</NuxtLink></li>
			<li v-if="data.propertiesForHolidayPage"><NuxtLink :to="useInternalLinkUrl(data.propertiesForHolidayPage)">{{ data.propertiesForHolidayPage.title }}</NuxtLink></li>
			<li v-if="data.propertiesForRentPage"><NuxtLink :to="useInternalLinkUrl(data.propertiesForRentPage)">{{ data.propertiesForRentPage.title }}</NuxtLink></li>
		</ul>
		<div class="filters" v-if="filters?.length" ref="filtersElem">
			<button type="button" @click="filtersOpen = !filtersOpen" class="filters-trigger">Filter</button>
			<div class="filters-panel" v-show="filtersOpen" v-cloak>
				<PropertyFilter v-for="(filter, index) in filters" :key="index" :filter="filter" :isLast="index == filters.length - 1" />
			</div>
		</div>
	</nav>
</template>

<script setup>

import { onClickOutside } from '@vueuse/core'

const props = defineProps({
	filters: Array,
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

onClickOutside(filtersElem, () => {
	if (filtersOpen) filtersOpen.value = false
})

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
			font-size: 15px;
			letter-spacing: 0.06em;
			text-transform: uppercase;
			@include media('phone') {
				font-size: 12px;
			}
			a {
				color: var(--color-grey);
				&.router-link-active,
				&:hover {
					color: black;
				}
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
			font-size: 15px;
			font-weight: 900;
			text-transform: uppercase;
			letter-spacing: 0.1em;
			@include media('phone') {
				font-size: 12px;
			}
		}
		div.filters-panel {
			position: absolute;
			top: calc(var(--padding-base) / 2);
			right: calc(-1 * var(--padding-base) / 2);
			background-color: white;
			width: 340px;
			padding: 3px 10px;
			z-index: 5;
			@include media('phone') {
				right: auto;
				top: calc(var(--padding-base) / 1);
				left: calc(-1 * var(--padding-base) / 2);
				width: 300px;
			}
		}
	}
}

</style>