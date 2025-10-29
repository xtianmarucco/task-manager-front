<template>
  <nav class="navbar navbar-expand-lg bg-light px-4 py-2 shadow-sm">
    <div class="container-fluid">
      <span class="navbar-brand fw-bold">Task Manager</span>

      <div class="d-flex align-items-center">
        <span class="me-3 text-muted small">{{ authStore.userEmail }}</span>
        <button class="btn btn-outline-danger rounded-pill" @click="handleLogout">Logout</button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore' // ← corrige aquí si usás alias '@' o ajusta el path real

const router = useRouter()
const authStore = useAuthStore()

const handleLogout = () => {
  authStore.logout()
  router.push('/')
}
</script>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 1000;
}
</style>
