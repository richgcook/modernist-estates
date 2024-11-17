export const useBlockType = (type) => {
	switch (type) {
		case 'textBlock': return 'text'
		case 'imageBlock': return 'image'
		case 'audioBlock': return 'audio'
		case 'videoBlock': return 'video'
		case 'embedBlock': return 'embed'
		case 'mediaTextBlock': return 'media-and-text'
		case 'accordionListBlock': return 'accordion-list'
		default: return
	}
}