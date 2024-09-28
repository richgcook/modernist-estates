import { defineType } from 'sanity'

export default defineType({
	type: 'string',
	title: 'Theme mode',
	name: 'themeMode',
	options: {
		list: [
			{ title: 'White', value: 'dark' },
			{ title: 'Black', value: 'light' },
		]
	},
	initialValue: 'light',
	description: 'Black text/assets or white text/assets'
})