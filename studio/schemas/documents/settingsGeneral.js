import { defineType, defineField, defineArrayMember } from 'sanity'
import { ArrowSquareIn, ArrowSquareOut, TextAlignLeft } from '@phosphor-icons/react'
import { PAGE_REFERENCES } from '../../constants'

export default defineType({
	type: 'document',
	title: 'General settings',
	name: 'settingsGeneral',
	fields: [
		defineField({
			type: 'object',
			title: 'Footer',
			name: 'footer',
			fields: [
				defineField({
					type: 'array',
					title: 'Menu',
					name: 'menu',
					of: [
						defineArrayMember({
							type: 'object',
							title: 'Internal link',
							name: 'internalLink',
							fields: [
								defineField({
									type: 'reference',
									title: 'Page',
									name: 'page',
									to: PAGE_REFERENCES,
									validation: Rule => Rule.required()
								}),
							],
							preview: {
								select: {
									title: 'page.title',
								},
								prepare(selection) {
									const { title } = selection
									return {
										title: title,
										media: ArrowSquareIn
									}
								}
							}
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
					type: 'richText',
					title: 'Contact',
					name: 'contact',
					validation: Rule => Rule.required()
				}),
			],
		}),
	]
})