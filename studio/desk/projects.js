import { File, Stack, Archive } from '@phosphor-icons/react'
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'

export const projectsStructure = (S, context) =>
S.listItem()
	.title('Projects')
	.icon(Stack)
	.child(
		S.list()
			.title('Projects')
			.items([
				S.listItem()
				.title('Overview')
				.icon(File)
				.child(
					S.document()
					.id('projectsPage')
					.schemaType('projectsPage')
					.documentId('projectsPage')
				),
				S.divider(),
				S.documentTypeListItem('project').title('All projects').icon(Stack),
				S.divider(),
				S.listItem()
				.title('Archive')
				.icon(Archive)
				.child(
					S.document()
					.id('projectsArchivePage')
					.schemaType('projectsArchivePage')
					.documentId('projectsArchivePage')
				),
			])
		)