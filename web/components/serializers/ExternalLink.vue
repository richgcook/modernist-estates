<template>
	<a :href="href" :target="blank ? '_blank' : false">
   		<slot />
	</a>
</template>

<script setup>

const props = defineProps({
	href: String,
	blank: Boolean
})

</script>

<style lang="scss" scoped>

a {
	color: currentColor;
}

</style>