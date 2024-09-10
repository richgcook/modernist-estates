import { defineType, defineField, defineArrayMember } from 'sanity'
import { Play } from '@phosphor-icons/react'

export default defineType({
	type: "document",
	title: "Home",
	name: "homePage",
	fields: [
		defineField({
			type: 'array',
			title: 'Landing media',
			name: 'landingMedia',
			of: [
				defineArrayMember({
					type: 'object',
					title: 'Image',
					name: 'imageBlock',
					fields: [
						defineField({
							type: 'image',
							title: 'Image',
							name: 'image',
							fields: [
								defineField({
									type: 'alt',
									name: 'alt'
								})
							],
							validation: Rule => Rule.required()
						}),
						defineField({
							type: 'assetTreatment',
							title: 'Treatment',
							name: 'assetTreatment',
						}),
					],
					preview: {
						select: {
							image: 'image',
							assetTreatmentType: 'assetTreatment.type'
						},
						prepare(selection) {
							const { image, assetTreatmentType } = selection
							return {
								title: 'Image',
								subtitle: assetTreatmentType === 'duotone' ? 'Duotone' : 'Overlay',
								media: image
							}
						}
					}
				}),
				defineArrayMember({
					type: 'object',
					title: 'Video',
					name: 'videoBlock',
					fields: [
						defineField({
							type: 'file',
							title: 'Video',
							name: 'video',
							options: {
								accept: 'video/*'
							},
							validation: Rule => Rule.required()
						}),
						defineField({
							type: 'assetTreatment',
							title: 'Treatment',
							name: 'assetTreatment',
						}),
					],
					preview: {
						select: {
							assetTreatmentType: 'assetTreatment.type'
						},
						prepare(selection) {
							const { assetTreatmentType } = selection
							return {
								title: 'Video',
								subtitle: assetTreatmentType === 'duotone' ? 'Duotone' : 'Overlay',
								media: Play
							}
						}
					},
				}),
			],
		}),
		defineField({
			title: 'SEO',
			name: 'seo',
			type: 'seo'
		}),
	],
	preview: {
		prepare() {
			return {
				title: 'Home'
			}
		}
	}
})  