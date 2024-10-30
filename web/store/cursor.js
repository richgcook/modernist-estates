import { defineStore } from 'pinia'

export const useCursorStore = defineStore({
	id: 'cursor-store',
	state: () => {
		return {
			direction: null,
			active: false,
			state: '',
			text: '',
			textStyle: '',
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
			this.state = ''
			this.text = ''
			this.textStyle = ''
		},
		setXY(x, y) {
			this.x = x
			this.y = y
		},
		setText(text) {
			this.text = text
		},
		setTextStyle(textStyle) {
			this.textStyle = textStyle
		},
		reset() {
			this.direction = null
			this.active = false
			this.state = ''
			this.text = ''
			this.textStyle = ''
		}
	},
	getters: {
		getDirection: state => state.direction,
		getActive: state => state.active,
		getState: state => state.state,
		getX: state => state.x,
		getY: state => state.y,
		getText: state => state.text,
		getTextStyle: state => state.textStyle,
	}
})