<!-- src/components/filters/TaskTitleFilter.vue -->
<template>
  <div class="task-title-filter">
    <input
      type="text"
      class="form-control"
      :placeholder="placeholder"
      v-model="input"
      @input="$emit('update:modelValue', input)"
    />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: String,
  placeholder: {
    type: String,
    default: 'Buscar por título...',
  },
})

const input = ref(props.modelValue || '')

watch(
  () => props.modelValue,
  (newVal) => {
    input.value = newVal
  },
)
</script>

<style scoped>
.task-title-filter {
  display: inline-block;
  width: 100%;
  max-width: 300px;
}
</style>
