export const useDuotoneFilters = (duotoneSvgEl) => {

	const getFilterElements = () => {

		const duotoneSvgFilterGrayscaleEl = duotoneSvgEl.querySelector('filter feColorMatrix')
		const duotoneSvgFilterColorEl = duotoneSvgEl.querySelector('filter feComponentTransfer')
		const duotoneSvgFilterColorRed = duotoneSvgFilterColorEl.querySelector('feFuncR')
		const duotoneSvgFilterColorGreen = duotoneSvgFilterColorEl.querySelector('feFuncG')
		const duotoneSvgFilterColorBlue = duotoneSvgFilterColorEl.querySelector('feFuncB')

		return {
			duotoneSvgFilterGrayscaleEl,
			duotoneSvgFilterColorRed,
			duotoneSvgFilterColorGreen,
			duotoneSvgFilterColorBlue
		}
	
	}

	return {
		getFilterElements
	}

}