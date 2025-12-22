<script setup lang="ts">
import { ref } from 'vue';
import { graphqlFetch } from '../graphql/queries';

const title = ref('');

const addTask = async () => {
  if (!title.value.trim()) return;

  await graphqlFetch(
    `
      mutation ($title: String!) {
        addTask(title: $title) {
          id
          title
          completed
        }
      }
    `,
    { title: title.value }
  );

  title.value = '';
};
</script>

<template>
  <div>
    <input v-model="title" placeholder="New task" />
    <button @click="addTask">Add</button>
  </div>
</template>
