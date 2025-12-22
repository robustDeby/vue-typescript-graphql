<script setup lang="ts">
import { graphqlFetch } from '../graphql/queries';

const props = defineProps<{
  task: {
    id: string;
    title: string;
    completed: boolean;
  };
}>();

const emit = defineEmits(['changed']);

const toggle = async () => {
  await graphqlFetch(
    `
      mutation ($id: ID!) {
        toggleTask(id: $id) {
          id
        }
      }
    `,
    { id: props.task.id }
  );

  emit('changed');
};

const remove = async () => {
  await graphqlFetch(
    `
      mutation ($id: ID!) {
        deleteTask(id: $id)
      }
    `,
    { id: props.task.id }
  );

  emit('changed');
};
</script>

<template>
  <li>
    <input type="checkbox" :checked="task.completed" @change="toggle" />
    <span :style="{ textDecoration: task.completed ? 'line-through' : 'none' }">
      {{ task.title }}
    </span>
    <button @click="remove">❌</button>
  </li>
</template>
