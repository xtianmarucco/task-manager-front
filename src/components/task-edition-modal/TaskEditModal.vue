<!-- src/components/kanban/TaskEditModal.vue -->
<template>
  <div class="modal fade" tabindex="-1" ref="modal" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ isEditMode ? 'Editar tarea' : 'Nueva tarea' }}</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>

        <div class="modal-body">
          <form @submit.prevent="handleSubmit">
            <div class="mb-3">
              <label class="form-label">Título</label>
              <input type="text" class="form-control" v-model="task.title" required />
            </div>

            <div class="mb-3">
              <label class="form-label">Descripción</label>
              <textarea class="form-control" rows="3" v-model="task.description"></textarea>
            </div>

            <div class="mb-3">
              <label class="form-label">Tag</label>
              <select class="form-select" v-model="task.tag">
                <option value="Design">Design</option>
                <option value="Mobile">Mobile</option>
                <option value="Development">Development</option>
                <option value="QA">QA</option>
                <option value="Docs">Docs</option>
              </select>
            </div>

            <div class="mb-3">
              <label class="form-label">Estado</label>
              <select class="form-select" v-model="task.status">
                <option value="pendiente">Pendiente</option>
                <option value="completada">Completada</option>
                <option value="bloqueada">En proceso</option>
              </select>
            </div>

            <div class="mb-3">
              <label class="form-label">Fecha límite</label>
              <input type="date" class="form-control" v-model="task.dueDate" />
            </div>

            <div class="modal-footer">
              <button type="submit" class="btn btn-primary">
                {{ isEditMode ? 'Guardar cambios' : 'Crear tarea' }}
              </button>
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, computed } from 'vue'
import { Modal } from 'bootstrap'

const props = defineProps({
  modelValue: Boolean,
  taskData: Object,
})
const emit = defineEmits(['update:modelValue', 'save', 'create'])

const modal = ref(null)
let instance = null

const task = ref({})

const isEditMode = computed(() => !!task.value.id)

const formatDateForInput = (value) => {
  if (!value) return ''

  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? value : date.toISOString().slice(0, 10)
}

const normalizeTask = (rawTask = {}) => {
  const mergedTask = {
    title: '',
    description: '',
    tag: 'Design',
    status: 'pendiente',
    dueDate: '',
    ...rawTask,
  }

  mergedTask.dueDate = formatDateForInput(rawTask?.dueDate ?? '')

  return mergedTask
}

watch(
  () => props.taskData,
  (newTask) => {
    task.value = normalizeTask(newTask)
  },
  { immediate: true },
)

function handleSubmit() {
  const payload = {
    ...task.value,
    dueDate: task.value.dueDate || null,
  }

  if (isEditMode.value) {
    emit('save', payload)
  } else {
    emit('create', payload)
  }
  instance.hide()
}

onMounted(() => {
  instance = new Modal(modal.value)

  watch(
    () => props.modelValue,
    (value) => {
      if (value) {
        instance.show()
      } else {
        instance.hide()
      }
    },
  )

  modal.value.addEventListener('hidden.bs.modal', () => {
    emit('update:modelValue', false)
  })
})
</script>
