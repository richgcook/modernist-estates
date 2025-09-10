import { HouseSimple, House, File, Buildings, CurrencyGbp, NavigationArrow, Resize, CheckSquare, SlidersHorizontal } from '@phosphor-icons/react'
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
				.title('Overview')
				.icon(File)
				.child(
					S.document()
					.title('Overview')
					.id('homesPage')
					.documentId('homesPage')
					.schemaType('homesPage')
				),

				S.divider(),

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
				.title('Holiday')
				.icon(House)
				.child(
					S.document()
					.title('Holiday')
					.id('propertiesForHolidayPage')
					.documentId('propertiesForHolidayPage')
					.schemaType('propertiesForHolidayPage')
				),

				S.listItem()
				.title('Location Hire')
				.icon(House)
				.child(
					S.document()
					.title('Location Hire')
					.id('propertiesForLocationHirePage')
					.documentId('propertiesForLocationHirePage')
					.schemaType('propertiesForLocationHirePage')
				),

				S.divider(),
				
				orderableDocumentListDeskItem({
					type: 'property', 
					title: 'All properties',
					icon: Buildings,
					S, context
				}),

				S.divider(),

				S.listItem()
				.title('Filters')
				.icon(SlidersHorizontal)
				.child(
					S.list()
					.title('Filters')
					.items([
						S.documentTypeListItem('propertyFilterLocation').title('Locations').icon(NavigationArrow),
						S.documentTypeListItem('propertyFilterPrice').title('Price ranges').icon(CurrencyGbp),
						S.documentTypeListItem('propertyFilterBedrooms').title('Bedrooms').icon(Resize),
						S.documentTypeListItem('propertyFilterStatus').title('Statuses').icon(CheckSquare),
					]),
				),


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