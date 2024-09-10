import { defineConfig, isDev } from 'sanity'
import { structureTool}  from 'sanity/structure'
import { visionTool} from '@sanity/vision'
import { schemaTypes } from './schemas'
import { deskStructure } from './desk'
import { netlifyTool } from 'sanity-plugin-netlify'
import { simplerColorInput } from 'sanity-plugin-simpler-color-input'

const devOnlyPlugins = [visionTool()]

export default defineConfig({
	name: 'default',
	title: 'Modernist Estates',
	projectId: '5o2jcnv9',
	dataset: 'production',
	document: {
		newDocumentOptions: (prev, { currentUser, creationContext }) => {
			const { type } = creationContext
			if (type === 'global') {
				const excludedTemplateIds = ['eventsPage', 'homePage', 'labsPage', 'newsPage', 'profilesPage', 'projectsPage', 'settingsGeneral']
				return prev.filter((template) => !excludedTemplateIds.includes(template.templateId))
			}
			return prev
		},
	},
	plugins: [
		structureTool({
			structure: deskStructure,
		}), 
		netlifyTool(),
		simplerColorInput(),
		...(isDev ? devOnlyPlugins : []),
	],
  	schema: {
    	types: schemaTypes,
  	},
})