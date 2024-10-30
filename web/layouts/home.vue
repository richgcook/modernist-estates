<template>
	<div class="layout">
		<Header />
		<Nav />
		<slot />
	</div>
</template>

<style lang="scss" scoped>

div.layout {
	display: flex;
	flex-direction: column;
    min-height: 100vh;
	@supports (height: 100svh) {
		min-height: 100svh;
	}
}

</style>