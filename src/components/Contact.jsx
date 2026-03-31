// ─────────────────────────────────────────────────────────────
//  Contact.jsx
//  Section kontak: peta, info, form kirim pesan via EmailJS
// ─────────────────────────────────────────────────────────────

import { useState } from 'react'
import { CONTACT_INFO, SOCIAL_LINKS } from '../data/portfolioData'
import { useTranslation } from 'react-i18next'
import { trackEvent, GA_EVENTS } from '../hooks/useGoogleAnalytics'
import styles from './Contact.module.css'

export default function Contact() {
  const { t } = useTranslation()
  // State form
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  // Status: '' | 'loading' | 'success' | 'error'
  const [status, setStatus] = useState('')

  // Update field saat user mengetik
  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  // Kirim pesan via Netlify Function (backend — lebih aman)
  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validasi sederhana
    if (!form.name || !form.email || !form.message) {
      setStatus('error')
      return
    }

    setStatus('loading')

    try {
      const response = await fetch('/.netlify/functions/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
        }),
      })

      if (response.ok) {
        // Track successful form submission
        trackEvent(GA_EVENTS.CONTACT_SUBMIT, {
          status: 'success',
          message_length: form.message.length,
        })
        setStatus('success')
        setForm({ name: '', email: '', subject: '', message: '' })
      } else {
        // Track failed submission
        trackEvent(GA_EVENTS.CONTACT_SUBMIT, {
          status: 'failed',
        })
        setStatus('error')
      }
    } catch (error) {
      console.error('[Contact] Submit error:', error)
      trackEvent(GA_EVENTS.CONTACT_SUBMIT, {
        status: 'error',
        error: error.message,
      })
      setStatus('error')
    }
  }

  return (
    <section id="contact" className={styles.contact}>

      <span className="section-tag fade-in">{t('contact.tag', { defaultValue: 'Contact' })}</span>
      <h2 className={`section-title fade-in fade-in-delay-1`}>{t('contact.title', { defaultValue: 'Get In Touch' }).split(' ')[0]} <span>{t('contact.title', { defaultValue: 'Get In Touch' }).split(' ').slice(1).join(' ')}</span></h2>
      <p className={`section-sub fade-in fade-in-delay-1`}>{t('contact.subtitle', { defaultValue: 'Feel free to contact me any time' })}</p>

      {/* Peta Medan */}
      <div className={`${styles.mapWrap} fade-in`}>
        <iframe
          title="Peta Medan"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d254832.50533362923!2d98.5046763031866!3d3.642614145903311!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x303131cc1c3eb2fd%3A0x23d431c8a6908262!2sMedan%2C%20Kota%20Medan%2C%20Sumatera%20Utara!5e0!3m2!1sid!2sid!4v1753251885824!5m2!1sid!2sid"
          width="100%"
          height="300"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      {/* Grid: info | form */}
      <div className={styles.grid}>

        {/* Kolom kiri: info kontak */}
        <div className={`fade-in`}>
          <h3 className={styles.colTitle}>{t('contact.colLeft', { defaultValue: "Let's Work Together" })}</h3>
          <p className={styles.colDesc}>
            {t('contact.colLeftDesc', {
              defaultValue:
                'Fresh web development graduate with solid foundation in HTML/CSS/JavaScript. Looking for opportunities to contribute while learning from experienced developers.',
            })}
          </p>

          {CONTACT_INFO.map((item) => (
            <div key={item.key} className={styles.infoItem}>
              <div className={styles.infoIcon}>{item.icon}</div>
              <div>
                <span className={styles.infoLabel}>
                  {t(`contact.labels.${item.key}`, { defaultValue: item.key })}
                </span>
                <p className={styles.infoValue}>{item.value}</p>
              </div>
            </div>
          ))}

          {/* Tombol sosial media */}
          <div className={styles.socials}>
            {SOCIAL_LINKS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialBtn}
                title={s.label}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Kolom kanan: form */}
        <div className={`fade-in fade-in-delay-2`}>
          <h3 className={styles.colTitle}>{t('contact.colRight', { defaultValue: 'How Can I Help You?' })}</h3>

          <form onSubmit={handleSubmit} className={styles.form}>
            {/* Nama */}
            <div className={styles.formGroup}>
              <label htmlFor="name">{t('contact.form.name', { defaultValue: 'Your Name' })}</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder={t('contact.form.namePh', { defaultValue: 'Andrey Julius' })}
                value={form.name}
                onChange={handleChange}
                className={styles.input}
              />
            </div>

            {/* Email */}
            <div className={styles.formGroup}>
              <label htmlFor="email">{t('contact.form.email', { defaultValue: 'Email Address' })}</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder={t('contact.form.emailPh', { defaultValue: 'you@example.com' })}
                value={form.email}
                onChange={handleChange}
                className={styles.input}
              />
            </div>

            {/* Subject */}
            <div className={styles.formGroup}>
              <label htmlFor="subject">{t('contact.form.subject', { defaultValue: 'Subject (Optional)' })}</label>
              <input
                id="subject"
                name="subject"
                type="text"
                placeholder={t('contact.form.subjectPh', { defaultValue: 'Project Inquiry' })}
                value={form.subject}
                onChange={handleChange}
                className={styles.input}
              />
            </div>

            {/* Pesan */}
            <div className={styles.formGroup}>
              <label htmlFor="message">{t('contact.form.message', { defaultValue: 'Message' })}</label>
              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder={t('contact.form.messagePh', { defaultValue: 'Tell me about your project...' })}
                value={form.message}
                onChange={handleChange}
                className={styles.input}
              />
            </div>

            <button type="submit" className={`btn-primary ${styles.submitBtn}`}>
              {status === 'loading'
                ? t('contact.form.sending', { defaultValue: '⏳ Sending...' })
                : t('contact.form.send', { defaultValue: '✉ Send Message' })}
            </button>

            {/* Pesan status */}
            {status === 'success' && (
              <div className={`${styles.statusMsg} ${styles.success}`}>
                {t('contact.form.success', { defaultValue: "✅ Message sent! I'll get back to you soon." })}
              </div>
            )}
            {status === 'error' && (
              <div className={`${styles.statusMsg} ${styles.error}`}>
                {t('contact.form.error', { defaultValue: '⚠️ Please fill in all fields correctly.' })}
              </div>
            )}
          </form>
        </div>
      </div>

    </section>
  )
}
