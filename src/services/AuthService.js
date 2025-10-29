// src/services/AuthService.js
import axios from 'axios'

const API = 'http://localhost:8080/api/auth'

export async function login(credentials) {
    const response = await axios.post(`${API}/login`, credentials)
    return response.data // Aquí viene el token
}