<template>
  <div class="bg-white border rounded shadow-sm p-3 d-flex flex-column" style="min-height: 180px">
    <!-- Header: título + dropdown -->
    <div class="d-flex justify-content-between align-items-start mb-2">
      <div>
        <h6 class="mb-1">{{ title }}</h6>
      </div>

      <div class="dropdown">
        <button
          class="btn btn-sm btn-light"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i class="bi bi-three-dots-vertical"></i>
        </button>
        <ul class="dropdown-menu dropdown-menu-end">
          <li><button class="dropdown-item" @click="$emit('edit')">Edit</button></li>
          <li>
            <button class="dropdown-item text-danger" @click="$emit('delete')">Delete</button>
          </li>
        </ul>
      </div>
    </div>

    <!-- Descripción -->
    <p class="text-muted small mb-2" v-if="description">{{ description }}</p>

    <!-- Footer fijo abajo -->
    <div class="mt-auto d-flex justify-content-between align-items-center pt-2 border-top">
      <small class="text-muted"><i class="bi bi-calendar me-1"></i>{{ createdAt }}</small>
      <div>
        <span class="badge" :class="statusClassMap[status]" style="font-size: 0.7rem">
          {{ status }}
        </span>
        <span class="badge bg-light text-dark border" style="font-size: 0.75rem">{{ tag }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  description: String,
  createdAt: String,
  tag: String,
  status: String,
})

defineEmits(['edit', 'delete'])

const statusClassMap = {
  completada: 'bg-success text-white',
  pendiente: 'bg-warning text-dark',
  bloqueada: 'bg-danger text-white',
}
</script>
