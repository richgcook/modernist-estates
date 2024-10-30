<template>
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 186.72 215.32"><path class="cls-1" d="m0,0h56.03v215.32H0V0h0Z"/><path class="cls-1" d="m130.71,0h56v215.32h-56V0h0Z"/></svg>
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