import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    //withCredentials: true // solo si usás cookies/sesiones
})

export async function fetchTasks() {
    const response = await api.get('/api/tasks')
    return response.data
}

export async function deleteTask(id) {
    return await api.delete(`/api/tasks/${id}`)
}

export async function createTask(task) {
    const response = await api.post('/api/tasks', task)
    return response.data
}
