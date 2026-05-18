import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'i18n':         ['i18next', 'react-i18next'],
          'supabase':     ['@supabase/supabase-js'],
          'sanity':       ['@sanity/client', '@sanity/image-url'],
          'router':       ['react-router-dom'],
        },
      },
    },
    minify: 'terser',
    terserOptions: { compress: { drop_console: true, drop_debugger: true } },
    cssCodeSplit: true,
    sourcemap: false,
    reportCompressedSize: true,
  },
})
