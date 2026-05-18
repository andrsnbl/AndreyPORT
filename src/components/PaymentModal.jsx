// ─────────────────────────────────────────────────────────────
//  PaymentModal.jsx
//  Modal pembayaran dengan gateway Stripe & Xendit
// ─────────────────────────────────────────────────────────────

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './PaymentModal.module.css'

export default function PaymentModal({ cart, total, formatPrice, onClose, onClearCart }) {
  const { t } = useTranslation()
  const [paymentMethod, setPaymentMethod] = useState('stripe') // stripe, xendit, bank_transfer
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const validateForm = () => {
    return formData.name && formData.email && formData.phone && formData.address
  }

  const handlePaymentStripe = async () => {
    if (!validateForm()) {
      alert(t('storefront.payment.fillForm', { defaultValue: 'Isi semua data terlebih dahulu' }))
      return
    }

    setLoading(true)
    
    // DEMO: Simulated Stripe payment
    // Dalam production, integrate dengan Stripe API
    // const response = await fetch('/api/create-payment-intent', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     items: cart,
    //     amount: total,
    //     email: formData.email,
    //   }),
    // })
    
    setTimeout(() => {
      setLoading(false)
      setSuccess(true)
      setTimeout(() => {
        onClearCart()
        onClose()
      }, 2000)
    }, 1500)
  }

  const handlePaymentXendit = async () => {
    if (!validateForm()) {
      alert(t('storefront.payment.fillForm', { defaultValue: 'Isi semua data terlebih dahulu' }))
      return
    }

    setLoading(true)

    // DEMO: Simulated Xendit payment
    // Dalam production, integrate dengan Xendit API
    // const response = await fetch('/api/xendit-invoice', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     items: cart,
    //     amount: total,
    //     payer_email: formData.email,
    //   }),
    // })

    setTimeout(() => {
      setLoading(false)
      setSuccess(true)
      setTimeout(() => {
        onClearCart()
        onClose()
      }, 2000)
    }, 1500)
  }

  const handlePaymentBankTransfer = async () => {
    if (!validateForm()) {
      alert(t('storefront.payment.fillForm', { defaultValue: 'Isi semua data terlebih dahulu' }))
      return
    }

    setLoading(true)

    // DEMO: Bank transfer pendaftaran
    setTimeout(() => {
      setLoading(false)
      setSuccess(true)
      setTimeout(() => {
        onClearCart()
        onClose()
      }, 2000)
    }, 1500)
  }

  const handlePayment = () => {
    switch (paymentMethod) {
      case 'stripe':
        handlePaymentStripe()
        break
      case 'xendit':
        handlePaymentXendit()
        break
      case 'bank_transfer':
        handlePaymentBankTransfer()
        break
      default:
        break
    }
  }

  if (success) {
    return (
      <div className={styles.modalOverlay} onClick={onClose}>
        <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
          <div className={styles.successMessage}>
            <div className={styles.successIcon}>✓</div>
            <h3>{t('storefront.payment.success', { defaultValue: 'Pembayaran Berhasil!' })}</h3>
            <p>{t('storefront.payment.successDesc', { defaultValue: 'Terima kasih atas pembelian Anda. Anda akan menerima konfirmasi via email.' })}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.header}>
          <h2>💳 {t('storefront.payment.title', { defaultValue: 'Pembayaran' })}</h2>
          <button className={styles.closeBtn} onClick={onClose}>✕</button>
        </div>

        {/* Order Summary */}
        <div className={styles.orderSummary}>
          <h4>{t('storefront.payment.orderSummary', { defaultValue: 'Ringkasan Pesanan' })}</h4>
          <div className={styles.summaryItems}>
            {cart.map(item => (
              <div key={item.id} className={styles.summaryItem}>
                <span>{item.name} × {item.quantity}</span>
                <span>{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>
          <div className={styles.summaryTotal}>
            <span>{t('storefront.payment.total', { defaultValue: 'Total' })}</span>
            <span>{formatPrice(total)}</span>
          </div>
        </div>

        {/* Payment Method */}
        <div className={styles.paymentMethods}>
          <h4>{t('storefront.payment.method', { defaultValue: 'Metode Pembayaran' })}</h4>
          
          <label className={`${styles.methodOption} ${paymentMethod === 'stripe' ? styles.selected : ''}`}>
            <input
              type="radio"
              name="paymentMethod"
              value="stripe"
              checked={paymentMethod === 'stripe'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <span className={styles.methodLabel}>
              <span className={styles.methodIcon}>💳</span>
              <span>
                <strong>Stripe</strong>
                <small>Kartu Kredit / Debit (International)</small>
              </span>
            </span>
          </label>

          <label className={`${styles.methodOption} ${paymentMethod === 'xendit' ? styles.selected : ''}`}>
            <input
              type="radio"
              name="paymentMethod"
              value="xendit"
              checked={paymentMethod === 'xendit'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <span className={styles.methodLabel}>
              <span className={styles.methodIcon}>🇮🇩</span>
              <span>
                <strong>Xendit</strong>
                <small>E-wallet, Transfer Bank (Indonesia)</small>
              </span>
            </span>
          </label>

          <label className={`${styles.methodOption} ${paymentMethod === 'bank_transfer' ? styles.selected : ''}`}>
            <input
              type="radio"
              name="paymentMethod"
              value="bank_transfer"
              checked={paymentMethod === 'bank_transfer'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <span className={styles.methodLabel}>
              <span className={styles.methodIcon}>🏦</span>
              <span>
                <strong>{t('storefront.payment.bankTransfer', { defaultValue: 'Transfer Bank' })}</strong>
                <small>{t('storefront.payment.bankTransferDesc', { defaultValue: 'Transfer langsung ke rekening kami' })}</small>
              </span>
            </span>
          </label>
        </div>

        {/* Form Data */}
        <div className={styles.formSection}>
          <h4>{t('storefront.payment.contactInfo', { defaultValue: 'Data Kontak' })}</h4>
          
          <input
            type="text"
            name="name"
            placeholder={t('storefront.payment.namePh', { defaultValue: 'Nama Lengkap' })}
            value={formData.name}
            onChange={handleInputChange}
            className={styles.input}
            disabled={loading}
          />
          
          <input
            type="email"
            name="email"
            placeholder={t('storefront.payment.emailPh', { defaultValue: 'Email' })}
            value={formData.email}
            onChange={handleInputChange}
            className={styles.input}
            disabled={loading}
          />
          
          <input
            type="tel"
            name="phone"
            placeholder={t('storefront.payment.phonePh', { defaultValue: 'No. WhatsApp' })}
            value={formData.phone}
            onChange={handleInputChange}
            className={styles.input}
            disabled={loading}
          />
          
          <textarea
            name="address"
            placeholder={t('storefront.payment.addressPh', { defaultValue: 'Alamat Pengiriman' })}
            value={formData.address}
            onChange={handleInputChange}
            className={styles.textarea}
            disabled={loading}
            rows="3"
          />
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <button
            className={styles.cancelBtn}
            onClick={onClose}
            disabled={loading}
          >
            {t('storefront.payment.cancel', { defaultValue: 'Batal' })}
          </button>
          <button
            className={styles.payBtn}
            onClick={handlePayment}
            disabled={loading || !validateForm()}
          >
            {loading ? (
              <>⏳ {t('storefront.payment.processing', { defaultValue: 'Memproses...' })}</>
            ) : (
              <>✓ {t('storefront.payment.confirm', { defaultValue: 'Bayar Sekarang' })}</>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
