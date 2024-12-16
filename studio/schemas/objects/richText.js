import { Cards, FileArrowDown } from '@phosphor-icons/react'
import { Header1, Header2, Header3, Header4, Normal } from '../../components/blockRenders'
import { PAGE_REFERENCES } from '../../constants'

export default {
	type: 'array',
	title: 'Text',
	name: 'richText',
	of: [
		{ 
			type: 'block',
			styles: [
				{ 
					title: 'Normal', 
					value: 'normal', 
					//component: Normal 
				},
				{ title: 'H3', value: 'h3' },
				{ title: 'H4', value: 'h4' }
			],
			lists: [
				{ title: 'Bullet', value: 'bullet' }
			],
			marks: {
				decorators: [
					{ title: 'Strong', value: 'strong' },
					{ title: 'Emphasis', value: 'em' }
				],
				annotations: [
					{
						name: 'link',
						type: 'object',
						title: 'External link',
						fields: [
							{
								name: 'href',
								type: 'url',
								title: 'URL',
								validation: Rule => Rule.uri({
									scheme: ['https', 'http', 'mailto', 'tel']
								})
							},
							{
								title: 'Open in new tab',
								name: 'blank',
								type: 'boolean'
							},
							{
								type: 'boolean',
								name: 'symbolArrow',
								title: 'Add arrow symbol',
							},
						],
					},
					{
						name: 'internalLink',
						type: 'object',
						title: 'Internal link',
						icon: Cards,
						fields: [
							{
								name: 'reference',
								type: 'reference',
								title: 'Reference',
								to: PAGE_REFERENCES,
							},
							{
								type: 'boolean',
								name: 'symbolArrow',
								title: 'Add arrow symbol',
							},
						],
					},
					{
						name: 'fileUploadLink',
						type: 'object',
						title: 'File upload',
						icon: FileArrowDown,
						fields: [
							{
								type: 'file',
								title: 'File upload',
								name: 'file'
							},
							{
								type: 'boolean',
								name: 'symbolArrow',
								title: 'Add arrow symbol',
							},
						],
					}
				]
			}
		}
	]
}