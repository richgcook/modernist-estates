import { defineType, defineField, defineArrayMember } from 'sanity'
import { orderRankField } from '@sanity/orderable-document-list'

export default defineType({
	type: "document",
	title: "Project",
	name: "project",
	fields: [
		defineField({
			type: 'string',
			title: 'Title',
			name: 'title',
			validation: Rule => Rule.required()
		}),
		defineField({
			type: 'slug',
			title: 'Slug',
			name: 'slug',
			options: {
				source: 'title'
			},
			validation: Rule => Rule.required()
		}),
		defineField({
			type: 'string',
			title: 'Title (abbreviated, for phone)',
			name: 'titleAbbreviated',
			description: 'This title will be used for the project when viewed on a phone. If not set, the full title will be used.',
			
		}),
		defineField({
			type: 'array',
			title: 'Media',
			name: 'content',
			options: {
				insertMenu: {
					showIcons: false,
				},
			},
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
								{
									type: 'alt',
									name: 'alt'
								}
							],
							validation: Rule => Rule.required()
						}),
						defineField({
							type: 'object',
							title: 'Settings',
							name: 'settings',
							fields: [
								defineField({
									type: 'string',
									title: 'Image size',
									name: 'imageSize',
									description: 'The default image size has generous margins. If you want to change the size, select one of the options below.',
									options: {
										list: [
											{ title: 'Fullbleed', value: 'fullbleed' },
										],
									},
								}),
								defineField({
									type: 'boolean',
									title: 'Enable caption',
									name: 'enableCaption',
									description: 'By default for fullbleed images, the caption is disabled',
									hidden: ({ parent }) => parent?.imageSize !== 'fullbleed',
								}),
								defineField({
									type: 'themeMode',
									title: 'Theme mode',
									name: 'themeMode',
								}),
							],
						}),
					],
					preview: {
						select: {
							image: 'image'
						},
						prepare(selection) {
							const { image } = selection
							return {
								title: 'Image',
								media: image
							}
						},
					},
				}),
			],
		}),
		defineField({
			type: 'richText',
			title: 'Description',
			name: 'description',
		}),
		defineField({
			type: 'array',
			title: 'Details',
			name: 'details',
			of: [
				defineArrayMember({
					type: 'object',
					title: 'Text',
					name: 'textBlock',
					fields: [
						defineField({
							type: 'string',
							title: 'Title',
							name: 'title'
						}),
						defineField({
							type: 'richText',
							title: 'Text',
							name: 'text',
							validation: Rule => Rule.required(),
						}),
					],
					preview: {
						select: {
							title: 'title',
							text: 'text'
						},
						prepare(selection) {
							const { title, text } = selection
							return {
								title: title ? title : text ? text[0].children[0].text.substring(0, 50) + '...' : '',
								subtitle: title ? text ? text[0].children[0].text.substring(0, 50) + '...' : '' : '',
							}
						},
					},
				}),
			]
		}),
		defineField({
			type: 'array',
			title: 'Related projects',
			name: 'relatedProjects',
			of: [{
				type: 'reference',
				to: [{ type: 'project' }]
			}],
			validation: Rule => Rule.max(4),
		}),
		defineField({
			title: 'SEO',
			name: 'seo',
			type: 'seo'
		}),
		orderRankField(
			{ type: 'project' }
		)
	]
})