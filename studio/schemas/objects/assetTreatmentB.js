import { defineType, defineField } from 'sanity'
import { BRIGHT_COLORS, EARTHY_COLORS } from '../../constants'

export default defineType({
	type: 'object',
	title: 'Treatment',
	name: 'assetTreatmentB',
	fields: [
		defineField({
			type: 'string',
			title: 'Type',
			name: 'type',
			options: {
				list: [
					{ title: 'Duotone', value: 'duotone' },
					{ title: 'Overlay', value: 'overlay' }
				],
			},
			initialValue: 'duotone',
			description: 'Please note that the duotone asset treatment cannot be applied to videos',
			validation: Rule => Rule.required(),
		}),
		// Title should read 'Logo colour' for overlay and 'Colour' for duotone
		defineField({
			type: 'simplerColor',
			title: 'Bright colour',
			name: 'brightColor',
			description: 'This will be used as the duotone colour (type = duotone) or the logo colour (type = overlay)',
			options: {
				colorList: BRIGHT_COLORS,
				colorFormat: 'rgb',
			},
		}),
		// Title should read 'Overlay colour' for overlay and 'Logo colour' for duotone
		defineField({
			type: 'simplerColor',
			title: 'Earthy colour',
			name: 'earthyColor',
			description: 'This will be used as the logo colour (type = duotone) or the overlay colour (type = overlay)',
			options: {
				colorList: EARTHY_COLORS,
				colorFormat: 'rgb',
			},
			hidden: ({ parent, value }) => {
				return parent?.type !== 'overlay'
			}
		}),
	],
})