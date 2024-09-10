import { TextAlignLeft } from '@phosphor-icons/react'
import { defineType, defineField, defineArrayMember } from 'sanity'

export default defineType({
	type: 'array',
	name: 'pageBuilderA',
	title: 'Page builder',
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
					type: 'richText',
					title: 'Caption',
					name: 'caption'
				}),
			],
			preview: {
				select: {
					caption: 'caption',
					image: 'image'
				},
				prepare(selection) {
					const { caption, image } = selection
					return {
						title: 'Image',
						subtitle: caption ? caption[0].children[0].text.substring(0, 50) + '...' : '',
						media: image
					}
				},
			},
		}),
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
					type: 'richText',
					title: 'Caption',
					name: 'caption'
				}),
			],
			preview: {
				select: {
					caption: 'caption',
					image: 'image'
				},
				prepare(selection) {
					const { caption, image } = selection
					return {
						title: 'Video',
						subtitle: caption ? caption[0].children[0].text.substring(0, 50) + '...' : '',
						media: image
					}
				},
			},
		}),
	]
})