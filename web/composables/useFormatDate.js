import dayjs from 'dayjs'

export const useFormatDate = (dateString, formatString) => {
	let date = dayjs(dateString)
	return date.format(formatString)
}