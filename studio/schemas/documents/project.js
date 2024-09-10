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
			type: 'array',
			title: 'Categories',
			name: 'categories',
			of: [
				defineArrayMember({
					type: 'reference',
					to: [{ type: 'projectCategory' }]
				}),
			],
		}),
		defineField({
			type: 'object',
			title: 'Featured media',
			name: 'featuredMedia',
			fields: [
				defineField({
					type: 'image',
					title: 'Image',
					name: 'image',
					fields: [
						defineField({
							type: 'alt',
							name: 'alt',
						}),
					],
				}),
				defineField({
					type: 'file',
					title: 'Video',
					name: 'video',
					options: {
						accept: 'video/*'
					},
					description: 'If used this will override the image'
				}),
				defineField({
					type: 'assetTreatment',
					title: 'Treatment',
					name: 'assetTreatment',
				}),
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
		orderRankField(
			{ type: 'project' }
		)
	]
})