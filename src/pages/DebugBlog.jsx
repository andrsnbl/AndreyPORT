// Debug page untuk lihat raw Sanity data

import { useAllBlogPosts } from '../hooks/useBlog'
import { urlFor } from '../lib/sanity'

export default function DebugBlog() {
  const { posts, loading, error } = useAllBlogPosts()

  return (
    <div style={{ padding: '2rem', fontFamily: 'monospace', maxWidth: '1200px' }}>
      <h1>🔧 Debug: Sanity Blog Posts</h1>

      {loading && <p>⏳ Loading...</p>}
      {error && <p style={{ color: 'red' }}>❌ Error: {error}</p>}

      <div style={{ marginTop: '2rem' }}>
        <h2>Raw Data from Sanity:</h2>
        <pre style={{ 
          background: '#f5f5f5', 
          padding: '1rem',
          borderRadius: '4px',
          overflow: 'auto',
          maxHeight: '500px'
        }}>
          {JSON.stringify(posts, null, 2)}
        </pre>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <h2>Posts Count: {posts?.length || 0}</h2>
        {posts && posts.length > 0 && (
          <div>
            {posts.map((post, i) => (
              <div key={post._id} style={{
                border: '1px solid #ccc',
                padding: '1rem',
                marginBottom: '1rem',
                borderRadius: '4px'
              }}>
                <h3>Post {i + 1}: {post.title}</h3>
                <p><strong>ID:</strong> {post._id}</p>
                <p><strong>Slug:</strong> {post.slug?.current}</p>
                <p><strong>Excerpt:</strong> {post.excerpt}</p>
                <p><strong>Has mainImage:</strong> {post.mainImage ? '✅' : '❌'}</p>
                <p><strong>Has body:</strong> {post.body ? '✅' : '❌'}</p>
                <p><strong>Body length:</strong> {post.body?.length || 0}</p>
                
                {post.mainImage && (
                  <div>
                    <strong>Image URL test:</strong>
                    <pre>
                      {(() => {
                        try {
                          const url = urlFor(post.mainImage).width(400).height(250).url()
                          return url
                        } catch (err) {
                          return `Error: ${err.message}`
                        }
                      })()}
                    </pre>
                  </div>
                )}

                <details>
                  <summary>Full Post Data</summary>
                  <pre style={{ fontSize: '0.85rem' }}>
                    {JSON.stringify(post, null, 2)}
                  </pre>
                </details>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
