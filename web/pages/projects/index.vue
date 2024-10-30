<template>
	<div>
		<PageTitle :title="data.projectsPage.title" />
		<div class="projects-grid-layout" v-if="data.projectsPage.featuredProjects?.length">
			<ProjectItem v-for="project in data.projectsPage.featuredProjects" :key="project._id" :project="project" />
		</div>
		<div class="projects-index" v-if="data.projects?.length">
			<div class="header">
				<div>
					<h2 class="section-title">Index</h2>
				</div>
				<div class="filters-container" v-if="data.filters?.length">
					<ul class="filters">
						<li :class="{ '--active': !Object.keys(filterAndSearchStore.getActiveFilters).length }"><button @click="filterAndSearchStore.clearFilters">All Projects</button></li>
						<li v-for="filter in data.filters" :key="filter._id" class="filter" :class="{ '--active': filterAndSearchStore.isFilterActive(filter._type, filter) }">
							<button @click="filterAndSearchStore.toggleFilter(filter._type, filter)">{{ filter.title }}</button>
						</li>
					</ul>
				</div>
			</div>
			<div class="projects-index-layout">
				<div v-for="project in filterAndSearchStore.filterData(data?.projects)" class="project" :key="project._id">
					<ImgWithRatio 
						:src="project.featuredImage.asset.url" 
						:sizes="`55px`"
						:priority="`high`"
						:alt="project.featuredImage.alt" 
						:ratio="project.featuredImage.asset.ratio"
						v-if="project.featuredImage?.asset"
					/>
					<h3 class="title"><NuxtLink :to="`/projects/${project.slug.current}`">{{ project.title }}</NuxtLink></h3>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>

import { useFilterAndSearchStore } from '~/store/filterAndSearch'

const filterAndSearchStore = useFilterAndSearchStore()
 
const { $seoQuery, $imageQuery, $projectItemQuery} = useNuxtApp()

const query = groq`{ 

	"projectsPage": *[_type == "projectsPage"] {
		_id, _type, title, slug, seo {
			${$seoQuery}
		},
		featuredProjects[]-> {
			${$projectItemQuery}
		},
	}[0],

	"projects": *[_type == "project"] | order(title asc) {
		_id, _type, title, slug, seo {
			${$seoQuery}
		},
		featuredImage {
			${$imageQuery}
		},
		"filterables": {
			"projectType": types[]->{
				_id, title
			},
		},
		"searchables": array::compact([
			string::lower(title), // ✅
		]),
	},

	"filters": *[_type == "projectType" && _id in *[_type == "project"].types[]._ref] | order(title desc) {
		_id, _type, title, slug
	},
	
}`

const { data } = await useSanityQuery(query)

const { title, description, image, bodyClass } = useMetaBodyHelpers(data?.value.projectsPage)

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

div.projects-grid-layout {
	display: grid;
	grid-template-columns: repeat(5, 1fr);
	gap: var(--padding-base);
	padding: 0 var(--padding-base);
}
div.projects-index {
	position: relative;
	margin-top: calc(var(--padding-base) * 2);
	padding-top: calc(var(--padding-base) * 2);
	&:before {
		content: '';
		grid-column: 1 / -1;
		display: block;
		height: 1px;
		width: calc(100% + (var(--padding-base) * 2));
		position: absolute;
		top: 0;
		left: calc(-1 * var(--padding-base));
		background-color: #848484;
	}
	div.header {
		display: grid;
		grid-template-columns: auto 1fr;
		column-gap: var(--padding-base);
		align-items: center;
		padding: 0 var(--padding-base);
		margin-bottom: calc(var(--padding-base) * 2);
		h2.section-title {
			font-size: var(--font-size-lg);
		}
		div.filters-container {
			justify-self: flex-end;
		}
	}
}
ul.filters {
	display: flex;
	flex-flow: row wrap;
	gap: 10px;
	li {
		&.--active {
			button {
				background-color: #d9d9d9;
			}
		}
		button {
			all: unset;
			box-sizing: border-box;
			cursor: pointer;
			border: 0.5px solid black;
			padding: 9px 15px 10px 15px;
			text-align: center;
			min-width: 140px;
			&:hover {
				background-color: #d9d9d9;
			}

		}
	}
}
div.projects-index-layout {
	display: grid;
	row-gap: calc(var(--padding-base) / 2);
	padding: 0 var(--padding-base);
	div.project {
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		column-gap: var(--padding-base);
		div.image {
			width: 55px;
		}
		h3.title {
			font-size: var(--font-size-lg);
			position: relative;
			top: -5px;
		}
	}
}

</style>