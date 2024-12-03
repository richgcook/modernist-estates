export default defineEventHandler(async (event) => {

	const config = useRuntimeConfig()

	const body = await readBody(event)

	const email = body.email

	try {

		const response = await $fetch(`https://api.createsend.com/api/v3.3/subscribers/${config.private.campaignMonitorListId}.json`, {
			method: 'POST',
			headers: {
				'Authorization': `Basic ${Buffer.from(`${config.private.campaignMonitorApiKey}`).toString('base64')}`,
				'Content-Type': 'application/json',
			},
			body: {
				EmailAddress: email,
				Resubscribe: true,
				ConsentToTrack: 'Yes',
			},
		})

		return {
			statusCode: 200,
			body: 'Subscriber added to the Campaign Monitor list successfully',
		}

	} catch (error) {
		console.error(error)
		throw createError({
			statusCode: 500,
			statusMessage: 'Failed to subscribe user',
		})
	}

})