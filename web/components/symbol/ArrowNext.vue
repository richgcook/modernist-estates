<template>
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35.73 26.37"><polygon class="cls-1" points="35.73 12.5 35 13.19 35.73 13.87 23.94 26.37 22.48 25 32.68 14.19 0 14.19 0 12.19 32.68 12.19 22.48 1.37 23.94 0 35.73 12.5"/></svg>
</template>

<script setup>

const props = defineProps({
	fill: String
})

</script>

<style scoped lang="scss">

svg {
	fill: v-bind(fill);
}

</style>