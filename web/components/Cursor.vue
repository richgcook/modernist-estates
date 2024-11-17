<template>
	<div class="cursor" :style="`transform:matrix(1,0,0,1,${cursorX},${cursorY})`" v-show="getActive">
		<SymbolArrowPrev v-show="getState == 'arrow' && getDirection == 'left'" v-cloak />
		<SymbolArrowNext v-show="getState == 'arrow' && getDirection == 'right'" v-cloak />
	</div>
</template>

<script setup>

import { useCursorStore } from '~/store/cursor'
import { storeToRefs } from 'pinia'

const cursorStore = useCursorStore()

const { getState, getActive, getDirection, getX, getY } = storeToRefs(cursorStore)
const { setXY } = cursorStore

const move = (event) => {
	setXY(event.clientX, event.clientY)
}
const cursorX = computed(() => {
	return getX.value - (width.value/2)
})
const cursorY = computed(() => {
	return getY.value - (height.value/2)
})

const height = ref(20)
const width = ref(34)

const heightInPx = computed(() => {
	return `${height.value}px`
})
const widthInPx = computed(() => {
	return `${width.value}px`
})

onMounted(() => {
	document.addEventListener('mousemove', event => {
		move(event)
	})
})

</script>

<style lang="scss" scoped>

div.cursor {
	display: block;
	height: v-bind(heightInPx);
	width: v-bind(widthInPx);
	position: fixed;
	top: 0;
	left: 0;
	pointer-events: none;
	z-index: 666;
	@include isTouch() {
		display: none;
	}
	svg {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		height: 100%;
		width: 100%;
	}
}

</style>