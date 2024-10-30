<template>
	<header :class="{ '--nav-open': navIsOpen, '--fixed': isFixed }">
		<ul class="menu">
			<li><NuxtLink to="/">Homes</NuxtLink></li>
			<li><NuxtLink to="/">About</NuxtLink></li>
			<li><NuxtLink to="/">Journal</NuxtLink></li>
		</ul>
		<NuxtLink to="/" class="logo"><Logo /></NuxtLink>
		<ul class="menu">
			<li><NuxtLink to="/">Selling</NuxtLink></li>
			<li><NuxtLink to="/">Letting</NuxtLink></li>
			<li><NuxtLink to="/">Subscribe</NuxtLink></li>
		</ul>
	</header>
</template>

<script setup>

import { computed } from 'vue'
import { useNavStore } from '~/store/nav'
import { useThemeModeStore } from '~/store/themeMode'
import { storeToRefs } from 'pinia'

const { $seoQuery } = useNuxtApp()

const query = groq`{ 

	"settings": *[_type == "settingsGeneral"] {
		menu[] {
			_type,
			_type == "internalLink" => @->{
				_id, _type, title, slug, seo {
					${$seoQuery}
				},
			},
			_type == "externalLink" => {
				label, url
			},
		},
	}[0]
		
}`

const { data } = await useSanityQuery(query)

const route = useRoute()

const isFixed = computed(() => {
    //return route.name == 'index' || route.name == 'projects-slug'
	return false
})

const navStore = useNavStore()

const { isOpen: navIsOpen } = storeToRefs(navStore)

const themeModeStore = useThemeModeStore()

const textAndAssetColor = computed(() => {
	if (themeModeStore.getMode == 'dark') {
		return 'white'
	} else {
		return 'black'
	}
})

</script>

<style lang="scss" scoped>

header {
	display: flex;
	flex-flow: row nowrap;
	justify-content: space-between;
	align-items: center;
	padding: var(--padding-base);
	position: sticky;
	top: 0;
	z-index: 30;
	&.--nav-open {
		a.logo {
			svg {
				fill: white;
			}
		}
		button.nav-trigger {
			height: 34px;
			transform: rotate(45deg);
			&:hover {
				opacity: 0.5;
			}
			span {
				background-color: white;
				&:nth-child(1) {
					top: 50%;
					transform: translateY(-50%);
				}
				&:nth-child(2) {
					top: 50%;
					transform: translateY(-50%) rotate(-90deg);
				}
			}
		}
	}
	&.--fixed {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
	}
	a.logo {
		display: inline-flex;
		height: var(--logo-height);
		svg {
			height: auto;
			max-height: 100%;
			width: auto;
			max-width: 100%;
			fill: v-bind(textAndAssetColor);
			transition: fill 0.5s;
		}
	}
	ul.menu {
		display: flex;
		flex-flow: row nowrap;

		li {
			font-size: var(--font-size-title-md);
		}
	}
}

</style>