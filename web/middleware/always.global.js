import { useCursorStore } from '~/store/cursor'
import { useThemeModeStore } from '~/store/themeMode'
import { useProjectsStore } from '~/store/projects'

export default defineNuxtRouteMiddleware((to, from) => {

	const cursorStore = useCursorStore()
	cursorStore.reset()

	const themeModeStore = useThemeModeStore()
	themeModeStore.resetMode()

	const projectsStore = useProjectsStore()
	projectsStore.reset()

})