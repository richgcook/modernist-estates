import { defineType, defineField } from 'sanity'

export default defineType({
	type: "document",
	title: "For Sale",
	name: "propertiesForSalePage",
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
			validation: Rule => Rule.required(),
			readOnly: true,
		}),
		defineField({
			type: 'enquiryFormSettings',
			title: 'Enquiry form settings',
			name: 'enquiryFormSettings',
		}),
		defineField({
			title: 'SEO',
			name: 'seo',
			type: 'seo'
		}),
	]
})