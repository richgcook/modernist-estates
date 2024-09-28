import { defineType, defineField, defineArrayMember } from 'sanity'
import { orderRankField } from '@sanity/orderable-document-list'
import { Link } from '@phosphor-icons/react'

export default defineType({
	type: "document",
	title: "Press",
	name: "press",
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
			title: 'Subtitle',
			name: 'subtitle',
			description: '"Wallpaper, July 2024", for example',
			validation: Rule => Rule.required()
		}),
		defineField({
			type: 'object',
			title: 'Link',
			name: 'link',
			fields: [
				defineArrayMember({
					type: 'object',
					title: 'File',
					name: 'file',
					fields: [
						defineField({
							type: 'file',
							title: 'File',
							name: 'file',
						}),
					],
				}),
				/*
				defineArrayMember({
					type: 'object',
					title: 'Internal',
					name: 'internal',
					fields: [
						defineField({
							type: 'reference',
							title: 'Page',
							name: 'page',
							to: PAGE_REFERENCES,
						}),
					],
				}),
				*/
				defineArrayMember({
					type: 'object',
					title: 'External',
					name: 'external',
					fields: [
						defineField({
							type: 'url',
							title: 'URL',
							name: 'url',
							validation: Rule => Rule.uri({scheme: ['tel', 'mailto', 'http', 'https']}).required()
						})
					],
				})
			],
		}),
		defineField({
			title: 'SEO',
			name: 'seo',
			type: 'seo'
		}),
		orderRankField(
			{ type: 'press' }
		)
	],
	preview: {
		select: {
			title: 'title',
			subtitle: 'subtitle',
		},
		prepare(selection) {
			const { title, subtitle } = selection
			return {
				title: title,
				subtitle: subtitle,
				media: Link
			}
		},
	},
})