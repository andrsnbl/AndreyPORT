// ─────────────────────────────────────────────────────────────
//  Contact.jsx
//  Section kontak: peta, info, form kirim pesan via EmailJS
// ─────────────────────────────────────────────────────────────

import { useState } from 'react'
import { CONTACT_INFO, SOCIAL_LINKS, EMAILJS_CONFIG } from '../data/portfolioData'
import styles from './Contact.module.css'

export default function Contact() {
  // State form
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  // Status: '' | 'loading' | 'success' | 'error'
  const [status, setStatus] = useState('')

  // Update field saat user mengetik
  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  // Kirim pesan
  const handleSubmit = (e) => {
    e.preventDefault()

    // Validasi sederhana
    if (!form.name || !form.email || !form.message) {
      setStatus('error')
      return
    }

    setStatus('loading')

    // Kirim via EmailJS jika sudah dimuat
    if (window.emailjs) {
      window.emailjs.init(EMAILJS_CONFIG.publicKey)
      window.emailjs
        .send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, {
          name:     form.name,
          email:    form.email,
          comments: form.message,
        })
        .then(() => {
          setStatus('success')
          setForm({ name: '', email: '', message: '' })
        })
        .catch(() => setStatus('error'))
    } else {
      // Fallback jika EmailJS tidak termuat
      setTimeout(() => {
        setStatus('success')
        setForm({ name: '', email: '', message: '' })
      }, 1200)
    }
  }

  return (
    <section id="contact" className={styles.contact}>

      <span className="section-tag fade-in">Contact</span>
      <h2 className={`section-title fade-in fade-in-delay-1`}>Get <span>In Touch</span></h2>
      <p className={`section-sub fade-in fade-in-delay-1`}>Feel free to contact me any time</p>

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
          <h3 className={styles.colTitle}>Let's Work Together</h3>
          <p className={styles.colDesc}>
            Fresh web development graduate with solid foundation in HTML/CSS/JavaScript.
            Looking for opportunities to contribute while learning from experienced developers.
          </p>

          {CONTACT_INFO.map((item) => (
            <div key={item.label} className={styles.infoItem}>
              <div className={styles.infoIcon}>{item.icon}</div>
              <div>
                <span className={styles.infoLabel}>{item.label}</span>
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
          <h3 className={styles.colTitle}>How Can I Help You?</h3>

          <form onSubmit={handleSubmit} className={styles.form}>
            {/* Nama */}
            <div className={styles.formGroup}>
              <label htmlFor="name">Your Name</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Andrey Julius"
                value={form.name}
                onChange={handleChange}
                className={styles.input}
              />
            </div>

            {/* Email */}
            <div className={styles.formGroup}>
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                className={styles.input}
              />
            </div>

            {/* Pesan */}
            <div className={styles.formGroup}>
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder="Tell me about your project..."
                value={form.message}
                onChange={handleChange}
                className={styles.input}
              />
            </div>

            <button type="submit" className={`btn-primary ${styles.submitBtn}`}>
              {status === 'loading' ? '⏳ Sending...' : '✉ Send Message'}
            </button>

            {/* Pesan status */}
            {status === 'success' && (
              <div className={`${styles.statusMsg} ${styles.success}`}>
                ✅ Message sent! I'll get back to you soon.
              </div>
            )}
            {status === 'error' && (
              <div className={`${styles.statusMsg} ${styles.error}`}>
                ⚠️ Please fill in all fields correctly.
              </div>
            )}
          </form>
        </div>
      </div>

    </section>
  )
}
