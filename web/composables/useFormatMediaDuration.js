export const useFormatMediaDuration = (duration) => {
	var minutes = Math.floor(duration / 60)
	var seconds = Math.floor(duration % 60)
	minutes = (minutes >= 10) ? minutes : "0" + minutes
	seconds = (seconds >= 10) ? seconds : "0" + seconds
	return `${minutes}:${seconds}` 
}