// ─────────────────────────────────────────────────────────────
//  Storefront.jsx
//  Toko produk modern dengan filter kategori, cart, & payment gateway
// ─────────────────────────────────────────────────────────────

import { useState, useMemo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useProducts } from '../hooks/useProducts'
import { PRODUCT_CATEGORIES } from '../data/portfolioData'
import PaymentModal from './PaymentModal'
import styles from './Storefront.module.css'

export default function Storefront() {
  const { t } = useTranslation()
  const { products, loading } = useProducts()
  const [activeCategory, setActiveCategory] = useState('all')
  const [cart, setCart] = useState([])
  const [showPayment, setShowPayment] = useState(false)

  const filteredProducts = useMemo(() => {
    if (!products || !Array.isArray(products)) return []
    if (activeCategory === 'all') return products
    return products.filter(p => p?.category === activeCategory)
  }, [activeCategory, products])

  // Format harga Indonesia
  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price)
  }

  // Tambah produk ke cart
  const handleAddToCart = useCallback((product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id)
      
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      
      return [...prevCart, { ...product, quantity: 1 }]
    })
  }, [])

  // Hapus produk dari cart
  const handleRemoveFromCart = useCallback((productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId))
  }, [])

  // Update quantity di cart
  const handleUpdateQuantity = useCallback((productId, quantity) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId)
      return
    }
    
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity }
          : item
      )
    )
  }, [handleRemoveFromCart])

  // Hitung total cart
  const cartTotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  }, [cart])

  const WA_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '628xxxxxxxxxx'

  // Buka WhatsApp dengan pesan produk
  const handleWhatsApp = (productName) => {
    const message = encodeURIComponent(
      `Halo! Saya tertarik dengan produk: ${productName}\n\nBisakah Anda memberikan informasi lebih lanjut?`
    )
    const whatsappUrl = `https://wa.me/${WA_NUMBER}?text=${message}`
    window.open(whatsappUrl, '_blank')
  }

  const handleWhatsAppBulk = () => {
    const message = encodeURIComponent(
      `Halo! Saya tertarik melihat produk-produk Anda. Bisakah Anda mengirimkan katalog lengkap?`
    )
    const whatsappUrl = `https://wa.me/${WA_NUMBER}?text=${message}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <section id="storefront" className={styles.storefront}>
      <span className="section-tag fade-in">
        {t('storefront.tag', { defaultValue: '🛍️ Koleksi Produk' })}
      </span>
      <h2 className={`section-title fade-in fade-in-delay-1`}>
        {t('storefront.title', { defaultValue: 'Toko' })}
        <span>{t('storefront.titleSpan', { defaultValue: 'Kami' })}</span>
      </h2>
      <p className={`section-sub fade-in fade-in-delay-1`}>
        {t('storefront.subtitle', { defaultValue: 'Produk pilihan dengan kualitas terbaik' })}
      </p>

      {/* ─────────────────────────────── FILTER KATEGORI */}
      <div className={`${styles.filterContainer} fade-in fade-in-delay-2`}>
        <button
          className={`${styles.filterBtn} ${activeCategory === 'all' ? styles.active : ''}`}
          onClick={() => setActiveCategory('all')}
        >
          {t('storefront.all', { defaultValue: 'Semua Produk' })}
        </button>
        {PRODUCT_CATEGORIES.map(category => (
          <button
            key={category.id}
            className={`${styles.filterBtn} ${activeCategory === category.id ? styles.active : ''}`}
            onClick={() => setActiveCategory(category.id)}
          >
            <span className={styles.categoryIcon}>{category.icon}</span>
            {t(`storefront.categories.${category.id}`, { defaultValue: category.name })}
          </button>
        ))}
      </div>

      {/* ─────────────────────────────── GRID PRODUK */}
      {loading ? (
        <div className={styles.emptyState}>⏳ Memuat produk...</div>
      ) : (
        <div className={styles.productsGrid}>
          {filteredProducts.map((product, i) => (
            <div
              key={`${activeCategory}-${product.id}`}
              className={styles.productCard}
              style={{ animationDelay: `${i * 0.07}s` }}
            >
              {product.discount && (
                <div className={styles.discountBadge}>-{product.discount}%</div>
              )}
              <div className={styles.imageContainer}>
                <img
                  src={product.image_url || product.image}
                  alt={product.name}
                  className={styles.productImage}
                  onError={e => { e.target.src = 'https://via.placeholder.com/300x240?text=No+Image' }}
                />
                <div className={styles.imageOverlay}>
                  <button className={styles.whatsappBtn}
                    onClick={() => handleWhatsApp(product.name)}>
                    <span className={styles.waIcon}>💬</span>
                    {t('storefront.askVia', { defaultValue: 'Tanya di WhatsApp' })}
                  </button>
                </div>
              </div>
              <div className={styles.productContent}>
                <span className={styles.category}>
                  {PRODUCT_CATEGORIES.find(c => c.id === product.category)?.icon}
                  {t(`storefront.categories.${product.category}`, {
                    defaultValue: PRODUCT_CATEGORIES.find(c => c.id === product.category)?.name,
                  })}
                </span>
                <h4 className={styles.productName}>{product.name}</h4>
                <p className={styles.productDesc}>{product.description}</p>
                <div className={styles.priceSection}>
                  {(product.original_price || product.originalPrice) && (
                    <span className={styles.originalPrice}>
                      {formatPrice(product.original_price || product.originalPrice)}
                    </span>
                  )}
                  <span className={styles.currentPrice}>{formatPrice(product.price)}</span>
                </div>
                {product.rating && (
                  <div className={styles.rating}>
                    <span className={styles.stars}>
                      {'★'.repeat(Math.round(product.rating))}{'☆'.repeat(5 - Math.round(product.rating))}
                    </span>
                    <span className={styles.ratingText}>
                      {product.rating} ({product.reviews} ulasan)
                    </span>
                  </div>
                )}
                <div className={styles.actions}>
                  <button className={styles.addCart} onClick={() => handleAddToCart(product)}>
                    🛒 {t('storefront.addCart', { defaultValue: 'Keranjang' })}
                  </button>
                  <button className={styles.buyNow} onClick={() => handleWhatsApp(product.name)}>
                    💬 {t('storefront.order', { defaultValue: 'Pesan' })}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pesan jika tidak ada produk */}
      {!loading && filteredProducts.length === 0 && (
        <div className={styles.emptyState}>
          <p>⚠️ {t('storefront.noproducts', { defaultValue: 'Tidak ada produk di kategori ini' })}</p>
        </div>
      )}

      {/* ─────────────────────────────── CALL TO ACTION */}
      <div className={`${styles.ctaSection} fade-in fade-in-delay-3`}>
        <div className={styles.ctaContent}>
          <h3>{t('storefront.cta.title', { defaultValue: 'Ingin tahu lebih banyak?' })}</h3>
          <p>{t('storefront.cta.desc', { defaultValue: 'Hubungi kami sekarang untuk penawaran spesial dan konsultasi gratis' })}</p>
          <button className={styles.ctaWhatsApp} onClick={handleWhatsAppBulk}>
            <span className={styles.ctaIcon}>📱</span>
            {t('storefront.cta.button', { defaultValue: 'Chat dengan Kami' })}
          </button>
        </div>
      </div>

      {/* ─────────────────────────────── CART SUMMARY */}
      {cart.length > 0 && (
        <div className={`${styles.cartSection} fade-in fade-in-delay-3`}>
          <div className={styles.cartHeader}>
            <h3>🛒 {t('storefront.cart.title', { defaultValue: 'Keranjang Anda' })}</h3>
            <span className={styles.cartCount}>{cart.length} {t('storefront.cart.items', { defaultValue: 'Produk' })}</span>
          </div>
          
          <div className={styles.cartItems}>
            {cart.map(item => (
              <div key={item.id} className={styles.cartItem}>
                <div className={styles.cartItemInfo}>
                  <h5>{item.name}</h5>
                  <p>{formatPrice(item.price)} × {item.quantity}</p>
                </div>
                <div className={styles.cartItemControls}>
                  <button
                    className={styles.qtyBtn}
                    onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                  >
                    −
                  </button>
                  <span className={styles.qty}>{item.quantity}</span>
                  <button
                    className={styles.qtyBtn}
                    onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                  <button
                    className={styles.removeBtn}
                    onClick={() => handleRemoveFromCart(item.id)}
                  >
                    ✕
                  </button>
                </div>
                <div className={styles.cartItemTotal}>
                  {formatPrice(item.price * item.quantity)}
                </div>
              </div>
            ))}
          </div>

          <div className={styles.cartFooter}>
            <div className={styles.cartTotalSection}>
              <span>{t('storefront.cart.total', { defaultValue: 'Total:' })}</span>
              <span className={styles.cartTotalAmount}>{formatPrice(cartTotal)}</span>
            </div>
            <button
              className={styles.checkoutBtn}
              onClick={() => setShowPayment(true)}
            >
              💳 {t('storefront.cart.checkout', { defaultValue: 'Lanjut ke Pembayaran' })}
            </button>
          </div>
        </div>
      )}

      {/* ─────────────────────────────── PAYMENT MODAL */}
      {showPayment && (
        <PaymentModal
          cart={cart}
          total={cartTotal}
          formatPrice={formatPrice}
          onClose={() => setShowPayment(false)}
          onClearCart={() => setCart([])}
        />
      )}
    </section>
  )
}
