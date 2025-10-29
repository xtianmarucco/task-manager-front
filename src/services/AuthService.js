// src/services/AuthService.js
import axios from 'axios'

const API_BASE_URL = (import.meta.env?.VITE_API_URL ?? 'http://localhost:8080').replace(/\/$/, '')
const API = `${API_BASE_URL}/api/auth`

export async function login(credentials) {
    const response = await axios.post(`${API}/login`, credentials)
    return response.data // Aquí viene el token
}
