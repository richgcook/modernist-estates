import { TextAlignLeft, List, SortAscending } from '@phosphor-icons/react'
import { defineType, defineField, defineArrayMember } from 'sanity'

export default defineType({
	type: 'array',
	name: 'pageBuilderC',
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
			title: 'FAQ/accordion list',
			name: 'accordionListBlock',
			fields: [
				defineField({
					type: 'string',
					title: 'Title',
					name: 'title'
				}),
				defineField({
					type: 'array',
					title: 'List',
					name: 'list',
					of: [
						defineArrayMember({
							type: 'object',
							title: 'Item',
							name: 'item',
							fields: [
								defineField({
									type: 'string',
									title: 'Title',
									name: 'title',
									validation: Rule => Rule.required()
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
										title: title ? title : 'Item',
										subtitle: text ? text[0].children[0].text.substring(0, 50) + '...' : '',
										media: List
									}
								},
							},
						}),
					],
				}),
			],
			preview: {
				select: {
					title: 'title',
					list: 'list',
				},
				prepare(selection) {
					const { title, list } = selection
					return {
						title: title ? title : 'Accordion list',
						subtitle: list?.length ? `1. ${list[0]?.title}` : '',
						media: SortAscending
					}
				},
			},
		}),
	]
})