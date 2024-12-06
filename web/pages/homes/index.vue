<template>
	<div>
		<PropertiesNav :filters="data.filters" />
		<PropertiesLayout v-if="filterAndSearchStore.filterData(data.properties)?.length">
			<PropertyCard v-for="property in filterAndSearchStore.filterData(data.properties)" :key="property._id" :property="property" />
		</PropertiesLayout>
	</div>
</template>

<script setup>

import { useFilterAndSearchStore } from '~/store/filterAndSearch'

const { $seoQuery, $propertyQuery } = useNuxtApp()

const query = groq`{ 

	"properties": *[_type == "property"] | order(orderRank) {
		${$propertyQuery},
	},

	"homesPage": *[_type == "homesPage"] {
		_id, _type, title, slug, seo {
			${$seoQuery}
		},
	}[0],

	"filters": [
		{
			"title": "Location",
			"_type": "propertyFilterLocation",
			"items": *[_type == "propertyFilterLocation" && _id in *[_type == "property"].location._ref] | order(title asc) {
				_id, _type, title, slug, seo {
					${$seoQuery}
				},
			}
		},
		{
			"title": "Price",
			"_type": "propertyFilterPrice",
			"items": *[_type == "propertyFilterPrice" && _id in *[_type == "property"].priceRange._ref] | order(title asc) {
				_id, _type, title, slug, seo {
					${$seoQuery}
				},
			}
		},
		{
			"title": "Bedrooms",
			"_type": "propertyFilterBedrooms",
			"items": *[_type == "propertyFilterBedrooms" && _id in *[_type == "property"].bedroomCount._ref] | order(title asc) {
				_id, _type, title, slug, seo {
					${$seoQuery}
				},
			}
		},
		{
			"title": "Status",
			"_type": "propertyFilterStatus",
			"items": *[_type == "propertyFilterStatus" && _id in *[_type == "property"].status._ref] | order(title asc) {
				_id, _type, title, slug, seo {
					${$seoQuery}
				},
			}
		},
	],
	
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