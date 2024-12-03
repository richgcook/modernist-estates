<template>
	<nav class="properties-groups">
		<ul>
			<li><NuxtLink to="/homes">All</NuxtLink></li>
			<li v-if="data.propertiesForSalePage"><NuxtLink :to="useInternalLinkUrl(data.propertiesForSalePage)">{{ data.propertiesForSalePage.title }}</NuxtLink></li>
			<li v-if="data.propertiesForHolidayPage"><NuxtLink :to="useInternalLinkUrl(data.propertiesForHolidayPage)">{{ data.propertiesForHolidayPage.title }}</NuxtLink></li>
			<li v-if="data.propertiesForRentPage"><NuxtLink :to="useInternalLinkUrl(data.propertiesForRentPage)">{{ data.propertiesForRentPage.title }}</NuxtLink></li>
		</ul>
		<div class="filter">
			//TODO: FILTER
		</div>
	</nav>
</template>

<script setup>

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

</script>

<style lang="scss" scoped>

nav.properties-groups {
	display: flex;
	flex-flow: row nowrap;
	justify-content: center;
	padding: 0 var(--padding-base);
	margin-bottom: var(--padding-base);
	position: relative;
	@include media('phone') {
		flex-flow: column nowrap;
		row-gap: calc(var(--padding-base) / 2);
	}
	ul {
		display: flex;
		flex-flow: row nowrap;
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
					border-bottom: 1px solid currentColor;
				}
			}
		}
	}
	div.filter {
		position: absolute;
		right: var(--padding-base);
		@include media('phone') {
			position: relative;
			right: 0;
		}
	}
}

</style>