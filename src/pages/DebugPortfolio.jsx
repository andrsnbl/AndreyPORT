import { useState, useEffect } from 'react'
import { sanity, builder } from '../lib/sanity'
import { usePortfolio } from '../hooks/usePortfolio'

export default function DebugPortfolio() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [sanityStatus, setSanityStatus] = useState(null)
  const [imageTests, setImageTests] = useState([])

  // Get data from hook
  const { items: portfolioItems, loading: hookLoading } = usePortfolio()

  useEffect(() => {
    const debugFetch = async () => {
      try {
        console.log('🔍 [DEBUG] Starting diagnostic...')

        if (!sanity) {
          setSanityStatus('❌ Sanity not configured - check .env file')
          setLoading(false)
          return
        }

        setSanityStatus('✅ Sanity configured')

        // Fetch dengan image asset
        const query = `*[_type == "portfolio"] | order(_createdAt desc) {
          _id,
          _type,
          _createdAt,
          title,
          category,
          projectType,
          previewType,
          description,
          thumbnail {
            asset->,
            ...
          },
          "thumbnailUrl": thumbnail.asset->url,
        }`

        console.log('📤 Fetching portfolio data...')
        const response = await sanity.fetch(query)

        console.log('📥 Response received:', response.length, 'items')
        setData(response)

        if (!response || response.length === 0) {
          setSanityStatus('⚠️ Sanity connected but NO portfolio data found')
        } else {
          setSanityStatus(`✅ Found ${response.length} portfolio items`)

          // Test image URLs
          const tests = response.map((item, idx) => {
            let errorMsg = []
            let hasAsset = !!item.thumbnail?.asset?._id
            let hasDirectUrl = !!item.thumbnailUrl
            let hasBuilderUrl = false

            try {
              if (item.thumbnail?.asset?._id) {
                const builderUrl = builder.image(item.thumbnail).width(400).height(300).url()
                hasBuilderUrl = !!builderUrl
              }
            } catch (e) {
              errorMsg.push('Builder error: ' + e.message)
            }

            return {
              idx,
              title: item.title,
              hasAsset,
              hasDirectUrl,
              hasBuilderUrl,
              directUrl: item.thumbnailUrl?.substring(0, 80),
              errors: errorMsg,
              status: hasDirectUrl && hasAsset ? '✅' : '⚠️',
            }
          })

          setImageTests(tests)
        }
      } catch (err) {
        console.error('🔴 Error:', err)
        setError(err.message)
        setSanityStatus(`❌ Error: ${err.message}`)
      } finally {
        setLoading(false)
      }
    }

    debugFetch()
  }, [])

  return (
    <div style={{ padding: '2rem', backgroundColor: '#1a1a1a', color: '#fff', minHeight: '100vh', fontFamily: 'monospace', fontSize: '0.9rem' }}>
      <h1>🐛 Portfolio Sanity Debug</h1>

      {/* Status Section */}
      <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#2a2a2a', borderRadius: '0.5rem', marginBottom: '1rem' }}>
        <h3>📊 Status</h3>
        <p><strong>Sanity:</strong> {sanityStatus}</p>
        <p><strong>Hook:</strong> {hookLoading ? '⏳ Loading...' : '✅ Ready'}</p>
        <p><strong>Items from Sanity:</strong> {data?.length || 0}</p>
        <p><strong>Items from Hook:</strong> {portfolioItems.length}</p>
      </div>

      {loading && <p>🔄 Loading...</p>}

      {error && (
        <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#8B0000', borderRadius: '0.5rem', marginBottom: '1rem' }}>
          <h3>❌ Error</h3>
          <pre style={{ whiteSpace: 'pre-wrap' }}>{error}</pre>
        </div>
      )}

      {/* Raw Data Section */}
      {data && (
        <div style={{ marginTop: '1rem', marginBottom: '1rem' }}>
          <h3>📦 Raw Data from Sanity ({data.length} items)</h3>
          {data.length === 0 ? (
            <p style={{ color: '#ff6b6b' }}>⚠️ No data in Sanity!</p>
          ) : (
            data.map((item, i) => (
              <div key={item._id} style={{ marginTop: '0.5rem', padding: '0.75rem', backgroundColor: '#2a2a2a', borderRadius: '0.5rem', fontSize: '0.8rem' }}>
                <strong>#{i + 1} - {item.title}</strong>
                <table style={{ width: '100%', marginTop: '0.25rem' }}>
                  <tbody>
                    <tr>
                      <td style={{ fontWeight: 'bold', width: '120px' }}>Category:</td>
                      <td>{item.category}</td>
                    </tr>
                    <tr>
                      <td style={{ fontWeight: 'bold' }}>Has Asset:</td>
                      <td style={{ color: item.thumbnail?.asset?._id ? '#00ff00' : '#ff0000' }}>
                        {item.thumbnail?.asset?._id ? '✅' : '❌'}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ fontWeight: 'bold' }}>Direct URL:</td>
                      <td style={{ color: item.thumbnailUrl ? '#00ff00' : '#ff0000' }}>
                        {item.thumbnailUrl ? '✅ ' + item.thumbnailUrl.substring(0, 60) + '...' : '❌ NO'}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ))
          )}
        </div>
      )}

      {/* Image Tests */}
      {imageTests.length > 0 && (
        <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#003300', borderRadius: '0.5rem', marginBottom: '1rem' }}>
          <h3>🖼️ Image URL Tests</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
            <thead>
              <tr style={{ backgroundColor: '#1a4d1a', borderBottom: '2px solid #7c3aed' }}>
                <th style={{ padding: '0.5rem', textAlign: 'left' }}>#</th>
                <th style={{ padding: '0.5rem', textAlign: 'left' }}>Title</th>
                <th>Asset?</th>
                <th>URL?</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {imageTests.map((test) => (
                <tr key={test.idx} style={{ backgroundColor: test.status === '✅' ? '#1a4d1a' : '#4d1a1a', borderBottom: '1px solid #444' }}>
                  <td style={{ padding: '0.5rem' }}>{test.idx + 1}</td>
                  <td style={{ padding: '0.5rem' }}>{test.title}</td>
                  <td style={{ textAlign: 'center', color: test.hasAsset ? '#00ff00' : '#ff0000' }}>{test.hasAsset ? '✅' : '❌'}</td>
                  <td style={{ textAlign: 'center', color: test.hasDirectUrl ? '#00ff00' : '#ff0000' }}>{test.hasDirectUrl ? '✅' : '❌'}</td>
                  <td style={{ textAlign: 'center', fontSize: '1.1rem' }}>{test.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Hook Data */}
      {portfolioItems.length > 0 && (
        <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#4d4d00', borderRadius: '0.5rem', marginBottom: '1rem' }}>
          <h3>🔄 Hook Data (Processed)</h3>
          <p>Items: {portfolioItems.length}</p>
          <p>With image URL: {portfolioItems.filter(i => i.img).length}</p>
          <p>WITHOUT image URL: {portfolioItems.filter(i => !i.img).length}</p>
        </div>
      )}

      <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#333333', borderRadius: '0.5rem', fontSize: '0.75rem' }}>
        <h3>🔧 Env Check</h3>
        <p>PROJECT_ID: {import.meta.env.VITE_SANITY_PROJECT_ID}</p>
        <p>DATASET: {import.meta.env.VITE_SANITY_DATASET}</p>
        <p>TOKEN: {import.meta.env.VITE_SANITY_TOKEN ? '✅ Set' : '❌ Missing'}</p>
      </div>
    </div>
  )
}
