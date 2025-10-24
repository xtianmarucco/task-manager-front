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
          <div class="input-group">
            <input
              :type="showPassword ? 'text' : 'password'"
              id="password"
              class="form-control"
              v-model="password"
              :class="{ 'is-invalid': touched.password && errors.password }"
              @blur="validatePassword()"
              @input="validatePassword(false)"
            />
            <button
              type="button"
              class="btn btn-outline-secondary"
              @click="togglePasswordVisibility"
              :aria-label="showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'"
            >
              <svg
                v-if="showPassword"
                width="1.25em"
                height="1.25em"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="3"
                  stroke="currentColor"
                  stroke-width="1.5"
                />
                <circle cx="12" cy="12" r="1.5" fill="currentColor" />
              </svg>
              <svg
                v-else
                width="1.25em"
                height="1.25em"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M3 3 21 21"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
                <path
                  d="M6.5 6.842c-2.333 1.73-3.95 4.158-4.5 5.158 0 0 4 7 10 7 2.333 0 4.336-.877 6-2.023M14.538 14.577A3.5 3.5 0 0 1 9.423 9.462"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M11.8 6.04A9.744 9.744 0 0 1 12 5c6 0 10 7 10 7a22.815 22.815 0 0 1-2.815 3.61"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
              </svg>
            </button>
          </div>
          <div v-if="touched.password && errors.password" class="invalid-feedback d-block">
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

<script setup>
import { reactive, ref } from 'vue'

defineOptions({ name: 'LoginForm' })

// Reactive form fields plus validation helpers to mirror the old Options API logic.
const email = ref('')
const password = ref('')
const remember = ref(false)
const showPassword = ref(false)

const errors = reactive({
  email: '',
  password: '',
})

const touched = reactive({
  email: false,
  password: false,
})

// Validation helpers toggle errores según reglas simples de email/password.
const validateEmail = (setTouched = true) => {
  if (setTouched) touched.email = true

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!email.value) {
    errors.email = 'El email es obligatorio.'
  } else if (!emailRegex.test(email.value)) {
    errors.email = 'El formato del email no es válido.'
  } else {
    errors.email = ''
  }
}

const validatePassword = (setTouched = true) => {
  if (setTouched) touched.password = true

  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
  if (!password.value) {
    errors.password = 'La contraseña es obligatoria.'
  } else if (!passwordRegex.test(password.value)) {
    errors.password = 'Mínimo 8 caracteres, al menos una letra y un número.'
  } else {
    errors.password = ''
  }
}

const handleSubmit = () => {
  validateEmail()
  validatePassword()

  if (!errors.email && !errors.password) {
    console.log('Email:', email.value)
    console.log('Password:', password.value)
    console.log('Remember:', remember.value)
    // Aquí se puede enviar a backend
  }
}

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}
</script>
<style scoped>
.card {
  border-radius: 1rem;
}
</style>
