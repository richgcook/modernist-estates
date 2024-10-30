<template>
	<a :href="`${file.url}?dl=`" target="_blank">
		<slot />
	</a>
</template>

<script>

export default {
	props: ['file']
}

</script>

<style lang="scss" scoped>

a {
	color: currentColor;
}

</style>