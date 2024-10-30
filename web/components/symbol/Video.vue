<template>
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27.28 27.27"><path class="cls-1" d="m13.64,27.27C6.12,27.27,0,21.15,0,13.63S6.12,0,13.64,0s13.64,6.12,13.64,13.64-6.12,13.64-13.64,13.64h0Zm0-24.98C7.38,2.3,2.3,7.38,2.3,13.64s5.09,11.34,11.34,11.34,11.34-5.09,11.34-11.34S19.89,2.3,13.64,2.3Z"/><path class="cls-1" d="m9.76,13.63v-5.94l5.15,2.97,5.15,2.97-5.15,2.97-5.15,2.97v-5.94Z"/></svg>
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