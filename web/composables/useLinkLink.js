export const useLinkLink = (link) => {
	if (!link) return null
	if (link.file) { // File link
		return link.file
	} else if (link.page) { // Internal link
		return useInternalLinkUrl(link.page)
	}
	return link.url // External link
}