<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { graphqlFetch } from '../graphql/queries';
import TaskItem from './TaskItem.vue';
import { type Task } from '../types';


const tasks = ref<Task[]>([]);

const loadTasks = async () => {
  const data = await graphqlFetch(`
    query {
      tasks {
        id
        title
        completed
      }
    }
  `);

  tasks.value = data.tasks;
};

onMounted(loadTasks);
</script>

<template>
  <ul>
    <TaskItem
      v-for="task in tasks"
      :key="task.id"
      :task="task"
      @changed="loadTasks"
    />
  </ul>
</template>
