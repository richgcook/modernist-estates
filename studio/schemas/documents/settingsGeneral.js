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
					type: 'links',
					title: 'Menu',
					name: 'menu',
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