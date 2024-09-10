import { File, Stack, StackSimple } from '@phosphor-icons/react'
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
				orderableDocumentListDeskItem({
					type: 'project', 
					title: 'Order',
					S, context
				}),
				S.divider(),
				S.listItem()
				.title('Categories')
				.icon(StackSimple)
				.child(
					S.list()
					.title('Categories')
					.items([
						S.documentTypeListItem('projectCategory').title('All categories').icon(StackSimple),
						S.listItem()
						.title('Projects by category')
						.icon(Stack)
						.child(
						S.documentList()
							.title('Categories')
							.filter('_type == "projectCategory"')
							.child(categoryId =>
								S.documentList()
								.title('Projects')
								.filter('_type == "project" && $categoryId in categories[]._ref')
								.params({ categoryId })
							),
						),
					])
				),
			])
		)