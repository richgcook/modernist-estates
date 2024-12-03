<template>
	<div class="newsletter-signup">
		<h3>Join our mailing list for regular property updates and news</h3>
		<!-- TODO -->
		<form id="subForm" class="subscribe__form js-cm-form" action="https://www.createsend.com/t/subscribeerror?description=" method="post" data-id="A61C50BEC994754B1D79C5819EC1255C1D338FFC5C5C212B1BD020EAC9F8B4909AFDB44BA255766D944F107CDF4532824455EEAC3CFE8EAB2C84A1641C991EAB">
			<input id="fieldEmail" class="js-cm-email-input" type="email" placeholder="Email" name="cm-gldhly-gldhly" required />
			<div class="consent">
				<input type="checkbox" :id="`consent-${context}`" name="consent" required />
				<label :for="`consent-${context}`">I accept the Privacy and Cookies Policy and Terms and Conditions*</label>
			</div>
			<button type="submit">Subscribe</button>
		</form>
	</div>
</template>

<script setup>

const props = defineProps({
	context: {
		type: String,
		default: 'footer'
	}
})

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
			column-gap: calc(var(--padding-base) / 3);
			input[type="checkbox"] {
				all: unset;
				box-sizing: border-box;
				cursor: pointer;
				flex-shrink: 0;
				position: relative;
				top: 0.3em;
				display: block;
				border: 1px solid currentColor;
				height: calc(var(--padding-base) / 2);
				width: calc(var(--padding-base) / 2);
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
			}
		}
		button {
			display: none;
		}
	}
}

</style>