import { defineType, defineField } from 'sanity'

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
			type: 'pageBuilderB',
			title: 'Content',
			name: 'pageBuilder',
		}),
		defineField({
			title: 'SEO / Share Settings',
			name: 'seo',
			type: 'seo'
		}),
	]
})