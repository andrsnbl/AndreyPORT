import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  build: {
    // Optimize bundle chunking
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate vendor libraries
          'react-vendor': ['react', 'react-dom'],
          'i18n': ['i18next', 'react-i18next'],
          'supabase': ['@supabase/supabase-js'],
        },
      },
    },

    // Minimize bundle size
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console logs in production
        drop_debugger: true,
      },
    },

    // CSS optimization
    cssCodeSplit: true,

    // Source map untuk production (optional)
    sourcemap: false,

    // Report bundle size
    reportCompressedSize: true,
  },

  // Development optimizations
  server: {
    middlewareMode: false,
  },
})

