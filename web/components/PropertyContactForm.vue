<template>
	<div class="form">
		<div class="inner">
			<form name="property-contact-form" method="POST" @submit.prevent="submitForm" ref="form">

				<input type="hidden" name="property-id" :value="property._id" />
				<input type="hidden" name="property-title" :value="property.titleFormatted.replace(/\n/g, ', ')" />
				<input type="hidden" name="property-ref" :value="property.contact.enquireRef" />

				<input type="text" name="fatty-acids" tabindex="-1" value="" autocomplete="new-password" aria-hidden="true" />

				<div class="fields">
					<div class="field">
						<label for="name">First name*</label>
						<input type="text" name="first-name" required />
					</div>
					<div class="field">
						<label for="name">Last name*</label>
						<input type="text" name="last-name" required />
					</div>
					<div class="field">
						<label for="email">Email address*</label>
						<input type="email" name="email" required />
					</div>
					<div class="field">
						<label for="phone">Phone number*</label>
						<input type="tel" name="phone" required />
					</div>
					<div class="field --enquiry">
						<label for="enquiry">Enquiry*</label>
						<textarea name="enquiry" rows="3" required></textarea>
					</div>
				</div>
				<div class="consent">
					<div>
						<input type="checkbox" id="consent" name="consent" required />
						<label for="consent">I have read and accept the Privacy Policy and Terms and Conditions*</label>
					</div>
					<div>
						<input type="checkbox" id="newsletter-subscribe" name="newsletter-subscribe" />
						<label for="newsletter-subscribe">I would like to subscribe to the Modernist Estates newsletters</label>
					</div>
				</div>
				<div class="actions" v-show="!formSuccess">
					<button type="submit" :disabled="formSending">{{ submitButtonLabel }}</button>
				</div>
				<div class="message" v-show="formSuccess">{{ property.propertyGroup.enquiryFormSettings?.successMessage }}</div>
				<div class="message --error" v-show="formError">{{ errorMessage }}</div>
			</form>
		</div>
	</div>
</template>

<script setup>

const props = defineProps({
	property: Object,
})

const submitButtonLabel = computed(() => {
	if (formSending.value) {
		return 'Sending...'
	}
	return props.property.contact.enquireButtonLabel ? props.property.contact.enquireButtonLabel : `Submit`
})

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

	fetch('/api/resend/send-property-contact-form', {
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

form {
	display: grid;
	row-gap: var(--padding-base);
	position: relative;
	div.fields {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: calc(var(--padding-base) / 2);
		@include media('phone') {
			grid-template-columns: 1fr;
		}
		div.field {
			display: flex;
			flex-flow: column nowrap;
			row-gap: 10px;
			&.--enquiry {
				grid-column: 1 / -1;
			}
		}
	}
	input[type="text"],
	input[type="email"],
	input[type="tel"] {
		all: unset;
		box-sizing: border-box;
		border: 1px solid currentColor;
		padding: 5px 10px;
		@include placeholder {
			color: currentColor;
		}
		&[name="fatty-acids"] {
			opacity: 0;
			pointer-events: none;
			position: absolute;
			inset: 0;
			height: 0;
			width: 0;
			z-index: -1;
		}
	}
	textarea {
		all: unset;
		box-sizing: border-box;
		border: 1px solid currentColor;
		padding: 5px 10px;
	}
	div.consent {
		display: flex;
		flex-flow: column nowrap;
		row-gap: 10px;
		> div {
			display: flex;
			flex-flow: row nowrap;
			column-gap: 10px;
		}
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
			user-select: none;
			cursor: pointer;
			font-family: var(--font-sans);
			font-size: 14px;
			text-transform: uppercase;
			@include media('phone') {
				font-size: 12px;
			}
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
		background-color: black;
		color: white;
		border: 1px solid black;
		padding: 15px 40px;
		@include media('phone') {
			font-size: 12px;
			padding: 10px var(--padding-base);
		}
		&:hover {
			background-color: transparent;
			color: black;
		}
		&[disabled] {
			opacity: 0.5;
			pointer-events: none;
		}
	}
}

</style>