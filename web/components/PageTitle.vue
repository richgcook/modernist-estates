<template>
	<h2 class="page-title">{{ title }}</h2>
</template>

<script setup>

const props = defineProps({
	title: String
})

</script>

<style lang="scss" scoped>

h2.page-title {
	font-size: var(--font-size-lg);
	color: #8b8b8a;
	padding: 0 var(--padding-base);
	margin-bottom: 50px;
}

</style>