<script setup>
import KanbanCard from '../components/kanban-card/KanbanCard.vue'

const exampleTasks = [
  {
    id: 1,
    title: 'Diseñar landing page',
    description: 'Crear el layout inicial con Figma y validar con el equipo de UX.',
    createdAt: '3 días atrás',
    tag: 'Design',
    status: 'pendiente',
  },
  {
    id: 2,
    title: 'Setup de entorno local',
    description: 'Configurar Docker, Node y base de datos para el proyecto.',
    createdAt: '2 días atrás',
    tag: 'Development',
    status: 'completada',
  },
  {
    id: 3,
    title: 'Revisión de pull requests',
    description: 'Revisar y comentar los últimos PR del equipo de frontend.',
    createdAt: '5 horas atrás',
    tag: 'Code Review',
    status: 'pendiente',
  },
  {
    id: 4,
    title: 'Deploy a staging',
    description: 'Realizar el deploy de la versión 1.2 en entorno de pruebas.',
    createdAt: '1 hora atrás',
    tag: 'DevOps',
    status: 'completada',
  },
  {
    id: 5,
    title: 'Integración con API externa',
    description: 'Conectar con el servicio de terceros y manejar errores.',
    createdAt: '4 días atrás',
    tag: 'Backend',
    status: 'bloqueada',
  },
  {
    id: 6,
    title: 'Redactar documentación',
    description: 'Documentar endpoints y flujos de autenticación.',
    createdAt: '8 horas atrás',
    tag: 'Docs',
    status: 'pendiente',
  },
  {
    id: 7,
    title: 'Test de regresión',
    description: 'Ejecutar test suite completo antes del deploy.',
    createdAt: '30 minutos atrás',
    tag: 'QA',
    status: 'bloqueada',
  },
  {
    id: 8,
    title: 'Actualizar dependencias',
    description: 'Actualizar todas las librerías a sus últimas versiones seguras.',
    createdAt: 'Ayer',
    tag: 'Maintenance',
    status: 'completada',
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
    </div>

    <div class="task-grid">
      <KanbanCard
        v-for="task in exampleTasks"
        :key="task.id"
        :title="task.title"
        :description="task.description"
        :created-at="task.createdAt"
        :tag="task.tag"
        :status="task.status"
      />
    </div>
  </div>
</template>

<style scoped>
.task-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
  gap: 10px;
  min-height: 80vh;
}
</style>
