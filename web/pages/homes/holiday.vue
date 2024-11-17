<template>
	<div>
		<PropertiesNav />
		<PropertiesLayout v-if="data.propertiesForHolidayPage.properties?.length">
			<PropertyCard v-for="property in data.propertiesForHolidayPage.properties" :key="property._id" :property="property" />
		</PropertiesLayout>
	</div>
</template>

<script setup>

const { $seoQuery, $propertyQuery } = useNuxtApp()

const query = groq`{ 

	"propertiesForHolidayPage": *[_type == "propertiesForHolidayPage"] {
		_id, _type, title, slug, seo {
			${$seoQuery}
		},
		"properties": *[_type == "property" && references(^._id)] {
			${$propertyQuery},
		},
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

</script>