import { defineType, defineField, defineArrayMember } from 'sanity'
import { orderRankField } from '@sanity/orderable-document-list'
import { Link } from '@phosphor-icons/react'

export default defineType({
	type: "document",
	title: "Article",
	name: "journalArticle",
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
			type: 'text',
			title: 'Title (formatted)',
			name: 'titleFormatted',
			rows: 2,
			validation: Rule => Rule.required()
		}),
		defineField({
			type: 'string',
			title: 'Subtitle',
			name: 'subtitle',
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
			type: 'pageBuilderB',
			title: 'Content',
			name: 'pageBuilder',
		}),
		defineField({
			title: 'SEO',
			name: 'seo',
			type: 'seo'
		}),
	],
})