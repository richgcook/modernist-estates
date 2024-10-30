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
			}
		},
		_type == "fileUploadLink" => {
			"file": file.asset->{
				url, extension, size
			}
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

const projectItemQuery = `
	_id, _type, title, slug, seo {
		${seoQuery}
	},
	featuredImage {
		${imageQuery}
	},
`

const pageBuilderBQuery = `
	_type,
	_type == "mediaTextBlock" => {
		media[] {
			_type,
			_type == "imageBlock" => {
				image {
					${imageQuery}
				},
				caption[] {
					${richTextQuery}
				},
			},
			_type == "videoBlock" => {
				"video": video.asset->url,
				caption[] {
					${richTextQuery}
				},
			},
			_type == "embedBlock" => {
				coverImage {
					${imageQuery}
				},
				embedCode,
				caption[] {
					${richTextQuery}
				},
			},
		},
		text[] {
			${richTextQuery}
		},
		settings,
		relatedProjects[]-> {
			${projectItemQuery}
		},
	},
	_type == "textBlock" => {
		heading,
		text[] {
			${richTextQuery}
		},
		textColumnCount
	},
`

export default defineNuxtPlugin(nuxtApp => {
	nuxtApp.provide('seoQuery', seoQuery)
	nuxtApp.provide('internalLinkQuery', internalLinkQuery)
	nuxtApp.provide('richTextQuery', richTextQuery)
	nuxtApp.provide('imageQuery', imageQuery)
	nuxtApp.provide('pageBuilderBQuery', pageBuilderBQuery)
	nuxtApp.provide('projectItemQuery', projectItemQuery)
	nuxtApp.provide('internalExternalLinkQuery', internalExternalLinkQuery)
})