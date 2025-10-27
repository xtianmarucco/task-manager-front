<!-- src/components/filters/TaskStatusFilter.vue -->
<template>
  <div class="task-status-filter m-2 p-2">
    <select
      class="form-select"
      v-model="selected"
      @change="$emit('change', selected)"
      style="width: auto"
    >
      <option value="todos">Todos</option>
      <option value="pendiente">Pendiente</option>
      <option value="en progreso">En progreso</option>
      <option value="completada">Completada</option>
    </select>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: String,
})
const emit = defineEmits(['update:modelValue', 'change'])

const selected = ref(props.modelValue || 'todos')

watch(
  () => props.modelValue,
  (newVal) => {
    selected.value = newVal
  },
)

watch(selected, (newVal) => {
  emit('update:modelValue', newVal)
})
</script>

<style scoped>
.task-status-filter {
  display: inline-block;
}
</style>
