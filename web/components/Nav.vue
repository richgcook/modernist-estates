<template>
	<Transition name="fade">
		<nav class="main" v-show="isOpen" v-cloak ref="nav">
			<ul class="menu" v-if="data.settings.menu?.length">
				<li v-for="(link, index) in data.settings.menu" :key="index">
					<NuxtLink :to="useLinkLink(link)">{{ link.label ? link.label : link.page?.title }}</NuxtLink>
				</li>
			</ul>
		</nav>
	</Transition>
</template>

<script setup>

import { useNavStore } from '~/store/nav'
import { storeToRefs } from 'pinia'
import { lock, unlock } from 'tua-body-scroll-lock'

const { $seoQuery } = useNuxtApp()

const query = groq`{ 

	"settings": *[_type == "settingsGeneral"] {
		menu[] {
			_type,
			_type == "internalLink" => {
				label,
				page->{
					_id, _type, title, slug, seo {
						${$seoQuery}
					},
				},
			},
			_type == "externalLink" => {
				label, url
			},
		},
	}[0]
		
}`

const { data } = await useSanityQuery(query)

const navStore = useNavStore()

const { isOpen } = storeToRefs(navStore)
const { setClose } = navStore

const nav = ref(null)

const route = useRoute()

const internalLinkAlreadyOpenCheck = (event) => {
	if (route.path == event.target.pathname) {
		event.preventDefault()
		setClose()
	}
}

watch(isOpen, (newValue, oldValue) => {
	if (newValue) lock(nav.value) // lock(targetElement, { overflowType: 'clip' })
	if (oldValue) unlock(nav.value)
})

</script>

<style lang="scss" scoped>

nav.main {
	position: fixed;
	inset: 0;
	height: 100%;
	width: 100%;
	background-color: rgba(0, 0, 0, 0.7);
	z-index: 20;
	padding: calc(var(--padding-base) + var(--logo-height) + var(--padding-base)) var(--padding-base);
	&.fade-enter-active,
	&.fade-leave-active {
		transition: opacity 0.5s;
	}
	&.fade-enter-from,
	&.fade-leave-to {
		opacity: 0;
	}
	ul.menu {
		display: flex;
		flex-flow: column nowrap;
		li {
			font-size: var(--font-size-lg);
			a {
				color: white;
				&:hover {
					opacity: 0.5;
				}
			}
		}
	}
}

</style>