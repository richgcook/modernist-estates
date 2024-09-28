import { defineType, defineField, defineArrayMember } from 'sanity'

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
					],
					preview: {
						select: {
							image: 'image',
						},
						prepare(selection) {
							const { image } = selection
							return {
								title: 'Image',
								media: image
							}
						}
					}
				}),
				/*
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
				*/
			],
		}),
		defineField({
			type: 'array',
			title: 'Featured projects',
			name: 'featuredProjects',
			of: [
				defineArrayMember({
					type: 'object',
					title: 'Project',
					name: 'project',
					fields: [
						defineField({
							type: 'reference',
							title: 'Project',
							name: 'project',
							to: [{ type: 'project' }],
							validation: Rule => Rule.required()
						}),
						defineField({
							type: 'object',
							title: 'Images',
							name: 'images',
							fields: [
								defineField({
									type: 'image',
									title: 'Image',
									name: 'imageA',
									fields: [
										defineField({
											type: 'alt',
											name: 'alt',
										}),
									],
									options: {
										collapsed: false
									},
									validation: Rule => Rule.required()
								}),
								defineField({
									type: 'image',
									title: 'Image (hover state)',
									name: 'imageB',
									description: 'Landscape images should have a portrait image partner, and vice versa',
									fields: [
										defineField({
											type: 'alt',
											name: 'alt',
										}),
									],
									options: {
										collapsed: false
									},
								}),
							],
						}),
						defineField({
							type: 'object',
							title: 'Settings',
							name: 'settings',
							fields: [
								defineField({
									type: 'object',
									title: 'Image position (desktop)',
									name: 'columnPosition',
									description: 'From a total of 20 columns, please indicate the start column and end column',
									options: {
										columns: 2,
										collapsed: false,
									},
									fields: [
										defineField({
											type: 'number',
											title: 'Start',
											name: 'start',
											description: 'Which column to start at',
											validation: Rule => Rule.required().min(1).max(20)
										}),
										defineField({
											type: 'number',
											title: 'End',
											name: 'end',
											description: 'Which column to end at',
											validation: Rule => Rule.required().min(1).max(20)
										}),
									],
								}),
								defineField({
									type: 'object',
									title: 'Image position (phone)',
									name: 'columnPositionXs',
									description: 'From a total of 10 columns, please indicate the start column and end column',
									options: {
										columns: 2,
										collapsed: false,
									},
									fields: [
										defineField({
											type: 'number',
											title: 'Start',
											name: 'start',
											description: 'Which column to start at',
											validation: Rule => Rule.required().min(1).max(10)
										}),
										defineField({
											type: 'number',
											title: 'End',
											name: 'end',
											description: 'Which column to end at',
											validation: Rule => Rule.required().min(1).max(10)
										}),
									],
								}),
								defineField({
									type: 'string',
									title: 'Top offset (desktop)',
									name: 'topOffset',
									description: 'Top distance from the previous project',
									options: {
										list: [
											{ title: '0', value: '0' },
											{ title: '80', value: '80' },
											{ title: '120', value: '120' },
											{ title: '160', value: '160' },
										],
									},
									initialValue: '0',
									validation: Rule => Rule.required()
								}),
							],
						}),
					],
					preview: {
						select: {
							projectTitle: 'project.title',
							imageA: 'images.imageA',
							columnPosition: 'settings.columnPosition',
						},
						prepare(selection) {
							const { projectTitle, imageA, columnPosition } = selection
							return {
								title: projectTitle,
								subtitle: `${columnPosition.start}/${columnPosition.end}`,
								media: imageA
							}
						}
					}
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