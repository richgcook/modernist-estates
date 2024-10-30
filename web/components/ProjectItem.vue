<template>
	<div class="project">
		<NuxtLink :to="`/projects/${project.slug.current}`" class="media">
			<ImgWithRatio 
				:src="project.featuredImage.asset.url" 
				:sizes="`
					(max-width: 768px) 50vw, 
					(min-width: 768px) and (max-width: 1023px) 33vw, 
					(min-width: 1024px) and (max-width: 1200px) 25vw, 
					20vw`"
				:priority="`high`"
				:alt="project.featuredImage.alt" 
				:ratio="`3.1 / 3.88`"
				v-if="project.featuredImage?.asset"
			/>
		</NuxtLink>
		<h3 class="title"><NuxtLink :to="`/projects/${project.slug.current}`">{{ project.title }}</NuxtLink></h3>
	</div>
</template>

<script setup>

import { storeToRefs } from 'pinia'

const props = defineProps({
	project: Object,
	index: Number
})

</script>

<style lang="scss" scoped>

div.project {
	display: grid;
	row-gap: 15px;
	a.media {
		position: relative;
		overflow: hidden;
		&:after {
			content: '';
			display: block;
			position: absolute;
			inset: 0;
			height: 100%;
			width: 100%;
			background-color: #8b8b8a;
			z-index: 1;
			opacity: 0;
			transition: opacity 0.5s;
		}
		&:hover {
			&:after {
				opacity: 0.2;
			}
			:deep(img) {
				transform: scale(1.015);
			}
		}
		:deep(img) {
			transition: transform 0.5s;
		}
	}
}

</style>