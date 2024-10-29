import { defineType, defineField } from 'sanity'

export default defineType({
	type: "document",
	title: "Letting",
	name: "lettingPage",
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
			title: 'SEO',
			name: 'seo',
			type: 'seo'
		}),
	]
})