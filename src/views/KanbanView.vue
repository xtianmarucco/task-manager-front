// src/views/KanbanView.vue
<script setup>
import KanbanCard from '../components/kanban-CARD/KanbanCard.vue'

const exampleTasks = [
  {
    id: 1,
    title: 'This is first task',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    createdAt: '1 month ago',
    tag: 'Design',
  },
  {
    id: 2,
    title: 'Work on Dashboard Designing',
    description: 'UI updates and layout improvements.',
    createdAt: '39 minutes ago',
    tag: 'Mobile',
  },
]
</script>

<template>
  <div class="p-4">
    <div class="bg-light rounded p-4 mb-4 d-flex justify-content-between align-items-center">
      <div>
        <h4 class="mb-0">Task Manager</h4>
        <small class="text-muted">Dashboard</small>
      </div>
      <!-- <img src="/kanban-header.svg" alt="Decorative" style="height: 50px" /> -->
    </div>

    <div class="row g-3">
      <div class="col-12 col-md-6 col-lg-3" v-for="column in columns" :key="column.id">
        <KanbanCard
          v-for="task in exampleTasks"
          :key="task.id"
          :title="task.title"
          :description="task.description"
          :created-at="task.createdAt"
          :tag="task.tag"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.row {
  min-height: 80vh;
}
</style>
