<!-- src/components/kanban/KanbanCard.vue -->
<template>
  <div class="bg-white border rounded shadow-sm p-3 position-relative">
    <div class="d-flex justify-content-between align-items-start mb-2">
      <h6 class="mb-0">{{ title }}</h6>
      <button class="btn btn-sm btn-light">
        <i class="bi bi-three-dots-vertical"></i>
      </button>
    </div>

    <p class="text-muted small mb-2" v-if="description">{{ description }}</p>

    <div class="d-flex justify-content-between align-items-center">
      <small class="text-muted"><i class="bi bi-calendar me-1"></i>{{ createdAt }}</small>
      <span class="badge bg-light text-dark border" style="font-size: 0.75rem">{{ tag }}</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  description: String,
  createdAt: String,
  tag: String,
})
</script>
