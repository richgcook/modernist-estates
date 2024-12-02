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
				<NewsletterSubscribeForm />
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
					fill: black;
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
				letter-spacing: 0.06em;
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
	}
}

</style>