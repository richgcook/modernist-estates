<template>
	<GoogleMap
		:center="marker"
		:zoom="14"
		:styles="customStyles"
		:fullscreenControl="false"
		:mapTypeControl="false"
		:clickableIcons="false"
		api-key="AIzaSyCU8q_focgghGF1tMuJ2nz9HUaPKbGj-oQ"
		:style="customInlineStyles"
	>
		<Circle :options="circleOptions" />
	</GoogleMap>
</template>

<script setup>

import { GoogleMap, Circle } from 'vue3-google-map'

const props = defineProps({
	marker: Object,
	circleFillColor: {
		type: String,
		default: '#5f9db4',
	},
	circleStrokeColor: {
		type: String,
		default: '#5f9db4',
	},
})

const circleOptions = {
	center: props.marker,
    radius: 250,
    strokeColor: props.circleStrokeColor,
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: props.circleFillColor,
    fillOpacity: 0.35,
}

const customInlineStyles = {
	'position': 'absolute',
	'top': '50%',
	'left': '50%',
	'transform': 'translate(-50%, -50%)',
	'height': 'calc(100% - ((var(--padding-base) * 4) + 28px))',
	'width': 'calc(100% - (var(--padding-base) * 2))',
} 

const customStyles = [
    {
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#444444"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "color": "#e8e7df"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "saturation": "-100"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 45
            },
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
		"stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 50
            },
        ]
    }
]

</script>

<style lang="scss" scoped>



</style>