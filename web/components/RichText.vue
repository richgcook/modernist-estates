<template>
	<div class="text">
		<SanityContent :blocks="blocks" :serializers="serializers" />
	</div>
</template>

<script setup>

import externalLink from '~/components/serializers/ExternalLink'
import internalLink from '~/components/serializers/InternalLink'
import fileUploadLink from '~/components/serializers/FileUploadLink'

const props = defineProps({
	blocks: Array
})

const serializers = {
	marks: {
		link: externalLink,
		internalLink: internalLink,
		fileUploadLink: fileUploadLink
	}
}

</script>

<style lang="scss" scoped>

div.text {
	white-space: pre-line;
	:deep(h3) {
		font-size: var(--font-size-md);
		line-height: 1.33;
	}
	:deep(h4) {
		font-family: var(--font-sans);
		font-size: var(--font-size-sm);
		text-transform: uppercase;
		letter-spacing: 0.06em;
		& + p {
			margin-top: -1.2rem;
		}
	}
	:deep(strong) {
		display: block;
		font-family: var(--font-sans);
		font-size: var(--font-size-sm);
		font-weight: normal;
		text-transform: uppercase;
		letter-spacing: 0.06em;
	}
	:deep(ul) {
		li {
			padding-left: 1.5em;
			position: relative;
			&:before {
				content: '—';
				position: absolute;
				left: 0;
			}
			&:not(:last-child) {
				margin-bottom: 3px;
			}
		}
	}
	:deep(> *) {
		margin: 1.2em 0;
		&:first-child {
			margin-top: 0 !important;
		}
		&:last-child {
			margin-bottom: 0 !important;
		}
	}
}

</style>