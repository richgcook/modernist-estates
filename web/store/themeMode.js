import { defineStore } from 'pinia'

export const useThemeModeStore = defineStore({
	id: 'theme-mode-store',
	state: () => {
		return {
			themeMode: 'light'
		}
	},
	actions: {
		setMode(mode) {
			this.themeMode = mode
		},
		resetMode() {
			this.themeMode = 'light'
		}
	},
	getters: {
		getMode: state => state.themeMode
	}
})