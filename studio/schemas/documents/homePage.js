import { defineType, defineField, defineArrayMember } from 'sanity'
import { Quotes } from '@phosphor-icons/react'
import { PAGE_REFERENCES, BASE_COLORS } from '../../constants'

export default defineType({
	type: "document",
	title: "Home",
	name: "homePage",
	fields: [
		defineField({
			type: 'object',
			title: 'Landing',
			name: 'landing',
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
					title: 'Text',
					name: 'text',
					validation: Rule => Rule.required(),
				}),
			],
		}),
		defineField({
			type: 'object',
			title: 'Hero',
			name: 'hero',
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
			],
		}),
		defineField({
			type: 'array',
			title: 'Featured Links (grid)',
			name: 'featuredLinks',
			of: [
				defineArrayMember({
					type: 'object',
					title: 'Block',
					name: 'linkBlock',
					fields: [
						defineField({
							type: 'image',
							title: 'Image',
							name: 'image',
							fields: [
								defineField({
									type: 'alt',
									name: 'alt'
								}),
							],
							validation: Rule => Rule.required(),
						}),
						defineField({
							type: 'string',
							title: 'Title',
							name: 'title',
							validation: Rule => Rule.required(),
						}),
						defineArrayMember({
							type: 'reference',
							title: 'Internal link',
							name: 'internalLink',
							to: PAGE_REFERENCES,
						}),
						defineField({
							type: 'simplerColor',
							title: 'Background colour',
							name: 'bgColor',
							description: 'Used on hover',
							options: {
								colorList: BASE_COLORS,
							},
							validation: Rule => Rule.required(),
						}),
					],
				}),
			],
		}),
		defineField({
			type: 'array',
			title: 'Testimonials',
			name: 'testimonials',
			of: [
				defineArrayMember({
					type: 'object',
					title: 'Testimonial',
					name: 'testimonialBlock',
					fields: [
						defineField({
							type: 'text',
							title: 'Quote',
							name: 'quote',
							rows: 2,
							description: 'Please include the quotation marks “ ”',
							validation: Rule => Rule.required()
						}),
						defineField({
							type: 'image',
							title: 'Image',
							name: 'image',
							options: {
								collapsible: true,
								collapsed: false
							},
							fields: [
								defineField({
									type: 'alt',
									name: 'alt'
								})
							],
							validation: Rule => Rule.required(),
						}),
					],
					preview: {
						select: {
							quote: 'quote',
						},
						prepare({ quote }) {
							return {
								title: quote,
								media: Quotes
							}
						}
					}
				}),
			],
		}),
		defineField({
			type: 'array',
			title: 'Featured Sales',
			name: 'featuredSales',
			of: [
				defineArrayMember({
					type: 'reference',
					to: [{ type: 'property' }],
					options: {
						filter: 'propertyGroup._ref == $propertyGroup',
						filterParams: {
							propertyGroup: 'propertiesForSalePage',
						},
					},
				}),
			],
		}),
		defineField({
			type: 'array',
			title: 'Featured Holidays',
			name: 'featuredHolidays',
			of: [
				defineArrayMember({
					type: 'reference',
					to: [{ type: 'property' }],
					options: {
						filter: 'propertyGroup._ref == $propertyGroup',
						filterParams: {
							propertyGroup: 'propertiesForHolidayPage',
						},
					},
				}),
			]
		}),
		defineField({
			type: 'array',
			title: 'Featured Lets',
			name: 'featuredLets',
			of: [
				defineArrayMember({
					type: 'reference',
					to: [{ type: 'property' }],
					options: {
						filter: 'propertyGroup._ref == $propertyGroup',
						filterParams: {
							propertyGroup: 'propertiesForRentPage',
						},
					},
				}),
			]
		}),
		defineField({
			type: 'array',
			title: 'Featured Journal articles',
			name: 'featuredJournal',
			of: [
				defineArrayMember({
					type: 'reference',
					to: [{ type: 'journalArticle' }]
				}),
			],
			validation: Rule => Rule.max(3),
		}),
		defineField({
			title: 'SEO',
			name: 'seo',
			type: 'seo'
		}),
	],
	preview: {
		prepare() {
			return {
				title: 'Home'
			}
		}
	}
})  