<template>
  <div
    ref="cardRef"
    class="bg-white border rounded shadow-sm p-3 d-flex flex-column position-relative"
    style="max-height: 250px"
  >
    <!-- Header: título + dropdown -->
    <div class="d-flex justify-content-between align-items-start mb-2">
      <div>
        <h6 class="mb-1">{{ title }}</h6>
      </div>

      <!-- Custom Dropdown -->
      <div class="position-relative">
        <button class="btn btn-sm btn-light" type="button" @click.stop="toggleDropdown">
          <i class="bi bi-three-dots-vertical"></i>
        </button>

        <div
          v-if="openDropdown"
          class="position-absolute bg-white border rounded shadow-sm"
          style="right: 0; z-index: 10; min-width: 120px"
        >
          <button class="dropdown-item w-100 m-2 text-start" type="button" @click="handleEdit">
            Edit
          </button>
          <button
            class="dropdown-item w-100 m-2 text-start text-danger"
            type="button"
            @click="handleDelete"
          >
            Delete
          </button>
        </div>
      </div>
    </div>

    <!-- Descripción -->
    <p class="text-muted small mb-2" v-if="description">{{ description }}</p>

    <!-- Footer fijo abajo -->
    <div class="mt-auto d-flex justify-content-between align-items-center pt-2 border-top">
      <small class="text-muted"><i class="bi bi-calendar me-1"></i>{{ dueDate }}</small>
      <div>
        <span class="badge me-1" :class="statusClassMap[status]" style="font-size: 0.7rem">
          {{ statusLabel }}
        </span>
        <span class="badge bg-light text-dark border" style="font-size: 0.75rem">{{ tag }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const props = defineProps({
  id: [Number, String],
  title: String,
  description: String,
  dueDate: String,
  tag: String,
  status: String,
})

const emit = defineEmits(['edit', 'delete'])

const openDropdown = ref(false)
const cardRef = ref(null)

const statusClassMap = {
  completada: 'bg-success text-white',
  pendiente: 'bg-warning text-dark',
  bloqueada: 'bg-danger text-white',
}

const statusLabelMap = {
  completada: 'Completada',
  pendiente: 'Pendiente',
  bloqueada: 'En proceso',
  'en proceso': 'En proceso',
}

const statusLabel = computed(() => statusLabelMap[props.status] || props.status)

const toggleDropdown = () => {
  openDropdown.value = !openDropdown.value
}

const handleEdit = () => {
  openDropdown.value = false
  emit('edit')
}

const handleDelete = () => {
  openDropdown.value = false
  emit('delete', props.id)
}

const handleClickOutside = (event) => {
  if (!openDropdown.value) return
  if (cardRef.value && !cardRef.value.contains(event.target)) {
    openDropdown.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
