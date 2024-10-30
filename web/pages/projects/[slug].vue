<template>
	<div>
		<SliderA 
			:slides="data.project.content" 
			:project="data.project" 
			:relatedProjects="data.project.relatedProjects"
			v-if="data.project.content?.length" 
		/>
	</div>
</template>

<script setup>

definePageMeta({
	layout: 'project'
})

const { $seoQuery, $imageQuery, $richTextQuery, $projectItemQuery } = useNuxtApp()

const route = useRoute()

const query = groq`{ 

	"project": *[_type == "project" && slug.current == $slug] {
		_id, _type, slug, title, seo {
			${$seoQuery}
		},
		content[] {
			_type,
			_type == "imageBlock" => {
				image {
					${$imageQuery}
				},
				settings,
			}, 
			_type == "videoBlock" => {
				"video": video.asset->url,
				image {
					${$imageQuery}
				},
				settings,
			},
		},
		description[] {
			${$richTextQuery}
		},
		relatedProjects[]->{
			${$projectItemQuery}
		},
	}[0],
	
}`

const { data } = await useSanityQuery(query, { 
    slug: route.params.slug,
})

const { title, description, image, bodyClass } = useMetaBodyHelpers(data?.value.project)

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

<style lang="scss" scoped>



</style>