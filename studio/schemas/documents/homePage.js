import { defineType, defineField, defineArrayMember } from 'sanity'
import { Quotes } from '@phosphor-icons/react'
import { PAGE_REFERENCES } from '../../constants'

export default defineType({
	type: "document",
	title: "Home",
	name: "homePage",
	fields: [
		defineField({
			type: 'array',
			title: 'Landing media',
			name: 'landingMedia',
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
								title: `“${quote}”`,
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
			name: 'featuresSales',
			of: [
				defineArrayMember({
					type: 'reference',
					to: [{ type: 'property' }]
				}),
			]
		}),
		defineField({
			type: 'array',
			title: 'Featured Holidays',
			name: 'featuresHolidays',
			of: [
				defineArrayMember({
					type: 'reference',
					to: [{ type: 'property' }]
				}),
			]
		}),
		defineField({
			type: 'array',
			title: 'Featured Lets',
			name: 'featuresLets',
			of: [
				defineArrayMember({
					type: 'reference',
					to: [{ type: 'property' }]
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
			]
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