<template>
	<div class="property">
		<NuxtLink :to="useInternalLinkUrl(property)" class="featured-images" :class="{ '--has-secondary': property.featuredImages.imageSecondary?.asset }" v-if="property.featuredImages?.imagePrimary?.asset">
			<Img
				:src="property.featuredImages.imagePrimary.asset.url" 
				:sizes="`
					(max-width: 768px) 100vw, 
					(min-width: 768px) and (max-width: 1023px) 50vw, 
					33vw`"
				:alt="property.featuredImages.imagePrimary.alt" 
			/>
			<Img
				:src="property.featuredImages.imageSecondary.asset.url" 
				:sizes="`
					(max-width: 768px) 100vw, 
					(min-width: 768px) and (max-width: 1023px) 50vw, 
					33vw`"
				:alt="property.featuredImages.imageSecondary.alt" 
				v-if="property.featuredImages.imageSecondary?.asset"
			/>
		</NuxtLink>
		<div class="details">
			<h5 class="status" :class="{ '--unavailable': property.status && usePropertyIsUnavailable(property.status) }">{{ property.status ? property.status.title : property.statusOther }}</h5>
			<h3 class="title">{{ property.titleFormatted }}</h3>
			<h3 class="price" v-if="priceFromDetails">{{ priceFromDetails }}</h3>
			<NuxtLink :to="useInternalLinkUrl(property)" class="view-more">View more</NuxtLink>
		</div>
	</div>
</template>

<script setup>

const props = defineProps({
	property: Object
})

const priceFromDetails = computed(() => {
	const priceItem = props.property.details?.find(item => item.label === 'Price')
	return priceItem ? priceItem.value : null
})

</script>

<style lang="scss" scoped>

div.property {
	display: grid;
	row-gap: calc(var(--padding-base) / 2);
	align-content: flex-start;
	@include media('tablet-portrait-and-phone') {
		row-gap: 0;
	}
	a.featured-images {
		display: block;
		aspect-ratio: 4 / 3;
		position: relative;
		overflow: hidden;
		&.--has-secondary {
			&:hover {
				img {
					&:nth-child(2) {
						opacity: 1;
					}
				}
			}
		}
		img {
			position: absolute;
			inset: 0;
			height: 100%;
			width: 100%;
			object-fit: cover;
			transition: opacity 0.3s;
			&:nth-child(2) {
				opacity: 0;
				z-index: 1;
			}
		}
	}
	div.details {
		@include media('tablet-portrait-and-phone') {
			padding: 0 var(--padding-base);
			margin-top: var(--padding-base);
		}
	}
	h5.status {
		font-family: var(--font-sans);
		font-size: var(--font-size-xs);
		font-weight: 900;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		margin-bottom: 5px;
		&.--unavailable {
			color: var(--color-highlight);
		}
	}
	h3.title,
	h3.price {
		font-size: var(--font-size-md);
		line-height: 1.25;
	    white-space: pre-wrap;
	}
	a.view-more {
		display: inline-flex;
		margin-top: 10px;
		@include media('tablet-portrait-and-phone') {
			font-size: var(--font-size-md);
		}
	}
}

</style>