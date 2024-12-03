<template>
	<div class="form">
		<div class="inner">
			<h3>{{ title }}</h3>
			<form 
				:name="titleAsSlug" 
				method="POST" 
				@submit.prevent="submitForm"
				ref="form"
			>
				<input type="hidden" name="form-title" :value="title" />
				<input type="hidden" name="form-name" :value="titleAsSlug" />
				<input type="text" name="fatty-acids" tabindex="-1" value="" autocomplete="new-password" aria-hidden="true" />
				<div class="fields">
					<input type="text" name="name" placeholder="Name" required />
					<input type="email" name="email" placeholder="Email" required />
					<input type="tel" name="telephone" placeholder="Telephone" required />
					<input type="text" name="address" placeholder="Address" required />
					<input type="text" name="town" placeholder="Town" required />
					<input type="text" name="postcode" placeholder="Postcode" required />
					<input type="text" name="message" placeholder="Message" required />
				</div>
				<div class="actions" v-show="!formSuccess">
					<button type="submit" :disabled="formSending">{{ formSending ? `Sending...` : `Submit` }}</button>
				</div>
				<div class="message" v-show="formSuccess">{{ successMessage }}</div>
				<div class="message --error" v-show="formError">{{ errorMessage }}</div>
			</form>
		</div>
	</div>
</template>

<script setup>

import slugify from 'slugify'

const props = defineProps({
	title: String,
	successMessage: String
})

const titleAsSlug = computed(() => slugify(props.title, { lower: true, strict: true }))

const form = ref(null)

const formSuccess = ref(false)
const formError = ref(false)
const formSending = ref(false)
const errorMessage = ref('')

const submitForm = () => {

	formSending.value = true
	
	const formData = new FormData(form.value)

	const formDataObject = {}
	formData.forEach((value, key) => {
		formDataObject[key] = value
	})

	// Honeypot
	if (formDataObject['fatty-acids']) {
		formSending.value = false
		return
	}

	fetch('/api/resend/send-contact-form', {
		method: 'POST',
		body: JSON.stringify(formDataObject)
	})
	.then(response => {
		if (!response.ok) {
			throw new Error('Failed to submit form...')
		}
		return response.json()
	})
	.then(() => {
		formSuccess.value = true
	})
	.catch((error) => {
		formSending.value = false
		formError.value = true
		errorMessage.value = error
	})

}

</script>

<style lang="scss" scoped>

div.form {
	display: grid;
	grid-template-columns: repeat(12, 1fr);
	grid-gap: calc(var(--padding-base) * 2) calc(var(--padding-base) / 2);
	margin-bottom: calc(-1 * (var(--padding-base) * 2));
	padding: calc(var(--padding-base) * 2) var(--padding-base);
	background-color: var(--color-holidays);
	div.inner {
		grid-column: 4 / span 6;
		display: grid;
		row-gap: var(--padding-base);
		h3 {
			font-family: var(--font-sans);
			font-size: 20px;
			text-transform: uppercase;
			letter-spacing: 0.06em;
			text-align: center;
		}
	}
}
form {
	display: grid;
	row-gap: var(--padding-base);
	position: relative;
	div.fields {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 10px calc(var(--padding-base) / 2);
	}
	input[type="text"],
	input[type="email"],
	input[type="tel"] {
		all: unset;
		box-sizing: border-box;
		@include placeholder {
			color: currentColor;
		}
		border-bottom: 1px dashed currentColor;
		&[name="usercode"] {
			opacity: 0;
			pointer-events: none;
			position: absolute;
			inset: 0;
			height: 0;
			width: 0;
			z-index: -1;
		}
		&[name="message"] {
			grid-column: 1 / span 2;
		}
	}
	div.actions {
		display: grid;
		justify-content: center;
	}
	button[type="submit"] {
		all: unset;
		box-sizing: border-box;
		cursor: pointer;
		display: inline-flex;
		font-family: var(--font-sans);
		font-size: 16px;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		border: 1px solid black;
		padding: 15px 40px;
		&:hover {
			background-color: black;
			color: white;
		}
	}
}

</style>