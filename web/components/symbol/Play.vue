<template>
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 109.69 125.76"><path class="cls-1" d="m109.69,62.88L0,125.76V0s109.69,62.88,109.69,62.88Z"/></svg>
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