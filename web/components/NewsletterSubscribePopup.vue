<template>
	<Transition name="fade">
		<div class="newsletter-popup" v-show="isOpen" v-cloak ref="popup">
			<button @click="setClose" class="close-trigger"><SymbolClose /></button>
			<NewsletterSubscribeForm :context="`popup`" />
		</div>
	</Transition>
</template>

<script setup>

import { useNewsletterSubscribeStore } from '~/store/newsletterSubscribe'
import { storeToRefs } from 'pinia'
import { lock, unlock } from 'tua-body-scroll-lock'

const newsletterSubscribeStore = useNewsletterSubscribeStore()

const { isOpen } = storeToRefs(newsletterSubscribeStore)
const { setClose } = newsletterSubscribeStore

const popup = ref(null)

watch(isOpen, (newValue, oldValue) => {
	if (newValue) lock(popup.value)
	if (oldValue) unlock(popup.value)
})

</script>

<style lang="scss" scoped>

div.newsletter-popup {
	background-color: var(--color-blue);
	padding: var(--padding-base) calc(var(--padding-base) / 2 + var(--padding-base) / 2 + var(--padding-base)) var(--padding-base) var(--padding-base);
	max-width: 600px;
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	z-index: 20;
	button.close-trigger {
		all: unset;
		box-sizing: border-box;
		cursor: pointer;
		position: absolute;
		top: calc(var(--padding-base) / 2);
		right: calc(var(--padding-base) / 2);
		svg {
			height: calc(var(--padding-base) / 2);
			width: calc(var(--padding-base) / 2);
		}
	}
}


</style>