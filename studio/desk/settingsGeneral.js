import { Gear } from '@phosphor-icons/react'

export const settingsStructure = (S, context) =>
S.listItem()
	.title('Settings')
	.icon(Gear)
		.child(
			S.list()
				.title('Settings')
				.items([
					S.listItem()
						.title('General')
						.icon(Gear)
						.child(
							S.editor()
								.id('settingsGeneral')
								.schemaType('settingsGeneral')
								.documentId('settingsGeneral')
								.title('General')
						)
				])
		)