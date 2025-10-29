// src/stores/authStore.js
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    userEmail: null,
  }),

  actions: {
    async login(email, password) {
      try {
        const response = await fetch('http://localhost:8080/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        })

        if (!response.ok) {
          throw new Error('Login failed')
        }

        const token = await response.text() // backend devuelve solo el token en texto plano
        this.token = token
        this.userEmail = email
        localStorage.setItem('token', token)

        return true
      } catch (error) {
        console.error('❌ Login error:', error)
        throw new Error('Login failed')
      }
    },

    logout() {
      this.token = null
      this.userEmail = null
      localStorage.removeItem('token')
    },

    setToken(token) {
      this.token = token
      localStorage.setItem('token', token)
    },
  },
})