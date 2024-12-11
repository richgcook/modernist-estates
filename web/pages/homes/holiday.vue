<template>
	<div>
		<PropertiesNav :filters="data.propertiesForHolidayPage.filters" />
		<PropertiesLayout v-if="filterAndSearchStore.filterData(data.propertiesForHolidayPage.properties)?.length">
			<PropertyCard v-for="property in filterAndSearchStore.filterData(data.propertiesForHolidayPage.properties)" :key="property._id" :property="property" />
		</PropertiesLayout>
	</div>
</template>

<script setup>

import { useFilterAndSearchStore } from '~/store/filterAndSearch'

const { $seoQuery, $propertyQuery, $propertyGroupFiltersQuery } = useNuxtApp()

const query = groq`{ 

	"propertiesForHolidayPage": *[_type == "propertiesForHolidayPage"] {
		_id, _type, title, slug, seo {
			${$seoQuery}
		},
		"properties": *[_type == "property" && references(^._id)] | order(orderRank) {
			${$propertyQuery},
		},
		"filters": [
			${$propertyGroupFiltersQuery},
		],
	}[0],
	
}`

const { data } = await useSanityQuery(query)

const { title, description, image, bodyClass } = useMetaBodyHelpers(data?.value.propertiesForHolidayPage)

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