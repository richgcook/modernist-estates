import { defineType, defineField, defineArrayMember } from 'sanity'

export default defineType({
	type: "document",
	title: "Page",
	name: "pageA",
	fields: [
		defineField({
			type: 'string',
			title: 'Title',
			name: 'title',
		}),
		defineField({
			type: 'slug',
			title: 'Slug',
			name: 'slug',
			options: {
				source: 'title'
			},
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