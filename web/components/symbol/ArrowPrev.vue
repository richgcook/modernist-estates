<template>
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35.73 26.37"><polygon class="cls-1" points="0 13.87 .73 13.19 0 12.5 11.79 0 13.24 1.37 3.04 12.19 35.73 12.19 35.73 14.19 3.04 14.19 13.24 25 11.79 26.37 0 13.87"/></svg>
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