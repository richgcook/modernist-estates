import { defineType, defineField, defineArrayMember } from 'sanity'
import { PAGE_REFERENCES } from '../../constants'

export default defineType({
	type: "document",
	title: "About",
	name: "aboutPage",
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
			type: 'image',
			title: 'Featured image',
			name: 'featuredImage',
			fields: [
				{
					type: 'alt',
					name: 'alt'
				}
			],
		}),
		defineField({
			type: 'richText',
			title: 'Introduction',
			name: 'introduction',
		}),
		defineField({
			type: 'pageBuilderC',
			title: 'Content',
			name: 'content',
		}),
		defineField({
			type: 'object',
			title: 'Services/Offering',
			name: 'services',
			fields: [
				defineField({
					type: 'string',
					title: 'Title',
					name: 'title',
				}),
				defineField({
					type: 'array',
					title: 'Content',
					name: 'contentBlocks',
					of: [
						defineArrayMember({
							type: 'object',
							title: 'Block',
							name: 'imageTextBlock',
							fields: [
								defineField({
									type: 'image',
									title: 'Image',
									name: 'image',
									fields: [
										defineField({
											type: 'alt',
											name: 'alt'
										}),
									],
								}),
								defineArrayMember({
									type: 'reference',
									title: 'Internal link',
									name: 'internalLink',
									to: PAGE_REFERENCES,
								}),
								defineField({
									type: 'string',
									title: 'Title',
									name: 'title',
								}),
								defineField({
									type: 'richText',
									title: 'Description',
									name: 'description',
								}),
							],
						}),
					],
				}),
			],
		}),
		defineField({
			title: 'SEO',
			name: 'seo',
			type: 'seo'
		}),
	],
})  