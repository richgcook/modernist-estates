<template>
	<div>
		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>
	</div>
</template>

<script setup>

import { useNavStore } from '~/store/nav'
import { useNewsletterSubscribeStore } from '~/store/newsletterSubscribe'

const navStore = useNavStore()
const newsletterSubscribeStore = useNewsletterSubscribeStore()

const config = useRuntimeConfig()
const route = useRoute()

useHead({
	titleTemplate: (titleChunk) => {
		if (titleChunk) {
			if (titleChunk == config.public.siteTitle) return config.public.siteTitle
			return `${titleChunk} → ${config.public.siteTitle}`
		} else {
			config.siteTitle
		}
	}
})

// Having to add this watcher to close the nav when the route changes
// Middleware fires before the route changes (or at least too early for this)
watch(() => route.path, (newRoute) => {
	
	navStore.setClose()
	newsletterSubscribeStore.resetSubscribing()


}, { immediate: true })

</script>