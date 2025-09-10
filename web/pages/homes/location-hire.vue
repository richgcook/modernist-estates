<template>
	<div>
		<PropertiesNav :filters="data.propertiesForLocationHirePage.filters" />
		<PropertiesLayout v-if="filterAndSearchStore.filterData(data.propertiesForLocationHirePage.properties)?.length">
			<PropertyCard v-for="property in filterAndSearchStore.filterData(data.propertiesForLocationHirePage.properties)" :key="property._id" :property="property" />
		</PropertiesLayout>
	</div>
</template>

<script setup>

import { useFilterAndSearchStore } from '~/store/filterAndSearch'

const { $seoQuery, $propertyQuery, $propertyGroupFiltersQuery } = useNuxtApp()

const query = groq`{ 

	"propertiesForLocationHirePage": *[_type == "propertiesForLocationHirePage"] {
		_id, _type, title, slug, seo {
			${$seoQuery}
		},
		"properties": *[_type == "property" && references(^._id) && hideFromListings != true] | order(orderRank) {
			${$propertyQuery},
		},
		"filters": [
			${$propertyGroupFiltersQuery},
		],
	}[0],
	
}`

const { data } = await useSanityQuery(query)

const { title, description, image, bodyClass } = useMetaBodyHelpers(data?.value.propertiesForLocationHirePage)

useHead({
	title: title.value,
	meta: useSeoFields({
		title: title.value,
		description: description.value,
		image: image.value
	}),
	bodyAttrs: {
		class: bodyClass.value
	}
})

const filterAndSearchStore = useFilterAndSearchStore()

</script>