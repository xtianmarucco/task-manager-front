// src/views/KanbanView.vue
<script setup>
import { ref, onMounted } from 'vue'
import KanbanCard from '../components/kanban-card/KanbanCard.vue'
import TaskEditModal from '../components/task-edition-modal/TaskEditModal.vue'
import LoaderSpinner from '../components/loader-spinner/LoaderSpinner.vue'
import { fetchTasks } from '../services/TaskService'

const showEditModal = ref(false)
const selectedTask = ref(null)
const tasks = ref([])
const loading = ref(false)
const error = ref(null)

function handleEdit(task) {
  selectedTask.value = { ...task }
  showEditModal.value = true
}

function updateTask(updatedTask) {
  const index = tasks.value.findIndex((t) => t.id === updatedTask.id)
  if (index !== -1) {
    tasks.value[index] = { ...updatedTask }
  }
}

console.log(tasks)

async function loadTasks() {
  loading.value = true
  error.value = null
  try {
    const result = await fetchTasks()
    console.log('📦 Tareas recibidas:', result)
    tasks.value = result
  } catch (err) {
    console.error('❌ Error al cargar tareas:', err)
    error.value = 'No se pudieron cargar las tareas.'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadTasks()
})
</script>

<template>
  <div class="p-4">
    <div class="bg-light rounded p-4 mb-4 d-flex justify-content-between align-items-center">
      <div>
        <h4 class="mb-0">Task Manager</h4>
        <small class="text-muted">Dashboard</small>
      </div>
    </div>

    <div v-if="loading">
      <LoaderSpinner />
    </div>

    <div v-else-if="error">
      <div class="alert alert-danger text-center" role="alert">
        {{ error }}
        <button class="btn btn-sm btn-outline-secondary ms-3" @click="loadTasks">Reintentar</button>
      </div>
    </div>

    <div v-else-if="tasks.length === 0" class="text-center text-muted py-5">No hay tareas aún.</div>

    <div v-else class="task-grid">
      <KanbanCard
        v-for="task in tasks"
        :key="task.id"
        :title="task.title"
        :description="task.description"
        :dueDate="task.dueDate"
        :tag="task.tag"
        :status="task.status"
        @edit="handleEdit(task)"
      />
    </div>

    <TaskEditModal v-model="showEditModal" :taskData="selectedTask" @save="updateTask" />
  </div>
</template>

<style scoped>
.task-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
  min-height: 80vh;
}
</style>
