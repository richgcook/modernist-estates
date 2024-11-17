import { defineStore } from 'pinia'

export const useCursorStore = defineStore({
	id: 'cursor-store',
	state: () => {
		return {
			direction: null,
			active: false,
			state: 'arrow',
			x: 0,
			y: 0
		}
	},
	actions: {
		setDirection(direction) {
			this.direction = direction
		},
		setState(state) {
			this.state = state
		},
		turnOn() {
			this.active = true
		},
		turnOff() {
			this.active = false
		},
		setXY(x, y) {
			this.x = x
			this.y = y
		}
	},
	getters: {
		getDirection: state => state.direction,
		getActive: state => state.active,
		getState: state => state.state,
		getX: state => state.x,
		getY: state => state.y
	}
})