<!-- src/components/common/LoaderSpinner.vue -->
<template>
  <div class="d-flex flex-column justify-content-center align-items-center text-center py-5">
    <div class="spinner-border text-primary mb-3" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
    <p class="text-muted">Cargando tareas...</p>
  </div>
</template>

<script setup>
// No props or logic needed for now
</script>

<style scoped>
.spinner-border {
  width: 3rem;
  height: 3rem;
}
</style>
