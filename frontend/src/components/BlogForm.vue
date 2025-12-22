<script setup lang="ts">
import { ref } from 'vue'
import { graphqlClient } from '@/graphql/client'
import { ADD_BLOG } from '@/graphql/operations'

const title = ref('')
const content = ref('')

const emit = defineEmits<{
  (e: 'created'): void
}>()

const submit = async () => {
  const result = await graphqlClient.request(ADD_BLOG, {
    title: title.value,
    content: content.value,
  })

  console.log('Created blog:', result.addBlog)

  title.value = ''
  content.value = ''
  emit('created')
}
</script>


<template>
  <form class="form" @submit.prevent="submit">
    <h2>Create New Blog</h2>

    <div class="field">
      <label for="title">Title</label>
      <input
        id="title"
        v-model="title"
        type="text"
        placeholder="Enter blog title"
        required
      />
    </div>

    <div class="field">
      <label for="content">Content</label>
      <textarea
        id="content"
        v-model="content"
        placeholder="Write your blog content..."
        rows="6"
        required
      />
    </div>

    <!-- Button container -->
    <div class="actions">
      <button type="submit">Create Blog</button>
    </div>
  </form>
</template>

<style scoped>
.form {
  max-width: 700px;
  margin: 0 auto;
  padding: 2rem;

  display: flex;
  flex-direction: column;
}

h2 {
  margin-bottom: 1.5rem;
}

/* Inputs */
.field {
  margin-bottom: 1.25rem;
}

label {
  display: block;
  margin-bottom: 0.4rem;
  font-weight: 500;
}

input,
textarea {
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  border-radius: 6px;
  border: 1px solid #ccc;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: #666;
}

/* Button area */
.actions {
  margin-top: 2rem;

  display: flex;
  justify-content: center; /* CENTER BUTTON */
}

button {
  padding: 0.75rem 2.5rem;
  font-size: 1rem;
  border-radius: 999px;
  border: none;
  cursor: pointer;

  background-color: #333;
  color: white;
}

button:hover {
  opacity: 0.9;
}
</style>
