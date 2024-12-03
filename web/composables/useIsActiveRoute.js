export const useIsRouteActive = (linkName) => {
	const route = useRoute()
	return route.name && route.name.includes(linkName)
}