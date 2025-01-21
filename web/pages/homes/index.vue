<template>
	<div>
		<PropertiesNav />
		<PropertiesLayout v-if="filterAndSearchStore.filterData(data.properties)?.length">
			<PropertyCard v-for="property in filterAndSearchStore.filterData(data.properties)" :key="property._id" :property="property" />
		</PropertiesLayout>
	</div>
</template>

<script setup>

import { useFilterAndSearchStore } from '~/store/filterAndSearch'

const { $seoQuery, $propertyQuery } = useNuxtApp()

const query = groq`{ 

	"properties": *[_type == "property" && hideFromListings != true] | order(orderRank) {
		${$propertyQuery},
	},

	"homesPage": *[_type == "homesPage"] {
		_id, _type, title, slug, seo {
			${$seoQuery}
		},
	}[0],
	
}`

const { data } = await useSanityQuery(query)

const { title, description, image, bodyClass } = useMetaBodyHelpers(data?.value.homesPage)

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