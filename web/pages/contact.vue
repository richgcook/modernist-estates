<template>
	<div>
		<PageTitle :title="data.contactPage.title" />
		<div class="details">
			<RichText :blocks="data.contactPage.details" v-if="data.contactPage.details?.length" />
			<RichText :blocks="data.contactPage.furtherDetails" v-if="data.contactPage.furtherDetails?.length" />
		</div>
	</div>
</template>

<script setup>

const { $seoQuery, $richTextQuery, $imageQuery } = useNuxtApp()

const query = groq`{ 

	"contactPage": *[_type == "contactPage"] {
		_id, _type, title, slug, seo {
			${$seoQuery}
		},
		details[] {
			${$richTextQuery}
		},
		furtherDetails[] {
			${$richTextQuery}
		},
	}[0],
	
}`

const { data } = await useSanityQuery(query)

const { title, description, image, bodyClass } = useMetaBodyHelpers(data?.value.contactPage)

useHead({
	title: title.value,
	meta: useSeoFields({
		title: title.value,
		description: description.value,
		image: image.value
	}),
	bodyAttrs: {
		class: bodyClass.value
	}
})

</script>

<style lang="scss" scoped>

div.details {
	display: grid;
	grid-template-columns: repeat(15, 1fr);
	gap: calc(var(--padding-base) * 4) var(--padding-base);
	padding: 0 var(--padding-base);
	> div {
		grid-column: 1 / span 7;
		&:nth-child(1) {
			font-size: var(--font-size-lg);
		}
		&:nth-child(2) {
			font-size: 24px;
			line-height: 1.45;
		}
	}
}

</style>