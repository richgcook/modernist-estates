export const useExtractColorValueAsFraction = (rgbString, color) => {
	const regex = /rgb\((\d+),\s*(\d+),\s*(\d+)\)/
    const matches = rgbString.match(regex)

	if (!matches) return null

	const [_, r, g, b] = matches

	let value;
    	switch(color.toLowerCase()) {
        case 'r':
        	value = r;
          	break;
        case 'g':
        	value = g;
        	break;
        case 'b':
        	value = b;
        	break;
        default:
        	return null;
      }

	return value / 255
}