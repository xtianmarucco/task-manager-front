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

export async function fetchTasks() {
    const res = await api.get('/api/tasks')
    return res.data
}

export async function deleteTask(id) {
    return await api.delete(`/api/tasks/${id}`)
}

export async function createTask(task) {
    const res = await api.post('/api/tasks', task)
    return res.data
}