<template>
  <div class="d-flex justify-content-center align-items-center vh-100 bg-light">
    <div class="card p-4 shadow-sm" style="max-width: 400px; width: 100%">
      <h3 class="text-center mb-1">Welcome</h3>

      <form @submit.prevent="handleSubmit" novalidate>
        <div class="mb-3">
          <label for="email" class="form-label">Username</label>
          <input
            type="email"
            id="email"
            class="form-control"
            v-model="email"
            :class="{ 'is-invalid': touched.email && errors.email }"
            @blur="validateEmail()"
            @input="validateEmail(false)"
          />
          <div v-if="touched.email && errors.email" class="invalid-feedback">
            {{ errors.email }}
          </div>
        </div>

        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input
            type="password"
            id="password"
            class="form-control"
            v-model="password"
            :class="{ 'is-invalid': touched.password && errors.password }"
            @blur="validatePassword()"
            @input="validatePassword(false)"
          />
          <div v-if="touched.password && errors.password" class="invalid-feedback">
            {{ errors.password }}
          </div>
        </div>

        <div class="d-flex justify-content-between align-items-center mb-3">
          <a href="#" class="text-decoration-none">Forgot Password ?</a>
        </div>

        <button type="submit" class="btn btn-primary w-100">Sign In</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginForm',
  data() {
    return {
      email: '',
      password: '',
      remember: false,
      errors: {
        email: '',
        password: '',
      },
      touched: {
        email: false,
        password: false,
      },
    }
  },
  methods: {
    validateEmail(setTouched = true) {
      if (setTouched) this.touched.email = true
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!this.email) {
        this.errors.email = 'El email es obligatorio.'
      } else if (!emailRegex.test(this.email)) {
        this.errors.email = 'El formato del email no es válido.'
      } else {
        this.errors.email = ''
      }
    },
    validatePassword(setTouched = true) {
      if (setTouched) this.touched.password = true
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
      if (!this.password) {
        this.errors.password = 'La contraseña es obligatoria.'
      } else if (!passwordRegex.test(this.password)) {
        this.errors.password = 'Mínimo 8 caracteres, al menos una letra y un número.'
      } else {
        this.errors.password = ''
      }
    },
    handleSubmit() {
      this.validateEmail()
      this.validatePassword()

      if (!this.errors.email && !this.errors.password) {
        console.log('Email:', this.email)
        console.log('Password:', this.password)
        console.log('Remember:', this.remember)
        // Aquí se puede enviar a backend
      }
    },
  },
}
</script>
<style scoped>
.card {
  border-radius: 1rem;
}
</style>
