import { House, Files } from '@phosphor-icons/react'

import { projectsStructure } from './projects'
import { settingsStructure } from './settingsGeneral'

const hiddenDocTypes = listItem => 
	![
		'homePage',
		'settingsGeneral',
		'projectsPage',
		'project',
		'projectCategory',
		'pageA',
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

		S.documentTypeListItem('pageA').title('Pages').icon(Files),

		settingsStructure(S, context),

		// Filter out docs already defined above
		...S.documentTypeListItems().filter(hiddenDocTypes),
		
	])