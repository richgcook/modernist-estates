export default defineNuxtConfig({

	app: {
		head: {
			title: process.env.SITE_TITLE,
			meta: [
				{ charset: 'utf-8' },
				{ name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
				{ hid: 'robots', name: 'robots', content: 'index, follow' }
			],
			link: [
				{ rel: 'icon', type: 'image/x-icon', href: 'favicon.png' },
			]
		},
	},

	runtimeConfig: {
		public: {
			siteTitle: process.env.SITE_TITLE
		}
	},

	css: [
		'~/assets/css/reset.css',
		'~/assets/css/global.scss'
	],

	vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: `@use "@/assets/scss/_mixins.scss" as *;`
                }
            }
        }
    },

	experimental: { inlineSSRStyles: false },

	modules: [
		'@nuxtjs/sanity', 
		'@pinia/nuxt'
	],

	build: {
		transpile: ['gsap', 'pinia']
	},

	devtools: { enabled: false },
	
	sanity: {
		'projectId': process.env.SANITY_PROJECT_ID,
    	'dataset': process.env.SANITY_PROJECT_DATASET,
		'apiVersion': process.env.SANITY_API_VERSION,
		'useCdn': false
	},

	compatibilityDate: '2024-10-01',

})
