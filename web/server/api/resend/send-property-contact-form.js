import { createClient } from '@sanity/client'

const RESEND_API_KEY = process.env.RESEND_API_KEY

const client = createClient({
	projectId: process.env.SANITY_PROJECT_ID,
	dataset: process.env.SANITY_PROJECT_DATASET,
	apiVersion: process.env.SANITY_API_VERSION,
	useCdn: false
})

const fromEmailAddress = 'mail@modernistestates.com'

const formatKey = (key) => {
	const words = key.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1))
	return words.join(' ')
}

export default defineEventHandler(async (event) => {

	const body = await readBody(event)

	try {

		const requestBody = JSON.parse(body)

		const { 
			'property-id': propertyId,
			'property-title': propertyTitle,
			'property-ref': propertyRef,
			email
		} = requestBody

		const property = await client.fetch(
			`*[_type == "property" && _id == $propertyId]{
				contact {
					enquireEmail
			  	}
			}[0]`, { propertyId }
		)

		if (!property) throw new Error(`Property (${propertyId}) not found`)

		const { enquireEmail } = property.contact || {}
    	if (!enquireEmail) throw new Error(`Property (${propertyId}) does not have an enquiry email`)

		const keys = Object.keys(requestBody)
		const excludedFields = ['fatty-acid', 'consent', 'property-id',  'property-title', 'property-ref']

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
				from: `Modernist Estates <${fromEmailAddress}>`,
				//from: 'Acme <onboarding@resend.dev>',
				reply_to: email ? email : '',
				to: enquireEmail, // Recipient email from Sanity
				//to: `delivered@resend.dev`,
				bcc: fromEmailAddress,
				subject: `Enquiry about ${propertyTitle} (ref: ${propertyRef}) via modernistestates.com`,
				html: emailHtml
			}),
		})

		if (res.ok) {
			return {
				statusCode: 200,
				body: JSON.stringify({ message: "OK" }),
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