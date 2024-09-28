import { HouseSimple, House, File, Buildings } from '@phosphor-icons/react'
import { DocumentIcon, DocumentsIcon } from '@sanity/icons'
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'

export const homesStructure = (S, context) =>
S.listItem()
	.title('Homes')
	.icon(HouseSimple)
	.child(
		S.list()
			.title('Homes')
			.items([

				S.listItem()
				.title('For Sale')
				.icon(House)
				.child(
					S.document()
					.title('For Sale')
					.id('propertiesForSalePage')
					.documentId('propertiesForSalePage')
					.schemaType('propertiesForSalePage')
				),

				S.listItem()
				.title('Rent')
				.icon(House)
				.child(
					S.document()
					.title('Rent')
					.id('propertiesForRentPage')
					.documentId('propertiesForRentPage')
					.schemaType('propertiesForRentPage')
				),

				S.listItem()
				.title('For Holiday')
				.icon(House)
				.child(
					S.document()
					.title('For Holiday')
					.id('propertiesForHolidayPage')
					.documentId('propertiesForHolidayPage')
					.schemaType('propertiesForHolidayPage')
				),

				S.documentTypeListItem('property').title('All properties').icon(Buildings),

				/*
				S.divider(),
				orderableDocumentListDeskItem({
					type: 'project', 
					title: 'All properties',
					icon: Stack,
					S, context
				}),
				*/

			])
		)