<template>
	<div class="contacts">
		<div class="details" v-if="property.contact?.title || property.contact?.details?.length">
			<h3 v-if="property.contact?.title">{{ property.contact.title }}</h3>
			<RichText :blocks="property.contact?.details" v-if="property.contact?.details?.length" />
		</div>
		<ul class="buttons">
			<li v-if="property.contact?.showEnquiryButton"><button type="button" @click="openContactForm">{{ property.contact.enquireButtonLabel ? property.contact.enquireButtonLabel : `Contact` }}</button></li>
			<li v-if="property.contact?.showAlternativeContactButton"><NuxtLink :to="property.contact.alternativeContactLink" target="_blank">{{ property.contact.alternativeContactLabel ? property.contact.alternativeContactLabel : `Contact` }}</NuxtLink></li>
		</ul>
	</div>
</template>

<script setup>

const props = defineProps({
	property: Object,
})

const emit = defineEmits()

const openContactForm = () => {
	emit('openContactForm')
}

</script>

<style lang="scss" scoped>

div.contacts {
	display: flex;
	flex-flow: column nowrap;
	row-gap: calc(var(--padding-base) / 2);
	@include media('tablet-portrait-and-phone') {
		row-gap: 0;
	}
	div.details {
		@include media('tablet-portrait-and-phone') {
			display: none;
		}
		h3 {
			font-family: var(--font-sans);
			font-size: var(--font-size-xs);
			text-transform: uppercase;
			letter-spacing: 0.06em;
			margin-bottom: 5px;
		}
	}
	ul.buttons {
		display: flex;
		flex-flow: column nowrap;
		row-gap: 15px;
		@include media('tablet-portrait-and-phone') {
			flex-flow: row nowrap;
			column-gap: 10px;
		}
		li {
			display: flex;
			a, button {
				all: unset;
				box-sizing: border-box;
				cursor: pointer;
				display: inline-block;
				font-family: var(--font-sans);
				font-size: var(--font-size-sm);
				text-transform: uppercase;
				letter-spacing: 0.06em;
				border: 1px solid currentColor;
				padding: 5px 15px 5px 15px;
				@include media('phone') {
					font-size: var(--font-size-xs);
					padding: 3px 12px 2px 12px;
				}
			}
		}
	}
}

</style>