<template>
	<div>
		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>
	</div>
</template>

<script setup>

import { useNavStore } from '~/store/nav'

const config = useRuntimeConfig()

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

const navStore = useNavStore()
const route = useRoute()

// Having to add this watcher to close the nav when the route changes
// Middleware fires before the route changes (or at least too early for this)
watch(() => route.path, (newRoute) => {
	
	navStore.setClose()

}, { immediate: true })

</script>