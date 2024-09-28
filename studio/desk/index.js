import { House, Info } from '@phosphor-icons/react'

import { projectsStructure } from './projects'
import { furnitureStructure } from './furniture'
import { pressStructure } from './press'
import { settingsStructure } from './settingsGeneral'

const hiddenDocTypes = listItem => 
	![
		'homePage',
		'settingsGeneral',
		'projectsPage',
		'project',
		'projectsArchivePage',
		'furniturePage',
		'furniture',
		'pressPage',
		'press',
		'aboutPage',
	]
.includes(listItem.getId())

export const deskStructure = (S, context) =>

  	S.list()
	.title('Content')
	.items([

		S.listItem()
		.title('Home')
		.icon(House)
		.child(
			S.document()
			.id('homePage')
			.schemaType('homePage')
			.documentId('homePage')
		),

		projectsStructure(S, context),

		furnitureStructure(S, context),

		pressStructure(S, context),

		S.listItem()
		.title('Studio')
		.icon(Info)
		.child(
			S.document()
			.id('aboutPage')
			.schemaType('aboutPage')
			.documentId('aboutPage')
		),

		settingsStructure(S, context),

		// Filter out docs already defined above
		...S.documentTypeListItems().filter(hiddenDocTypes),
		
	])