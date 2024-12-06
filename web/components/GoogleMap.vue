<template>
	<GoogleMap
		:center="marker"
		:zoom="14"
		:styles="customStyles"
		:fullscreenControl="false"
		:mapTypeControl="false"
		:clickableIcons="false"
		:style="customInlineStyles"
		api-key="AIzaSyCU8q_focgghGF1tMuJ2nz9HUaPKbGj-oQ"
		mapId="3b003f46384c7b3b"
	>
		<CustomMarker :options="markerOptions">
			<div class="pin"></div>
		</CustomMarker>
	</GoogleMap>
</template>

<script setup>

import { GoogleMap, CustomMarker } from 'vue3-google-map'

const props = defineProps({
	marker: Object,
})

const markerOptions = {
	position: props.marker,
}

const pinOptions = {
	background: '#5f9db4',
	borderColor: '#5f9db4',
	glyphColor: '#5f9db4',
}

const customInlineStyles = {
	'position': 'absolute',
	'top': '50%',
	'left': '50%',
	'transform': 'translate(-50%, -50%)',
	'height': 'calc(100% - ((var(--padding-base) * 4) + 28px))',
	'width': 'calc(100% - (var(--padding-base) * 2))',
} 

</script>

<style lang="scss" scoped>

div.pin {
	width: 40px;
	height: 40px;
	border-radius: 50%;
	background: rgb(95, 157, 180, 0.75);
}

</style>