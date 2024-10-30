import { defineStore } from 'pinia'

export const useNavStore = defineStore({
	id: 'nav-store',
	state: () => {
		return {
			open: false
		}
	},
	actions: {
		toggleOpen() {
			this.open = !this.open
		},
		setOpen() {
			this.open = true
		},
		setClose() {
			this.open = false
		}
	},
	getters: {
		isOpen: state => state.open
	}
})