const RESEND_API_KEY = process.env.RESEND_API_KEY
const primaryEmailAddress = 'mail@modernistestates.com'
const toEmailAddresses = [primaryEmailAddress]

const formatKey = (key) => {
	const words = key.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1))
	return words.join(' ')
}

export default defineEventHandler(async (event) => {

	const body = await readBody(event)

	try {

		const requestBody = JSON.parse(body)

		const { 
			'form-title': formTitle,
			email
		} = requestBody

		const keys = Object.keys(requestBody)
		const excludedFields = ['fatty-acids', 'form-name', 'form-title']

		let emailHtml = ''

		keys.forEach((key, index) => {
			if (excludedFields.includes(key)) return
			const value = requestBody[key]
			if (value.trim() === '') return
			const formattedKey = formatKey(key)
			emailHtml += `<strong>${formattedKey}:</strong> ${value}`
			if (index !== keys.length - 1) emailHtml += '<br>'
		})

		const res = await fetch('https://api.resend.com/emails', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${RESEND_API_KEY}`,
			},
			body: JSON.stringify({
				from: `Modernist Estates <${primaryEmailAddress}>`,
				//from: 'Acme <onboarding@resend.dev>',
				reply_to: email ? email : '',
				to: toEmailAddresses,
				//to: `delivered@resend.dev`,
				subject: `New submission from website form: ${formTitle}`,
				html: emailHtml
			}),
		})

		if (res.status === 200) {
			return {
				statusCode: res.status,
				body: JSON.stringify({ message: res.statusText }),
			}
		} else {
			throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`)
		}

	} catch (error) {
		return {
			statusCode: 500,
			body: JSON.stringify({ error: error.message }),
		}
	}

})