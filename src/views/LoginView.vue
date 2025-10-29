<script setup>
import LoginForm from '../components/login-form/LoginForm.vue'
import { useAuthStore } from '../stores/AuthStore'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const handleLogin = async ({ email, password }) => {
  try {
    await authStore.login(email, password)
    router.push('/task-list')
  } catch (error) {
    alert('Credenciales inválidas o error de servidor.')
    console.error(error)
  }
}
</script>

<template>
  <div class="container-fluid min-vh-100 bg-body-tertiary">
    <div class="row g-0 min-vh-100 align-items-stretch">
      <div class="d-none d-lg-flex col-lg-7 align-items-center justify-content-center py-5">
        <img src="/login-img.jpg" alt="Login illustration" class="img-fluid w-75" />
      </div>

      <div class="col-12 col-lg-5 bg-white d-flex align-items-center justify-content-center py-5">
        <div class="w-100 px-4 px-lg-5">
          <LoginForm @submit="handleLogin" />
        </div>
      </div>
    </div>
  </div>
</template>
