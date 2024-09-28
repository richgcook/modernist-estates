import { File, NewspaperClipping } from '@phosphor-icons/react'
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'

export const pressStructure = (S, context) =>
S.listItem()
	.title('Press')
	.icon(NewspaperClipping)
	.child(
		S.list()
			.title('Press')
			.items([
				S.listItem()
				.title('Overview')
				.icon(File)
				.child(
					S.document()
					.id('pressPage')
					.schemaType('pressPage')
					.documentId('pressPage')
				),
				S.divider(),
				orderableDocumentListDeskItem({
					type: 'press', 
					title: 'All press',
					icon: NewspaperClipping,
					S, context
				}),
			])
		)