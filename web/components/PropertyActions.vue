<template>
	<div class="actions">
		<ul>
			<li v-for="(link, index) in property.links" :key="index">
				<NuxtLink :to="useLinkLink(link)">{{ link.label }}</NuxtLink>
			</li>
			<li v-if="property.locationMap">
				<button type="button" @click="openMap">Map</button>
			</li>
			<li class="media" v-if="property.images?.length">
				<button type="button" @click="openMedia">View all images</button>
			</li>
		</ul>
	</div>
</template>

<script setup>

const props = defineProps({
	property: Object,
})

const emit = defineEmits()

const openMap = () => {
	emit('openMap')
}

const openMedia = () => {
	emit('openMedia')
}

</script>

<style lang="scss" scoped>

div.actions {
	ul {
		@include media('tablet-portrait-and-phone') {
			display: flex;
			flex-flow: row nowrap;
			column-gap: 10px;
		}
		li {
			font-family: var(--font-sans);
			font-size: var(--font-size-sm);
			text-transform: uppercase;
			letter-spacing: 0.06em;
			@include media('tablet-portrait-and-phone') {
				font-size: var(--font-size-xs);
			}
			&.media {
				@include media('tablet-portrait-and-phone') {
					display: none;
				}
			}
			button {
				all: unset;
				box-sizing: border-box;
				cursor: pointer;
			}
		}
	}
}

</style>