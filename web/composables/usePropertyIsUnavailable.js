export const usePropertyIsUnavailable = (status) => {
	console.log(status)
	return status.title == 'Sold' || status.title == 'Let Agreed' || status.title == 'Sold (STC)'
}