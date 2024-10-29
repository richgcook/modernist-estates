import { Play, YoutubeLogo } from '@phosphor-icons/react'
import { defineType, defineField, defineArrayMember } from 'sanity'

export default defineType({
	type: 'array',
	name: 'pageBuilderB',
	title: 'Page builder',
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
					validation: Rule => Rule.required()
				}),
			],
			preview: {
				select: {
					title: 'title',
					text: 'text',
				},
				prepare(selection) {
					const { title, text } = selection
					return {
						title: title ? title : 'Text',
						subtitle: text ? text[0].children[0].text.substring(0, 50) + '...' : '',
						media: TextAlignLeft
					}
				},
			},
		}),
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
			title: 'Images',
			name: 'imagesBlock',
			fields: [
				defineField({
					type: 'array',
					name: 'images',
					title: 'Images',
					validation: Rule => Rule.required().max(2),
					of: [
						defineArrayMember({
							type: 'object',
							title: 'Image',
							name: 'imageBlock',
							fields: [
								{
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
								},
								{
									type: 'richText',
									title: 'Caption',
									name: 'caption'
								}
							],
							preview: {
								select: {
									media: 'image'
								},
								prepare(selection) {
									const { media } = selection
									return {
										title: 'Image',
										media: media
									}
								},
							},
						}),
					],
				}),
			],
			preview: {
				select: {
					media: 'images.0.image'
				},
				prepare(selection) {
					const { media } = selection
					return {
						title: 'Images',
						media: media
					}
				},
			},
		}),
	]
})