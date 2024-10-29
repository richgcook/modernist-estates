import { defineType, defineField, defineArrayMember } from 'sanity'
import { FileArrowDown } from '@phosphor-icons/react'
import { orderRankField } from '@sanity/orderable-document-list'

export default defineType({
	type: "document",
	title: "Property",
	name: "property",
	fieldsets: [
		{ name: 'location', options: { columns: 2 } }
	],
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
			type: 'image',
			title: 'Featured image',
			name: 'featuredImage',
			fields: [
				{
					type: 'alt',
					name: 'alt'
				}
			],
			validation: Rule => Rule.required()
		}),
		defineField({
			type: 'array',
			name: 'images',
			title: 'Images',
			of: [{ type: 'image' }],
		}),
		defineField({
			type: 'reference',
			title: 'Group',
			name: 'propertyGroup',
			to: [
				{ type: 'propertiesForSalePage' },
				{ type: 'propertiesForRentPage' },
				{ type: 'propertiesForHolidayPage' },
			],
			validation: Rule => Rule.required(),
		}),
		// Start filter fields
		defineField({
			type: 'reference',
			title: 'Status',
			name: 'status',
			to: [{ type: 'propertyFilterStatus' }],
		}),
		defineField({
			type: 'string',
			title: 'Status (other)',
			name: 'statusOther',
		}),
		defineField({
			type: 'reference',
			title: 'Location',
			name: 'location',
			to: [{ type: 'propertyFilterLocation' }],
		}),
		defineField({
			type: 'string',
			title: 'Location (other)',
			name: 'locationOther',
		}),
		defineField({
			type: 'reference',
			title: 'Price (range)',
			name: 'priceRange',
			to: [{ type: 'propertyFilterPrice' }],
		}),
		defineField({
			type: 'reference',
			title: 'Bedrooms',
			name: 'bedroomCount',
			to: [{ type: 'propertyFilterBedrooms' }],
		}),
		// End filter fields
		defineField({
			type: 'array',
			title: 'Details',
			name: 'details',
			description: 'Price, sleeps, tenure, property type, architect, etc.',
			of: [
				defineArrayMember({
					type: 'object',
					title: 'Detail',
					name: 'detail',
					fields: [
						defineField({
							type: 'string',
							title: 'Label',
							name: 'label',
						}),
						defineField({
							type: 'string',
							title: 'Value',
							name: 'value',
						}),
					],
					preview: {
						select: {
							label: 'label',
							value: 'value',
						},
						prepare(selection) {
							const { label, value } = selection
							return {
								title: label,
								subtitle: value,
								media: FileArrowDown
							}
						},
					},
				})
			]
		}),
		defineField({
			type: 'array',
			title: 'Downloads',
			name: 'downloads',
			of: [
				defineArrayMember({
					type: 'object',
					title: 'Download',
					name: 'download',
					fields: [
						defineField({
							type: 'string',
							title: 'Label',
							name: 'label',
						}),
						defineField({
							type: 'file',
							title: 'File',
							name: 'file',
						}),
					],
					preview: {
						select: {
							label: 'label',
						},
						prepare(selection) {
							const { label } = selection
							return {
								title: label,
								media: FileArrowDown
							}
						},
					},
				})
			]
		}),
		defineField({
			type: 'richText',
			title: 'Description',
			name: 'description',
			validation: Rule => Rule.required()
		}),
		defineField({
			type: 'object',
			title: 'Contact details',
			name: 'contact',
			fields: [
				defineField({
					type: 'string',
					title: 'Title',
					name: 'title',
					description: `'How to View', or 'How to Book', for example`,
				}),
				defineField({
					type: 'richText',
					title: 'Details',
					name: 'details',
				}),
				defineField({
					type: 'boolean',
					title: 'Show enquiry button',
					name: 'showEnquiryButton',
				}),
				defineField({
					type: 'string',
					title: 'Enquire button label',
					name: 'enquireButtonLabel',
					description: `Option to override the default (varies based on the property type)`,
					hidden: ({ parent }) => !parent?.showEnquiryButton,
				}),
				defineField({
					type: 'string',
					title: 'Email address',
					name: 'enquireButtonEmail',
					description: 'Used when an enquiry is submitted and will not be publicly visible',
					validation: Rule => Rule.regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
					hidden: ({ parent }) => !parent?.showEnquiryButton,
				}),
				defineField({
					type: 'string',
					title: 'Reference number',
					name: 'enquireButtonRef',
					description: 'Used when an enquiry is submitted and will not be publicly visible',
					hidden: ({ parent }) => !parent?.showEnquiryButton,
				}),
				defineField({
					type: 'boolean',
					title: 'Show alternative contact button',
					name: 'showAlternativeContactButton',
				}),
				defineField({
					type: 'string',
					title: 'Alternative contact label',
					name: 'alternativeContactLabel',
					hidden: ({ parent }) => !parent?.showAlternativeContactButton,
				}),
				defineField({
					type: 'url',
					title: 'Alternative contact link',
					name: 'alternativeContactLink',
					hidden: ({ parent }) => !parent?.showAlternativeContactButton,
				}),
			]
		}),
		defineField({
			title: 'SEO',
			name: 'seo',
			type: 'seo'
		}),
		orderRankField(
			{ type: 'property' }
		)
	]
})