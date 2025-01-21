export const useLinkLinkTarget = (type) => {
	if (!type) return null
	console.log(type)
	if (type == 'fileUpload' || type == 'externalLink') {
		return '_blank'
	}
	return null
}