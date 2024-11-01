<template>
	<footer>
		<div class="container">
			<div class="logo">
				<NuxtLink to="/" class="logo"><Logo /></NuxtLink>
			</div>
			<div class="links">
				<ul class="links" v-if="data.settings.footer.menu?.length">
					<li v-for="(link, index) in data.settings.footer.menu" :key="index" class="title-h4">
						<NuxtLink :to="useLinkLink(link)">{{ link.label ? link.label : link.page?.title }}</NuxtLink>
					</li>
				</ul>
			</div>
			<div class="contact">
				<h5>Contact</h5>
				<RichText :blocks="data.settings.footer.contact" v-if="data.settings.footer.contact?.length" />
			</div>
			<div class="newsletter">
				<p>Join our mailing list for regular property updates and news</p>
				<!-- TODO -->
				<form id="subForm" class="subscribe__form js-cm-form" action="https://www.createsend.com/t/subscribeerror?description=" method="post" data-id="A61C50BEC994754B1D79C5819EC1255C1D338FFC5C5C212B1BD020EAC9F8B4909AFDB44BA255766D944F107CDF4532824455EEAC3CFE8EAB2C84A1641C991EAB">
					<input id="fieldEmail" class="js-cm-email-input" type="email" placeholder="Email" name="cm-gldhly-gldhly" required />
					<button type="submit">Subscribe</button>
				</form>
			</div>
		</div>
	</footer>
</template>

<script setup>

const { $seoQuery, $richTextQuery, $internalExternalLinkQuery } = useNuxtApp()

const query = groq`{ 

	"settings": *[_type == "settingsGeneral"] {
		footer {
			menu[] {
				${$internalExternalLinkQuery}
			},
			contact[] {
				${$richTextQuery}
			},
		}
	}[0]
	
}`

const { data } = await useSanityQuery(query)

const config = useRuntimeConfig()

</script>

<style lang="scss" scoped>

footer {
	margin-top: auto;
	div.container {
		background-color: var(--color-blue);
		padding: var(--padding-base);
		margin-top: calc(var(--padding-base) * 2);
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		gap: var(--padding-base);
		align-items: flex-end;
		div.logo {
			grid-column: 1 / -1;
			margin-bottom: var(--padding-base);
			a.logo {
				display: inline-flex;
				height: 18px;
				svg {
					height: auto;
					max-height: 100%;
					width: auto;
					max-width: 100%;
					fill: v-bind(textAndAssetColor);
					transition: fill 0.5s;
				}
			}
		}
		ul.links {
			display: flex;
			flex-flow: column nowrap;
			row-gap: 3px;
			li {
				font-family: var(--font-sans);
				font-size: 20px;
				text-transform: uppercase;
				letter-spacing: 0.1em;
			}
		}
		div.contact {
			font-size: var(--font-size-md);
			letter-spacing: 0.02em;
			h5 {
				font-family: var(--font-sans);
				font-size: 15px;
				font-weight: 900;
				text-transform: uppercase;
				letter-spacing: 0.1em;
			}
		}
		div.newsletter {
			display: grid;
			row-gap: calc(var(--padding-base) / 2);
			font-size: var(--font-size-md);
			letter-spacing: 0.02em;
			form {
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
				button {
					display: none;
				}
			}
		}
	}
}

</style>