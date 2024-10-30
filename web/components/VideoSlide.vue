<template>
	<div class="video">
		<Img 
			:src="poster?.asset?.url"
			:alt="poster?.alt"
			:loading="index == 0 ? `eager` : `lazy`"
			:priority="index == 0 ? `high` : null"
			v-show="!playInitiated"
			v-if="!playsInline"
		/>
		<video 
			playsinline 
			:loop="playsInline" 
			:muted="playsInline" 
			:autoplay="playsInline"
			@ended="ended()"
			v-show="playsInline || playInitiated"
			ref="videoElem"
		>
			<source :src="video" type="video/mp4">
		</video>
		<div class="controls" :class="{ '--playing': playing }" v-if="!playsInline">
			<button type="button" class="--play" @click="playing = true; playInitiated = true" v-show="!playing"><SymbolPlay /></button>
			<button type="button" class="--pause" @click="playing = false" v-show="playing"><SymbolPause /></button>
		</div>
	</div>
</template>

<script setup>

import { useThemeModeStore } from '~/store/themeMode'

const props = defineProps({
	poster: Object,
	video: String,
	playsInline: Boolean,
	index: Number
})

const playing = ref(false)
const playInitiated = ref(false)

const ended = () => {
	if (!props.playsInline) {
		playing.value = false
		playInitiated.value = false
	}
}

const themeModeStore = useThemeModeStore()

const textAndAssetColor = computed(() => {
	if (themeModeStore.getMode == 'dark') {
		return 'white'
	} else {
		return 'black'
	}
})

const videoElem = ref(null)

watch(playing, (newValue, oldValue) => {
	if (newValue) {
		videoElem.value.play()
	} else {
		videoElem.value.pause()
	}
})

</script>

<style scoped lang="scss">

div.video {
	position: absolute;
	inset: 0;
	height: 100%;
	width: 100%;
	background-color: var(--color-bg);
	img, video {
		position: absolute;
		top: 50%;
		left: 50%;
		height: 100%;
		width: 100%;
		max-height: 100%;
		max-width: 100%;
		transform: translate(-50%, -50%);
		object-fit: cover;
		object-position: center;
		user-select: none;
	}
	div.controls {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		height: 25vw;
		width: 25vw;
		//background-color: cyan;
		&:hover {
			button {
				&.--pause {
					opacity: 1;
				}
			}
		}
		button {
			all: unset;
			box-sizing: border-box;
			cursor: pointer;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			&.--play {
				height: 125px;
				width: 110px;
    			transform: translate(-50%, -50%) translateX(5px);
			}
			&.--pause {
				height: 108px;
				width: 93px;
				opacity: 0;
			}
			svg {
				fill: v-bind(textAndAssetColor);
				height: auto;
				max-height: 100%;
				width: auto;
				max-width: 100%;
			}
		}
	}
}

</style>