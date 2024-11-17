export const useInternalLinkUrl = (page) => {
	const { _type, slug } = page
	if (_type === 'property') return `/homes/${slug.current}`
	if (_type === 'propertiesForSalePage') return `/homes/${slug.current}`
	if (_type === 'propertiesForHolidayPage') return `/homes/${slug.current}`
	if (_type === 'propertiesForRentPage') return `/homes/${slug.current}`
	if (_type === 'journalArticle') return `/journal/${slug.current}`
	return `/${slug.current}`
}