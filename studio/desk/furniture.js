import { File, Desk } from '@phosphor-icons/react'
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'

export const furnitureStructure = (S, context) =>
S.listItem()
	.title('Furniture')
	.icon(Desk)
	.child(
		S.list()
			.title('Furniture')
			.items([
				S.listItem()
				.title('Overview')
				.icon(File)
				.child(
					S.document()
					.id('furniturePage')
					.schemaType('furniturePage')
					.documentId('furniturePage')
				),
				S.divider(),
				orderableDocumentListDeskItem({
					type: 'furniture', 
					title: 'Furniture',
					icon: Desk,
					S, context
				}),
			])
		)