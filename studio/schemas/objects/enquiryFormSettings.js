import { defineType, defineField, defineArrayMember } from 'sanity'

export default defineType({
	type: 'object',
	title: 'Enquiry form settings',
	name: 'enquiryFormSettings',
	fields: [
		defineField({
			type: 'string',
			title: 'Subtitle',
			name: 'subtitle',
			description: "'I am interested in viewing' or 'Contact holiday host' e.g.",
			validation: Rule => Rule.required(),
		}),
		defineField({
			type: 'text',
			title: 'Description/disclaimer',
			name: 'disclaimer',
			rows: 3,
		}),
		defineField({
			type: 'string',
			title: 'Submit button label',
			name: 'submitButtonLabel',
		}),
		defineField({
			type: 'text',
			title: 'Success message',
			name: 'successMessage',
			rows: 3,
			validation: Rule => Rule.required(),
		}),
	]
})