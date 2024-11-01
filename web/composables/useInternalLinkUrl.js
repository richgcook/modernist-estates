export const useInternalLinkUrl = (page) => {
	const { _type, slug } = page
	if (_type === 'journalArticle') return `/journal/${slug.current}`
	if (_type === 'projectsPage') return '/projects'
	return `/${slug.current}`
}