import { defineConfig, isDev } from 'sanity'
import { structureTool}  from 'sanity/structure'
import { visionTool} from '@sanity/vision'
import { schemaTypes } from './schemas'
import { deskStructure } from './desk'
import { netlifyTool } from 'sanity-plugin-netlify'
import { simplerColorInput } from 'sanity-plugin-simpler-color-input'
import { googleMapsInput } from '@sanity/google-maps-input'

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
		googleMapsInput({
			apiKey: `AIzaSyCU8q_focgghGF1tMuJ2nz9HUaPKbGj-oQ`,
			defaultZoom: 15,
			defaultLocation: {
				lat: 51.519673111328046,
				lng: -0.09472659469203472
			},
		}),
		...(isDev ? devOnlyPlugins : []),
	],
  	schema: {
    	types: schemaTypes,
  	},
})