import { asSitemapUrl } from '#imports'

export default defineEventHandler(async () => {

	const sanity = useSanity()

	const properties = await sanity.fetch(groq`*[_type == "property" && hideFromListings != true] | order(orderRank) { _updatedAt, slug }`)

	return [
		...properties.map((p) => asSitemapUrl({ loc: `/homes/${p.slug.current}` })),
		//...properties.map((p) => asSitemapUrl({ loc: `/homes/${p.slug.current}`, lastmod: p._updatedAt })),
		//...pages.map((p) => asSitemapUrl({ url: `/${p.slug.current}` })),
	]
})