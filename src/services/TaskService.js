// src/services/taskService.js
import axios from 'axios'
import { useAuthStore } from '@/stores/authStore'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
})

api.interceptors.request.use(
    config => {
        const authStore = useAuthStore()
        const token = authStore.token
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    error => Promise.reject(error)
)

// ✅ Función para construir query params dinámicamente
function buildQueryParams(filters = {}) {
    const params = new URLSearchParams()

    if (filters.status) {
        params.append('status', filters.status)
    }
    if (filters.title) {
        params.append('title', filters.title)
    }

    return params.toString()
}

export async function fetchTasks(filters = {}) {
    const query = buildQueryParams(filters)
    const response = await api.get(`/api/tasks${query ? `?${query}` : ''}`)
    return response.data
}


export async function deleteTask(id) {
    return await api.delete(`/api/tasks/${id}`)
}

export async function createTask(task) {
    const res = await api.post('/api/tasks', task)
    return res.data
}