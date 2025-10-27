import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    //withCredentials: true // solo si usás cookies/sesiones
})

export async function fetchTasks() {
    const response = await api.get('/api/tasks')
    return response.data
}