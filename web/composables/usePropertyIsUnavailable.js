export const usePropertyIsUnavailable = (status) => {
	return status.title == 'Sold' || status.title == 'Let Agreed' || status.title == 'Sold (STC)'
}