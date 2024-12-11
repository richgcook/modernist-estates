<template>
	<Transition name="fade">
		<nav class="main" v-show="isOpen" v-cloak ref="nav">
			<ul class="menu">
				<li class="--has-children" :class="{ '--open': openChildren.includes(`1`) }">
					<button type="button" @click="toggleOpenChildren(`1`)" :class="{ 'router-link-active': useIsRouteActive('homes') }"><span>Homes</span><SymbolPlus /></button>
					<ul class="children" v-show="openChildren.includes(`1`)" v-cloak>
						<li v-if="data.propertiesForSalePage"><NuxtLink :to="useInternalLinkUrl(data.propertiesForSalePage)">For Sale</NuxtLink></li>
						<li v-if="data.propertiesForHolidayPage"><NuxtLink :to="useInternalLinkUrl(data.propertiesForHolidayPage)">Holiday</NuxtLink></li>
						<li v-if="data.propertiesForRentPage"><NuxtLink :to="useInternalLinkUrl(data.propertiesForRentPage)">Rent</NuxtLink></li>
					</ul>
				</li>
				<li><NuxtLink to="/about">About</NuxtLink></li>
				<li><NuxtLink to="/journal" :class="{ 'router-link-active': useIsRouteActive('journal') }">Journal</NuxtLink></li>
				<li><NuxtLink to="/selling">Selling</NuxtLink></li>
				<li><NuxtLink to="/letting">Letting</NuxtLink></li>
				<li><button type="button" @click="newsletterSubscribeStore.toggleOpen()">Subscribe</button></li>
			</ul>
		</nav>
	</Transition>
</template>

<script setup>

import { useNavStore } from '~/store/nav'
import { useNewsletterSubscribeStore } from '~/store/newsletterSubscribe'
import { storeToRefs } from 'pinia'
import { lock, unlock } from 'tua-body-scroll-lock'

const { $seoQuery } = useNuxtApp()

const query = groq`{ 

	"propertiesForSalePage": *[_type == "propertiesForSalePage"] {
		_id, _type, title, slug, seo {
			${$seoQuery}
		},
	}[0],

	"propertiesForHolidayPage": *[_type == "propertiesForHolidayPage"] {
		_id, _type, title, slug, seo {
			${$seoQuery}
		},
	}[0],

	"propertiesForRentPage": *[_type == "propertiesForRentPage"] {
		_id, _type, title, slug, seo {
			${$seoQuery}
		},
	}[0],

}`

const { data } = await useSanityQuery(query)

const navStore = useNavStore()

const { isOpen } = storeToRefs(navStore)

const nav = ref(null)
const menu = ref(null)

const route = useRoute()

watch(isOpen, (newValue, oldValue) => {
	if (newValue) {
		lock(nav.value)
	}
	if (oldValue) unlock(nav.value)
})

const openChildren = ref([])

const toggleOpenChildren = (index) => {
	if (openChildren.value.includes(index)) {
		openChildren.value = openChildren.value.filter(i => i !== index)
	} else {
		openChildren.value.push(index)
	}
}

const newsletterSubscribeStore = useNewsletterSubscribeStore()

</script>

<style lang="scss" scoped>

nav.main {
	position: fixed;
	inset: 0;
	height: 100%;
	width: 100%;
	background-color: var(--color-primary);
	padding: 0 var(--padding-base) var(--padding-base) var(--padding-base);
	margin-top: var(--header-height);
	border-top: 1px solid black;
	z-index: 15;
	display: none;
	@include media('tablet-portrait-and-phone') {
		display: block;
	}
	&.fade-enter-active,
	&.fade-leave-active {
		transition: opacity 0.3s ease;
	}
	&.fade-enter-from,
	&.fade-leave-to {
		opacity: 0;
	}
	ul.menu {
		display: flex;
		flex-flow: column nowrap;
		margin-top: var(--padding-base);
		li {
			font-size: var(--font-size-lg);
			letter-spacing: 0.01em;
			&.--has-children {
				&.--open {
					button svg {
						transform: rotate(45deg);
					}
				}
				button {
					display: inline-flex;
					column-gap: 5px;
					align-items: baseline;
					svg {
						display: block;
						height: 16px;
						width: 16px;
						transition: transform 0.3s;
					}
				}
				ul.children {
					display: flex;
					flex-flow: column nowrap;
					padding-left: 2.2ch;
				}
			}
			a.router-link-active {
				border-bottom: 1px solid currentColor;
			}
			button {
				all: unset;
				box-sizing: border-box;
				cursor: pointer;
			}
		}
	}
}

</style>