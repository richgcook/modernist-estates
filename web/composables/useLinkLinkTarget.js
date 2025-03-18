export const useLinkLinkTarget = (type) => {
	if (!type) return null
	if (type == 'fileUpload' || type == 'externalLink') {
		return '_blank'
	}
	return null
}