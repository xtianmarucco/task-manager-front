<!-- src/components/kanban/TaskEditModal.vue -->
<template>
  <div class="modal fade" tabindex="-1" ref="modal" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Edit Task</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>

        <div class="modal-body">
          <form @submit.prevent="handleSave">
            <div class="mb-3">
              <label class="form-label">Title</label>
              <input type="text" class="form-control" v-model="task.title" required />
            </div>

            <div class="mb-3">
              <label class="form-label">Description</label>
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
              <label class="form-label">Status</label>
              <select class="form-select" v-model="task.status">
                <option value="pendiente">Pendiente</option>
                <option value="completada">Completada</option>
                <option value="bloqueada">Bloqueada</option>
              </select>
            </div>

            <div class="modal-footer">
              <button type="submit" class="btn btn-primary">Save</button>
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { Modal } from 'bootstrap'

const props = defineProps({
  modelValue: Boolean,
  taskData: Object,
})
const emit = defineEmits(['update:modelValue', 'save'])

const modal = ref(null)
let instance = null

const task = ref({ ...props.taskData })

watch(
  () => props.taskData,
  (newTask) => {
    task.value = { ...newTask }
  },
)

function handleSave() {
  emit('save', { ...task.value })
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
