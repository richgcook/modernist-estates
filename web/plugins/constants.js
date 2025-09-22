const seoQuery = `
	metaTitle, metaDescription,
	"shareImage": shareImage.asset->url
`

const internalLinkQuery = `
	_id, _type, title, slug, seo {
		${seoQuery}
	}
`

const richTextQuery = `
	...,
	markDefs[] {
		...,
		_type == "internalLink" => {
			"reference": @.reference->{
				${internalLinkQuery}
			},
			symbolArrow,
		},
		_type == "fileUploadLink" => {
			"file": file.asset->{
				url, extension, size
			},
			symbolArrow,
		},
	}
`

const imageQuery = `
	alt,
	asset->{
		_id,
		url,
		"height": metadata.dimensions.height,
		"width": metadata.dimensions.width,
		"orientation": select(
			metadata.dimensions.height == metadata.dimensions.width => "square",
			metadata.dimensions.height > metadata.dimensions.width => "portrait",
			"landscape"
		),
		"ratio": metadata.dimensions.aspectRatio
	}
`

const internalExternalLinkQuery = `
	_type,
	_type == "internal" => {
		page-> {
			_type, _id, _type, title, slug, seo {
				${seoQuery}
			},
		},
		label,
	},
	_type == "external" => {
		label, url
	},
	_type == "fileUpload" => {
		label,
		"file": file.asset->url,
	}
`

const pageBuilderBQuery = `
	_type,
		_type == "textBlock" => {
		title,
		text[] {
			${richTextQuery}
		},
		textColumnCount
	},
	_type == "imageBlock" => {
		image {
			${imageQuery}
		},
		caption[] {
			${richTextQuery}
		},
		settings,
	},
	_type == "imagesBlock" => {
		images[] {
			image {
				${imageQuery}
			},
			caption[] {
				${richTextQuery}
			},
		},
	}
`

const pageBuilderCQuery = `
	_type,
	_type == "textBlock" => {
		title,
		text[] {
			${richTextQuery}
		},
	},
	_type == "accordionListBlock" => {
		title,
		list[] {
			title,
			text[] {
				${richTextQuery}
			},
		},
	}
`

const journalArticleQuery = `
	_id, _type, title, slug, seo {
		${seoQuery}
	},
	titleFormatted, subtitle,
	featuredImage {
		${imageQuery}
	},
	pageBuilder[] {
		${pageBuilderBQuery}
	}
`

const propertyQuery = `
	_id, _type, title, slug, seo {
		${seoQuery}
	},
	titleFormatted,
	featuredImage {
		${imageQuery}
	},
	featuredImages {
		imagePrimary {
			${imageQuery}
		},
		imageSecondary {
			${imageQuery}
		},
	},
	images[] {
		${imageQuery}
	},
	propertyGroup->{
		_id, _type, title, slug, seo {
			${seoQuery}
		},
		enquiryFormSettings,
	},
	status->{
		_id, _type, title, slug, seo {
			${seoQuery}
		},
	},
	statusOther,
	location->{
		_id, _type, title, slug, seo {
			${seoQuery}
		},
	},
	locationMap,
	priceRange->{
		_id, _type, title, slug, seo {
			${seoQuery}
		},
	},
	bedroomCount->{
		_id, _type, title, slug, seo {
			${seoQuery}
		},
	},
	details[] {
		label, value,
	},
	links[] {
		${internalExternalLinkQuery}
	},
	description[] {
		${richTextQuery}
	},
	contact {
		title,
		details[] {
			${richTextQuery}
		},
		showEnquiryButton, enquireButtonLabel, enquireEmail, enquireRef, 
		showAlternativeContactButton, alternativeContactLabel, alternativeContactLink,
	},
	"filterables": {
		"propertyFilterLocation": [location->{
			_id, title
		}][defined(@)],
		"propertyFilterPrice": [priceRange->{
			_id, title
		}][defined(@)],
		"propertyFilterBedrooms": [bedroomCount->{
			_id, title
		}][defined(@)],
		"propertyFilterType": [type->{
			_id, title
		}][defined(@)],
		"propertyFilterPeriod": [period->{
			_id, title
		}][defined(@)],
		"propertyFilterStatus": [status->{
			_id, title
		}][defined(@)],
	}
`

const propertyGroupFiltersQuery = `
	{
		"title": "Location",
		"_type": "propertyFilterLocation",
		"items": *[_type == "propertyFilterLocation" && _id in *[_type == "property" && references(^.^._id) && hideFromListings != true].location._ref] | order(title asc) {
			_id, _type, title, slug,
		}
	},
	{
		"title": "Price",
		"_type": "propertyFilterPrice",
		"items": *[_type == "propertyFilterPrice" && _id in *[_type == "property" && references(^.^._id) && hideFromListings != true].priceRange._ref] | order(title asc) {
			_id, _type, title, slug,
		}
	},
	{
		"title": "Bedrooms",
		"_type": "propertyFilterBedrooms",
		"items": *[_type == "propertyFilterBedrooms" && _id in *[_type == "property" && references(^.^._id) && hideFromListings != true].bedroomCount._ref] | order(title asc) {
			_id, _type, title, slug,
		}
	},
	{
		"title": "Status",
		"_type": "propertyFilterStatus",
		"items": *[_type == "propertyFilterStatus" && _id in *[_type == "property" && references(^.^._id) && hideFromListings != true].status._ref] | order(title asc) {
			_id, _type, title, slug,
		}
	},
	{
		"title": "Type",
		"_type": "propertyFilterType",
		"items": *[_type == "propertyFilterType" && _id in *[_type == "property" && references(^.^._id) && hideFromListings != true].type._ref] | order(title asc) {
			_id, _type, title, slug,
		}
	},
	{
		"title": "Period",
		"_type": "propertyFilterPeriod",
		"items": *[_type == "propertyFilterPeriod" && _id in *[_type == "property" && references(^.^._id) && hideFromListings != true].period._ref] | order(title asc) {
			_id, _type, title, slug,
		}
	}
`

export default defineNuxtPlugin(nuxtApp => {
	nuxtApp.provide('seoQuery', seoQuery)
	nuxtApp.provide('internalLinkQuery', internalLinkQuery)
	nuxtApp.provide('richTextQuery', richTextQuery)
	nuxtApp.provide('imageQuery', imageQuery)
	nuxtApp.provide('pageBuilderBQuery', pageBuilderBQuery)
	nuxtApp.provide('pageBuilderCQuery', pageBuilderCQuery)
	nuxtApp.provide('propertyQuery', propertyQuery)
	nuxtApp.provide('propertyGroupFiltersQuery', propertyGroupFiltersQuery)
	nuxtApp.provide('journalArticleQuery', journalArticleQuery)
	nuxtApp.provide('internalExternalLinkQuery', internalExternalLinkQuery)
})