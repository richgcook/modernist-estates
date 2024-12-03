<template>
	<header :class="{ '--nav-open': navIsOpen, '--fixed': isFixed }">
		<ul class="menu">
			<li><NuxtLink to="/homes" :class="{ 'router-link-active': useIsRouteActive('homes') }">Homes</NuxtLink></li>
			<li><NuxtLink to="/about">About</NuxtLink></li>
			<li><NuxtLink to="/journal" :class="{ 'router-link-active': useIsRouteActive('journal') }">Journal</NuxtLink></li>
		</ul>
		<NuxtLink to="/" class="logo"><Logo /></NuxtLink>
		<button @click="navStore.toggleOpen()" class="nav-trigger"><SymbolNavClosed /></button>
		<ul class="menu">
			<li><NuxtLink to="/selling">Selling</NuxtLink></li>
			<li><NuxtLink to="/letting">Letting</NuxtLink></li>
			<li><button type="button" @click="newsletterSubscribeStore.toggleOpen()">Subscribe</button></li>
		</ul>
	</header>
</template>

<script setup>

import { computed } from 'vue'
import { useNavStore } from '~/store/nav'
import { useThemeModeStore } from '~/store/themeMode'
import { useNewsletterSubscribeStore } from '~/store/newsletterSubscribe'
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

const newsletterSubscribeStore = useNewsletterSubscribeStore()

</script>

<style lang="scss" scoped>

header {
	display: flex;
	flex-flow: row nowrap;
	justify-content: space-between;
	align-items: center;
	height: var(--header-height);
	padding: 0 var(--padding-base);
	position: sticky;
	top: 0;
	background-color: var(--color-bg);
	z-index: 30;
	button.nav-trigger {
		all: unset;
		box-sizing: border-box;
		cursor: pointer;
		display: flex;
		flex-flow: column nowrap;
		justify-content: center;
		height: 40px;
		width: 40px;
		display: none;
		@include media('phone') {
			display: flex;
		}
		svg {
			height: 10px;
			width: 20px;
			fill: black;
		}
	}
	a.logo {
		display: inline-flex;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		svg {
			height: var(--logo-height);
			fill: v-bind(textAndAssetColor);
			transition: fill 0.5s;
		}
	}
	ul.menu {
		display: flex;
		flex-flow: row nowrap;
		column-gap: 30px;
		@include media('phone') {
			display: none;
		}
		li {
			font-size: var(--font-size-md);
			a {
				&:hover,
				&.router-link-active {
					border-bottom: 1px solid currentColor;
				}
			}
			button {
				all: unset;
				box-sizing: border-box;
				cursor: pointer;
				border-bottom: 1px solid transparent;
				&:hover {
					border-bottom: 1px solid currentColor;
				}
			}
		}
	}
}

</style>