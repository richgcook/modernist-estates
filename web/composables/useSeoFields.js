export const useSeoFields = (data) => [
	{ hid: 'og:title', name: 'og:title', content: data.title },
	{ hid: 'og:site_name', name: 'og:site_name', content: data.title },
	{ hid: 'twitter:title', name: 'twitter:title', content: data.title },
	{ hid: 'apple-mobile-web-app-title', name: 'apple-mobile-web-app-title', content: data.title },

	{ hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },

	{ hid: 'og:image', name: 'og:image', content: data.image },
	{ hid: 'twitter:image', name: 'twitter:image', content: data.image },

	{ hid: 'description', name: 'description', content: data.description },
	{ hid: 'og:description', name: 'og:description', content: data.description },
	{ hid: 'twitter:description', name: 'twitter:description', content: data.description }
]