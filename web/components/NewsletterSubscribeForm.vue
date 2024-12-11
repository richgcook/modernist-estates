<template>
	<div class="newsletter-signup">
		<h3>Join our mailing list for regular property updates and news</h3>
		<form @submit.prevent="subscribe" v-show="!isSuccess">
			<input type="email" v-model="email" placeholder="Email" required />
			<div class="consent">
				<input type="checkbox" :id="`consent-${context}`" name="consent" v-model="consent" required />
				<label :for="`consent-${context}`">I accept the Privacy Policy and Terms and Conditions*</label>
			</div>
			<button type="submit" :disabled="isSubscribing">Subscribe</button>
		</form>
		<div class="message --success" v-show="isSuccess">Thanks for subscribing!</div>
		<div class="message --error" v-show="isError">An unexpected error occurred. Please try again later.</div>
	</div>
</template>

<script setup>

import { useNewsletterSubscribeStore } from '~/store/newsletterSubscribe'
import { storeToRefs } from 'pinia'

const props = defineProps({
	context: {
		type: String,
		default: 'footer'
	}
})

const newsletterSubscribeStore = useNewsletterSubscribeStore()

const { isSubscribing, isSuccess, isError } = storeToRefs(newsletterSubscribeStore)
const { setSubscribing, setSuccess, setError, resetError } = newsletterSubscribeStore

const email = ref('')
const consent = ref(false)

const resetForm = () => {
	email.value = ''
	consent.value = false
	resetError()
}

const subscribe = async () => {

	setSubscribing()

	try {
    	const response = await $fetch('/api/campaign-monitor/subscribe', {
      		method: 'POST',
      		body: {
        		email: email.value,
      		},
    	})
		setSuccess()
		resetForm()
  	} catch (error) {
		setError()
  	}
}

</script>

<style lang="scss" scoped>

div.newsletter-signup {
	display: grid;
	row-gap: calc(var(--padding-base) / 2);
	> h3 {
		font-size: var(--font-size-md);
		line-height: 1.25;
		letter-spacing: 0.02em;
	}
	form {
		display: grid;
		row-gap: calc(var(--padding-base) / 2);
		input[type="email"] {
			all: unset;
			font-size: var(--font-size-md);
			letter-spacing: 0.02em;
			border-bottom: 1px dashed black;
			width: 100%;
			@include placeholder {
				font-style: italic;
				color: black;
			}
		}
		div.consent {
			display: flex;
			flex-flow: row nowrap;
			align-items: center;
			column-gap: 10px;
			input[type="checkbox"] {
				all: unset;
				box-sizing: border-box;
				cursor: pointer;
				flex-shrink: 0;
				position: relative;
				display: block;
				border: 1px solid currentColor;
				height: 20px;
				width: 20px;
				@include media('tablet') {
					font-size: 18px;
				}
				@include media('phone') {
					height: 16px;
					width: 16px;
				}
				&:checked:after {
					content: '';
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
					height: calc(100% + 1px);
					width: calc(100% + 1px);
					background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 15.02 15.52'%3E%3Crect class='cls-1' x='-2.83' y='7.39' width='20.78' height='.75' transform='translate(-3.28 7.84) rotate(-46.16)'/%3E%3Crect class='cls-1' x='7.09' y='-2.63' width='.75' height='20.78' transform='translate(-3.29 7.33) rotate(-43.83)'/%3E%3C/svg%3E");
					background-position: center;
					background-size: contain;
					background-repeat: no-repeat;
				}
			}
			label {
				font-size: 16px;
				user-select: none;
				cursor: pointer;
				@include media('laptop') {
					font-size: 14px;
				}
				@include media('tablet') {
					font-size: 13px;
				}
				@include media('phone') {
					font-size: var(--font-size-xs);
				}
			}
		}
		button {
			display: none;
		}
	}
}

</style>