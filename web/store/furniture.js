import { defineStore } from 'pinia'

export const useFurnitureStore = defineStore({
	id: 'furniture-store',
	state: () => {
		return {
			activeFurniture: null,
			activeFurnitureParity: null,
			detailsPanelIsOpen: false,
		}
	},
	actions: {
		setActiveFurniture(furniture, rowIndex) {
			if (rowIndex % 2 === 0) {
				this.activeFurnitureParity = 'even'
			} else {
				this.activeFurnitureParity = 'odd'
			}
			this.activeFurniture = furniture
			this.detailsPanelIsOpen = true
		},
		resetActiveFurniture() {
			this.activeFurniture = null
		},
		resetActiveFurnitureParity() {
			this.activeFurnitureParity = null
		},
		closeDetailsPanel() {
			this.detailsPanelIsOpen = false
		},
	},
	getters: {
		getActiveFurniture: state => state.activeFurniture,
		getActiveFurnitureParity: state => state.activeFurnitureParity,
		isDetailsPanelOpen: state => state.detailsPanelIsOpen,
	}
})