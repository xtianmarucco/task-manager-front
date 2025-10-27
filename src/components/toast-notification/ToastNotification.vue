<!-- src/components/common/ToastNotification.vue -->
<template>
  <div
    v-if="isVisible"
    class="toast align-items-center text-white border-0 position-fixed bottom-0 end-0 m-4 show"
    :class="toastTypeClass"
    role="alert"
    aria-live="assertive"
    aria-atomic="true"
  >
    <div class="d-flex">
      <div class="toast-body">{{ message }}</div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" @click="handleClose"></button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed, onBeforeUnmount } from 'vue'

const props = defineProps({
  message: { type: String, required: true },
  type: { type: String, default: 'success' }, // 'success', 'error', 'info'
  duration: { type: Number, default: 3000 },
})

const emit = defineEmits(['hide'])

const isVisible = ref(false)
let timeoutId

const toastTypeClass = computed(() => ({
  'bg-success': props.type === 'success',
  'bg-danger': props.type === 'error',
  'bg-primary': props.type === 'info',
}))

const hideToast = () => {
  isVisible.value = false
  emit('hide')
}

const startTimer = () => {
  clearTimeout(timeoutId)
  isVisible.value = true
  timeoutId = setTimeout(() => {
    hideToast()
  }, props.duration)
}

const handleClose = () => {
  clearTimeout(timeoutId)
  hideToast()
}

watch(
  () => [props.message, props.type],
  () => {
    if (props.message) {
      startTimer()
    }
  },
  { immediate: true },
)

onBeforeUnmount(() => {
  clearTimeout(timeoutId)
})
</script>

<style scoped>
.toast {
  z-index: 1055;
  min-width: 250px;
  max-width: 350px;
  animation: slideInRight 0.3s ease;
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
