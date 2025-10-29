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
              <label class="form-label">Título <span class="text-danger">*</span></label>
              <input
                type="text"
                class="form-control"
                :class="{ 'is-invalid': formSubmitted && !task.title }"
                v-model="task.title"
              />
              <div v-if="formSubmitted && !task.title" class="invalid-feedback d-block">
                Este campo es obligatorio.
              </div>
            </div>

            <div class="mb-3">
              <label class="form-label">Descripción <span class="text-danger">*</span></label>
              <textarea
                class="form-control"
                :class="{ 'is-invalid': formSubmitted && !task.description }"
                rows="3"
                v-model="task.description"
              ></textarea>
              <div v-if="formSubmitted && !task.description" class="invalid-feedback d-block">
                Este campo es obligatorio.
              </div>
            </div>

            <div class="mb-3">
              <label class="form-label">Tag <span class="text-danger">*</span></label>
              <select
                class="form-select"
                :class="{ 'is-invalid': formSubmitted && !task.tag }"
                v-model="task.tag"
              >
                <option value="Design">Design</option>
                <option value="Mobile">Mobile</option>
                <option value="Development">Development</option>
                <option value="QA">QA</option>
                <option value="Docs">Docs</option>
              </select>
              <div v-if="formSubmitted && !task.tag" class="invalid-feedback d-block">
                Este campo es obligatorio.
              </div>
            </div>

            <div class="mb-3">
              <label class="form-label">Estado <span class="text-danger">*</span></label>
              <select
                class="form-select"
                :class="{ 'is-invalid': formSubmitted && !task.status }"
                v-model="task.status"
              >
                <option value="pendiente">Pendiente</option>
                <option value="completada">Completada</option>
                <option value="bloqueada">En proceso</option>
              </select>
              <div v-if="formSubmitted && !task.status" class="invalid-feedback d-block">
                Este campo es obligatorio.
              </div>
            </div>

            <div class="mb-3">
              <label class="form-label">Fecha límite <span class="text-danger">*</span></label>
              <input
                type="date"
                class="form-control"
                :class="{ 'is-invalid': formSubmitted && !task.dueDate }"
                v-model="task.dueDate"
              />
              <div v-if="formSubmitted && !task.dueDate" class="invalid-feedback d-block">
                Este campo es obligatorio.
              </div>
            </div>

            <div class="modal-footer">
              <button type="submit" class="btn btn-primary">
                {{ isEditMode ? 'Guardar cambios' : 'Crear tarea' }}
              </button>
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                Cancelar
              </button>
            </div>
            <div class="mt-2">
              <small class="text-muted">* campos obligatorios</small>
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

const formSubmitted = ref(false)

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
  formSubmitted.value = true

  if (
    !task.value.title ||
    !task.value.status ||
    !task.value.dueDate ||
    !task.value.description ||
    !task.value.tag
  ) {
    return // No enviar si hay campos vacíos obligatorios
  }

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
