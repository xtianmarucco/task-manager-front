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

watch(
  () => props.taskData,
  (newTask) => {
    task.value = { ...newTask }
  },
  { immediate: true },
)

function handleSubmit() {
  if (isEditMode.value) {
    emit('save', { ...task.value })
  } else {
    emit('create', { ...task.value })
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
