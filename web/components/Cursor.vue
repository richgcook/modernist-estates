<template>
	<div class="cursor" :style="`transform:matrix(1,0,0,1,${cursorX},${cursorY})`" v-show="getActive">
		<SymbolArrowPrev v-show="getState == 'arrow' && getDirection == 'left'" v-cloak />
		<SymbolArrowNext v-show="getState == 'arrow' && getDirection == 'right'" v-cloak />
		<span class="text" :data-style="getTextStyle" v-show="getState == 'text'" ref="textElem" v-cloak>{{ getText }}</span>
	</div>
</template>

<script setup>

import { useCursorStore } from '~/store/cursor'
import { useThemeModeStore } from '~/store/themeMode'

import { storeToRefs } from 'pinia'
import { computed } from 'vue'

const cursorStore = useCursorStore()
const themeModeStore = useThemeModeStore()

const { getState, getActive, getDirection, getX, getY, getText, getTextStyle } = storeToRefs(cursorStore)
const { setXY } = cursorStore

const textElem = ref(null)

const height = ref(25)
const width = ref(25)

const heightInPx = computed(() => {
	return `${height.value}px`
})
const widthInPx = computed(() => {
	return `${width.value}px`
})

const move = (event) => {
	setXY(event.clientX, event.clientY)
}

const cursorX = computed(() => {
	if (getState.value == 'arrow') return getX.value - (width?.value/2)
	if (getState.value == 'text') {
	 	//return getX.value - (textElem.value?.getBoundingClientRect().width/2)
		 return getX.value
	}
	return getX.value
})

const cursorY = computed(() => {
	if (getState.value == 'arrow') return getY.value - (height?.value/2)
	if (getState.value == 'text') {
		//return getY.value - textElem.value?.offsetHeight
		return getY.value - 10
	}
	return getY.value
})

const textColor = computed(() => {
	return themeModeStore.getMode === 'dark' ? 'white' : 'black'
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
	position: fixed;
	top: 0;
	left: 0;
	pointer-events: none;
	z-index: 666;
	@include isTouch() {
		display: none;
	}
	span.text {
		font-size: 11px;
		font-weight: 300;
		width: 100%;
		color: v-bind(textColor);
		&[data-style="project"] {
			letter-spacing: calc((2.2/11) * 1em);
			text-transform: uppercase;
		}
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