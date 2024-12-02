import { clearBodyLocks } from 'tua-body-scroll-lock'

export default defineNuxtRouteMiddleware((to, from) => {

	clearBodyLocks()

})