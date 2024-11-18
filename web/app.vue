<template>
	<div>
		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>
	</div>
</template>

<script setup>

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

</script>