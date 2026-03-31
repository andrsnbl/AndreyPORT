// ─────────────────────────────────────────────────────────
//  src/store/authStore.js
//  Zustand store untuk admin authentication
//  Simple password-based auth untuk admin dashboard
// ─────────────────────────────────────────────────────────

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAuthStore = create(
  persist(
    (set) => ({
      isAuthenticated: false,
      adminPassword: null,

      // Login dengan password
      login: (password) => {
        // Password dari environment variable atau hardcoded
        const correctPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123'
        const isValid = password === correctPassword

        if (isValid) {
          set({ isAuthenticated: true, adminPassword: password })
          return true
        }
        return false
      },

      // Logout
      logout: () => {
        set({ isAuthenticated: false, adminPassword: null })
      },

      // Check auth status
      checkAuth: () => {
        // Dapat di-extend dengan JWT/OAuth later
        return true
      },
    }),
    {
      name: 'admin-auth-store', // LocalStorage key
      partialize: (state) => ({ isAuthenticated: state.isAuthenticated }),
    }
  )
)
