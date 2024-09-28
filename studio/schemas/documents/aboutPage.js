import { defineType, defineField, defineArrayMember } from 'sanity'

export default defineType({
	type: "document",
	title: "Studio",
	name: "aboutPage",
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
				defineField({
					type: 'alt',
					name: 'alt'
				})
			],
			validation: Rule => Rule.required()
		}),
		defineField({
			type: 'richText',
			title: 'About',
			name: 'aboutText',
			validation: Rule => Rule.required(),
		}),
		defineField({
			type: 'array',
			title: 'Team',
			name: 'team',
			of: [
				defineArrayMember({
					type: 'object',
					title: 'Member',
					name: 'member',
					fields: [
						defineField({
							type: 'string',
							title: 'Name',
							name: 'name',
							validation: Rule => Rule.required()
						}),
						defineField({
							type: 'string',
							title: 'Position/role',
							name: 'position',
							validation: Rule => Rule.required()
						}),
					],
					preview: {
						select: {
							name: 'name',
							position: 'position'
						},
						prepare(selection) {
							const { name, position } = selection
							return {
								title: name,
								subtitle: position,
							}
						},
					},
				}),
			]
		}),
		defineField({
			type: 'richText',
			title: 'Credits',
			name: 'credits',
		}),
		defineField({
			title: 'SEO',
			name: 'seo',
			type: 'seo'
		}),
	],
})  