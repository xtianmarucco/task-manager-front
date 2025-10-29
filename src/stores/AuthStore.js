// src/stores/authStore.js
import { defineStore } from 'pinia'
import { login as loginRequest } from '../services/AuthService'

const USER_STORAGE_KEY = 'user'
const DISPLAY_NAME_KEY = 'userDisplayName'

const getStoredUser = () => {
  const raw = localStorage.getItem(USER_STORAGE_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw)
  } catch {
    localStorage.removeItem(USER_STORAGE_KEY)
    return null
  }
}

const persistUser = (user) => {
  if (user) {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user))
  } else {
    localStorage.removeItem(USER_STORAGE_KEY)
  }
}

const getStoredDisplayName = () => localStorage.getItem(DISPLAY_NAME_KEY)

const persistDisplayName = (displayName) => {
  if (displayName) {
    localStorage.setItem(DISPLAY_NAME_KEY, displayName)
  } else {
    localStorage.removeItem(DISPLAY_NAME_KEY)
  }
}

const resolveDisplayName = (user, fallbackEmail) => {
  if (!user) {
    return fallbackEmail || null
  }
  return user.name || user.username || user.email || fallbackEmail || null
}

export const useAuthStore = defineStore('auth', {
  state: () => {
    const storedUser = getStoredUser()
    const storedDisplayName = getStoredDisplayName()
    return {
      token: localStorage.getItem('token') || null,
      userEmail: resolveDisplayName(storedUser, storedDisplayName),
      user: storedUser,
    }
  },

  actions: {
    async login(email, password) {
      try {
        const response = await loginRequest({ email, password })

        const token = typeof response === 'string' ? response : response?.token
        if (!token) {
          throw new Error('Missing token in login response')
        }

        const user = typeof response === 'object' && response !== null ? response.user ?? null : null
        const displayName = resolveDisplayName(user, email)

        this.token = token
        this.user = user
        this.userEmail = displayName

        localStorage.setItem('token', token)
        persistUser(user)
        persistDisplayName(displayName)

        return true
      } catch (error) {
        console.error('❌ Login error:', error)
        throw new Error('Login failed')
      }
    },

    logout() {
      this.token = null
      this.user = null
      this.userEmail = null
      localStorage.removeItem('token')
      persistUser(null)
      persistDisplayName(null)
    },

    setToken(token) {
      this.token = token
      localStorage.setItem('token', token)
    },

    setUser(user) {
      this.user = user
      const displayName = resolveDisplayName(user, null)
      this.userEmail = displayName
      persistUser(user ?? null)
      persistDisplayName(displayName)
    },
  },
})
