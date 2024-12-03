import { defineStore } from 'pinia'

export const useNewsletterSubscribeStore = defineStore({
	id: 'newsletter-subscribe-store',
	state: () => {
		return {
			open: false,
			subscribing: false,
			success: false,
			error: false,
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
		},
		setSubscribing() {
			this.subscribing = true
		},
		setSuccess() {
			this.success = true
		},
		setError() {
			this.error = true
		},
		resetError() {
			this.error = false
		},
		resetSubscribing() {
			this.subscribing = false
			this.success = false
			this.error = false
		}
	},
	getters: {
		isOpen: state => state.open,
		isSubscribing: state => state.subscribing,
		isSuccess: state => state.success,
		isError: state => state.error,
	}
})