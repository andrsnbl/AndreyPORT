// ─────────────────────────────────────────────────────────
//  emailConfig.js
//  Load EmailJS config dari environment variables (SECURE)
// ─────────────────────────────────────────────────────────

export const getEmailJSConfig = () => {
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID

  if (!publicKey || !serviceId || !templateId) {
    console.warn(
      '[EmailJS] Configuration incomplete. Please set VITE_EMAILJS_PUBLIC_KEY, ' +
      'VITE_EMAILJS_SERVICE_ID, and VITE_EMAILJS_TEMPLATE_ID in .env'
    )
    return null
  }

  return {
    publicKey,
    serviceId,
    templateId,
  }
}
