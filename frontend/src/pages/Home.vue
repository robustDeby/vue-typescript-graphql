<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goToBlogs = () => {
  router.push('/blogs')
}
</script>

<template>
  <div class="home">
    <h1>Welcome to the Blog App</h1>

    <p>
      This is a simple blog application built with
      <strong>Vue 3</strong>, <strong>TypeScript</strong>, and
      <strong>GraphQL</strong>.
    </p>

    <button @click="goToBlogs">
      View Blogs
    </button>
  </div>
</template>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  text-align: center;
  padding: 2rem;
}

h1 {
  margin-bottom: 1rem;
}

p {
  max-width: 600px;
  margin-bottom: 2rem;
  color: #555;
}

button {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
}
</style>
