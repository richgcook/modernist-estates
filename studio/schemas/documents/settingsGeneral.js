import { defineType, defineField, defineArrayMember } from 'sanity'
import { ArrowSquareIn, ArrowSquareOut, TextAlignLeft } from '@phosphor-icons/react'
import { PAGE_REFERENCES } from '../../constants'

export default defineType({
	type: 'document',
	title: 'General settings',
	name: 'settingsGeneral',
	fields: [
		defineField({
			type: 'array',
			title: 'Menu',
			name: 'menu',
			of: [
				defineArrayMember({
					type: 'reference',
					title: 'Internal link',
					name: 'internalLink',
					to: PAGE_REFERENCES,
					/*
					preview: {
						select: {
							title: 'internalLink.title',
						},
						prepare(selection) {
							const { title } = selection
							return {
								title: title,
								media: ArrowSquareIn
							}
						}
					}
					*/
				}),
				defineArrayMember({
					type: 'object',
					title: 'External link',
					name: 'externalLink',
					fields: [
						defineField({
							type: 'string',
							title: 'Label',
							name: 'label',
							validation: Rule => Rule.required()
						}),
						defineField({
							type: 'url',
							title: 'URL',
							name: 'url',
							validation: Rule => Rule.uri({scheme: ['tel', 'mailto', 'http', 'https']}).required()
						})
					],
					preview: {
						select: {
							label: 'label',
							url: 'url'
						},
						prepare(selection) {
							const { label, url } = selection
							return {
								title: label,
								subtitle: url,
								media: ArrowSquareOut
							}
						}
					}
				})
			],
			validation: Rule => Rule.unique()
		}),
		defineField({
			type: 'array',
			title: 'Footer',
			name: 'footerContent',
			validation: Rule => Rule.max(3),
			of: [
				defineArrayMember({
					type: 'object',
					title: 'Column',
					name: 'column',
					fields: [
						defineField({
							type: 'richText',
							title: 'Text',
							name: 'text',
							validation: Rule => Rule.required()
						}),
					],
					preview: {
						select: {
							text: 'text'
						},
						prepare(selection) {
							const { text } = selection
							return {
								title: 'Text',
								subtitle: text ? text[0].children[0].text.substring(0, 50) + '...' : '',
								media: TextAlignLeft
							}
						}
					},
				}),
			],
		}),
	]
})