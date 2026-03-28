// ─────────────────────────────────────────────────────────
// netlify/functions/send-email.js
// Serverless function untuk send email via EmailJS
// SECURE: Private keys tidak terekspos ke client
// ─────────────────────────────────────────────────────────

export const handler = async (event) => {
  // Hanya accept POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    }
  }

  try {
    // Parse request body
    const { name, email, message } = JSON.parse(event.body)

    // Validasi input
    if (!name || !email || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' }),
      }
    }

    // Validasi email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid email format' }),
      }
    }

    // Rate limiting: check if sender already submitted in last 5 minutes
    // You can implement this with a database or cache service

    // Send email via EmailJS (API key secure di server)
    const emailjsUrl = 'https://api.emailjs.com/api/v1.0/email/send'
    const serviceId = process.env.EMAILJS_SERVICE_ID
    const templateId = process.env.EMAILJS_TEMPLATE_ID
    const publicKey = process.env.EMAILJS_PUBLIC_KEY

    if (!serviceId || !templateId || !publicKey) {
      console.error('[EmailJS] Missing environment variables')
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Email service misconfigured' }),
      }
    }

    const response = await fetch(emailjsUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        template_params: {
          name,
          email,
          comments: message,
        },
      }),
    })

    if (!response.ok) {
      console.error('[EmailJS] Send failed:', response.statusText)
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to send email' }),
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: 'Email sent successfully' }),
    }
  } catch (error) {
    console.error('[EmailJS] Error:', error.message)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' }),
    }
  }
}
