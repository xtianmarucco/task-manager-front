<script setup>
import LoginForm from '../components/login-form/LoginForm.vue'
</script>

<template>
  <div class="container-fluid min-vh-100 bg-body-tertiary">
    <div class="row g-0 min-vh-100 align-items-stretch">
      <div class="d-none d-lg-flex col-lg-7 align-items-center justify-content-center py-5">
        <img src="/login-img.jpg" alt="Login illustration" class="img-fluid w-75" />
      </div>

      <div class="col-12 col-lg-5 bg-white d-flex align-items-center justify-content-center py-5">
        <div class="w-100 px-4 px-lg-5">
          <LoginForm />
        </div>
      </div>
    </div>
  </div>
</template>
