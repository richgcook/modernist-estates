import { Play, YoutubeLogo } from '@phosphor-icons/react'
import { defineType, defineField, defineArrayMember } from 'sanity'

export default defineType({
	type: 'array',
	name: 'pageBuilderB',
	title: 'Page builder',
	of: [
		defineArrayMember({
			type: 'object',
			title: 'Media + Text',
			name: 'mediaTextBlock',
			fields: [
				defineField({
					type: 'array',
					title: 'Media',
					name: 'media',
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
									title: 'Caption',
									name: 'caption'
								}),
							],
							preview: {
								select: {
									caption: 'caption',
									image: 'image'
								},
								prepare(selection) {
									const { caption, image } = selection
									return {
										title: 'Image',
										subtitle: caption ? caption[0].children[0].text.substring(0, 50) + '...' : '',
										media: image
									}
								},
							},
						}),
						defineArrayMember({
							type: 'object',
							title: 'Video',
							name: 'videoBlock',
							fields: [
								defineField({
									type: 'file',
									title: 'Video',
									name: 'video',
									options: {
										accept: 'video/*'
									},
									validation: Rule => Rule.required()
								}),
								defineField({
									type: 'richText',
									title: 'Caption',
									name: 'caption'
								}),
							],
							preview: {
								select: {
									caption: 'caption',
								},
								prepare(selection) {
									const { caption } = selection
									return {
										title: 'Video',
										subtitle: caption ? caption[0].children[0].text.substring(0, 50) + '...' : '',
										media: Play
									}
								},
							},
						}),
						defineArrayMember({
							type: 'object',
							title: 'Embed',
							name: 'embedBlock',
							fields: [
								defineField({
									type: 'image',
									title: 'Cover/thumbnail image',
									name: 'coverImage',
									fields: [
										defineField({
											name: 'alt',
											type: 'alt'
										}),
									],
									validation: Rule => Rule.required()
								}),
								defineField({
									type: 'text',
									title: 'Embed code',
									name: 'embedCode',
									rows: 6,
									validation: Rule => Rule.required()
								}),
								defineField({
									type: 'richText',
									title: 'Caption',
									name: 'caption'
								}),
							],
							preview: {
								select: {
									caption: 'caption',
								},
								prepare(selection) {
									const { caption } = selection
									return {
										title: 'Embed',
										subtitle: caption ? caption[0].children[0].text.substring(0, 50) + '...' : '',
										media: YoutubeLogo
									}
								},
							},
						}),
					],
					validation: Rule => Rule.required()
				}),
				defineField({
					type: 'richText',
					title: 'Text',
					name: 'text'
				}),
				defineField({
					type: 'object',
					title: 'Settings',
					name: 'settings',
					fields: [
						defineField({
							type: 'string',
							title: 'Media position',
							name: 'mediaPosition',
							options: {
								list: [
									{ title: 'Left', value: 'left' },
									{ title: 'Right', value: 'right' },
								],
							},
							initialValue: 'left',
							validation: Rule => Rule.required()
						}),
						defineField({
							type: 'string',
							title: 'Media layout',
							name: 'mediaLayout',
							options: {
								list: [
									{ title: 'Grid', value: 'grid' },
									{ title: 'Stacked', value: 'stacked' },
									{ title: 'Slideshow', value: 'slideshow' },
								],
							},
							initialValue: 'grid',
							validation: Rule => Rule.required()
						}),
						defineField({
							type: 'string',
							title: 'Number of text columns',
							name: 'textColumnCount',
							options: {
								list: [
									{ title: '1', value: '1' },
									{ title: '2', value: '2' },
								],
							},
							initialValue: '1',
							validation: Rule => Rule.required()
						}),
						defineField({
							type: 'boolean',
							title: 'Add ghost column',
							name: 'ghostColumn',
							hidden: ({document}) => document?.settings?.textColumnCount === '1',
						}),
					],
				}),
				defineField({
					type: 'array',
					title: 'Related projects',
					name: 'relatedProjects',
					hidden: ({document}) => document?._type !== 'project',
					of: [
						defineArrayMember({
							type: 'reference',
							to: [{ type: 'project' }]
						}),
					],
				}),
			],
			preview: {
				select: {
					media: 'media.0.image',
					text: 'text',
					mediaLayout: 'settings.mediaLayout',
				},
				prepare(selection) {
					const { media, text, mediaLayout } = selection
					return {
						title: text ? text[0].children[0].text.substring(0, 50) + '...' : '',
						subtitle: `Media (${mediaLayout}) + Text`,
						media: media ? media : Play
					}
				},
			},
		}),

		defineArrayMember({
			type: 'object',
			title: 'Text-only',
			name: 'textBlock',
			fields: [
				defineField({
					type: 'object',
					title: 'Heading',
					name: 'heading',
					description: 'Optional. You can also use headings within the text field below.',
					fields: [
						defineField({
							type: 'string',
							title: 'Text',
							name: 'text',
						}),
						defineField({
							type: 'boolean',
							title: 'Centered',
							name: 'alignCenter',
						}),
					],
				}),
				defineField({
					type: 'richText',
					title: 'Text',
					name: 'text',
					validation: Rule => Rule.required()
				}),
				defineField({
					type: 'string',
					title: 'Number of text columns',
					name: 'textColumnCount',
					options: {
						list: [
							{ title: '1', value: '1' },
							{ title: '2', value: '2' },
						],
					},
					initialValue: '1',
					validation: Rule => Rule.required()
				}),
			],
			preview: {
				select: {
					heading: 'heading.text',
					text: 'text'
				},
				prepare(selection) {
					const { heading, text } = selection
					return {
						title: heading ? heading : text ? text[0].children[0].text.substring(0, 50) + '...' : '',
						subtitle: heading ? text ? text[0].children[0].text.substring(0, 50) + '...' : '' : 'Text-only',
					}
				},
			},
		}),

		/*
		defineArrayMember({
			type: 'object',
			title: 'Video',
			name: 'videoBlock',
			fields: [
				defineField({
					type: 'file',
					title: 'Video',
					name: 'video',
					options: {
						accept: 'video/*'
					},
					validation: Rule => Rule.required()
				}),
				defineField({
					type: 'richText',
					title: 'Caption',
					name: 'caption'
				}),
			],
			preview: {
				select: {
					caption: 'caption',
					image: 'image'
				},
				prepare(selection) {
					const { caption, image } = selection
					return {
						title: 'Video',
						subtitle: caption ? caption[0].children[0].text.substring(0, 50) + '...' : '',
						media: image
					}
				},
			},
		}),
		*/
	]
})