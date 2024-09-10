import { defineType, defineField, defineArrayMember } from 'sanity'
import { orderRankField } from '@sanity/orderable-document-list'
import { Video } from '@phosphor-icons/react'

export default defineType({
	type: "document",
	title: "Category",
	name: "projectCategory",
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
			title: 'SEO',
			name: 'seo',
			type: 'seo'
		}),
		orderRankField(
			{ type: 'projectCategory' }
		)
	],
	preview: {
		select: {
			title: 'title',
			description: 'description',
			image: 'featuredMedia.image',
			video: 'featuredMedia.video'
		},
		prepare(selection) {
			const { title, description, image, video } = selection
			return {
				title: title,
				media: video ? Video : image
			}
		}
	}
})