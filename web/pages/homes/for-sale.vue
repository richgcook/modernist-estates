<template>
	<div>
		<PropertiesNav />
		<PropertiesLayout v-if="data.propertiesForSalePage.properties?.length">
			<PropertyCard v-for="property in data.propertiesForSalePage.properties" :key="property._id" :property="property" />
		</PropertiesLayout>
	</div>
</template>

<script setup>

const { $seoQuery, $propertyQuery } = useNuxtApp()

const query = groq`{ 

	"propertiesForSalePage": *[_type == "propertiesForSalePage"] {
		_id, _type, title, slug, seo {
			${$seoQuery}
		},
		"properties": *[_type == "property" && references(^._id)] {
			${$propertyQuery},
		},
	}[0],
	
}`

const { data } = await useSanityQuery(query)

const { title, description, image, bodyClass } = useMetaBodyHelpers(data?.value.propertiesForSalePage)

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

</script>