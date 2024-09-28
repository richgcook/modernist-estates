import { defineType, defineField, defineArrayMember } from 'sanity'

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
			title: 'Testimonials',
			name: 'testimonials',
			of: [
				defineArrayMember({
					type: 'object',
					title: 'Testimonial',
					name: 'testimonialBlock',
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