export const useMetaBodyHelpers = (data) => {

	const config = useRuntimeConfig()

	const title = computed(() => {
		if (data.seo && data.seo.metaTitle) return data.seo.metaTitle
		if (!data.slug) return config.public.siteTitle
		return data.title
	})

	const description = computed(() => {
		if (data.seo && data.seo.metaDescription) return data.seo.metaDescription
		return null
	})

	const image = computed(() => {
		if (data.seo && data.seo.shareImage) return data.seo.shareImage
		return null
	})

	function toKebabCase(str) {
		return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()
	}

	const bodyClass = computed(() => {
		if (!data.slug) return 'index'
		if (data._type) return toKebabCase(data._type)
		return data.slug.current
	})

	return { title, description, image, bodyClass }

}