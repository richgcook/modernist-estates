import { House, Info, Files, File, Article } from '@phosphor-icons/react'
import { DocumentsIcon, DocumentIcon } from '@sanity/icons'

import { homesStructure } from './homes'
import { settingsStructure } from './settingsGeneral'

const hiddenDocTypes = listItem => 
	![
		'homePage',
		'settingsGeneral',
		'aboutPage',
		'homesPage',
		'propertiesForSalePage',
		'propertiesForRentPage',
		'propertiesForHolidayPage',
		'property',
		'lettingPage',
		'sellingPage',
		'journalPage',
		'journalArticle',
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

		S.listItem()
		.title('About')
		.icon(Info)
		.child(
			S.document()
			.id('aboutPage')
			.schemaType('aboutPage')
			.documentId('aboutPage')
		),

		homesStructure(S, context),

		S.listItem()
		.title('Journal')
		.icon(Article)
		.child(
			S.list()
			.title('Journal')
			.items([
				S.listItem()
				.title('Overview')
				.icon(File)
				.child(
					S.document()
					.id('journalPage')
					.schemaType('journalPage')
					.documentId('journalPage')
				),
				S.divider(),
				S.documentTypeListItem('journalArticle').title('Articles').icon(Article),
			])
		),

		// Selling
		S.listItem()
		.title('Selling')
		.icon(DocumentsIcon)
		.child(
			S.list()
			.title('Selling')
			.items([
				S.listItem()
				.title('Overview')
				.icon(DocumentIcon)
				.child(
					S.document()
					.id('sellingPage')
					.schemaType('sellingPage')
					.documentId('sellingPage')
				),
			])
		),

		// Letting
		S.listItem()
		.title('Letting')
		.icon(DocumentsIcon)
		.child(
			S.list()
			.title('Letting')
			.items([
				S.listItem()
				.title('Overview')
				.icon(DocumentIcon)
				.child(
					S.document()
					.id('lettingPage')
					.schemaType('lettingPage')
					.documentId('lettingPage')
				),
			])
		),

		S.documentTypeListItem('pageA').title('Pages').icon(Files),

		settingsStructure(S, context),

		// Filter out docs already defined above
		...S.documentTypeListItems().filter(hiddenDocTypes),
		
	])