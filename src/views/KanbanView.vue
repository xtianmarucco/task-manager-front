// src/views/KanbanView.vue
<script setup>
import { ref, onMounted, computed } from 'vue'
import KanbanCard from '../components/kanban-card/KanbanCard.vue'
import TaskEditModal from '../components/task-edition-modal/TaskEditModal.vue'
import LoaderSpinner from '../components/loader-spinner/LoaderSpinner.vue'
import ConfirmModal from '../components/confirm-modal/ConfirmModal.vue'
import ToastNotification from '../components/toast-notification/ToastNotification.vue'
import { fetchTasks, deleteTask } from '../services/TaskService'

const showEditModal = ref(false)
const selectedTask = ref(null)
const taskToDelete = ref(null)
const showDeleteModal = ref(false)

const tasks = ref([])
const loading = ref(false)
const error = ref(null)

const toast = ref({ visible: false, message: '', type: 'success' })

const deleteMessage = computed(() =>
  taskToDelete.value
    ? `¿Estás seguro de que querés eliminar la tarea: "${taskToDelete.value.title}"?`
    : '',
)

function showToast(message, type = 'success') {
  toast.value = { visible: true, message, type }
}

function handleToastHide() {
  toast.value.visible = false
}

function handleEdit(task) {
  selectedTask.value = { ...task }
  showEditModal.value = true
}

function updateTask(updatedTask) {
  const index = tasks.value.findIndex((t) => t.id === updatedTask.id)
  if (index !== -1) {
    tasks.value[index] = { ...updatedTask }
    showToast('Tarea actualizada exitosamente')
  }
}

function requestDelete(taskId) {
  const task = tasks.value.find((t) => t.id === taskId)
  if (!task) return
  taskToDelete.value = task
  showDeleteModal.value = true
}

async function confirmDelete() {
  if (!taskToDelete.value) return

  try {
    await deleteTask(taskToDelete.value.id)
    tasks.value = tasks.value.filter((t) => t.id !== taskToDelete.value.id)
    showToast('Tarea eliminada correctamente')
    showDeleteModal.value = false
    taskToDelete.value = null
  } catch (err) {
    console.error('❌ Error al eliminar tarea:', err)
    showToast('No se pudo eliminar la tarea', 'error')
  }
}

function cancelDelete() {
  showDeleteModal.value = false
  taskToDelete.value = null
}

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
        :id="task.id"
        :title="task.title"
        :description="task.description"
        :dueDate="task.dueDate"
        :tag="task.tag"
        :status="task.status"
        @edit="handleEdit(task)"
        @delete="requestDelete"
      />
    </div>

    <TaskEditModal v-model="showEditModal" :taskData="selectedTask" @save="updateTask" />

    <ConfirmModal
      v-if="showDeleteModal"
      :title="'Confirmar eliminación'"
      :message="deleteMessage"
      @confirm="confirmDelete"
      @cancel="cancelDelete"
    />

    <ToastNotification
      v-if="toast.visible"
      :message="toast.message"
      :type="toast.type"
      @hide="handleToastHide"
    />
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
