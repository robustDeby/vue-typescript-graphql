<script setup lang="ts">
import { useQuery } from '@urql/vue'

const query = `
  query {
    hello
  }
`

const { data, fetching, error } = useQuery({
  query,
})
</script>

<template>
  <div>
    <p v-if="fetching">Loading...</p>
    <p v-else-if="error">Error: {{ error.message }}</p>
    <p v-else>{{ data.hello }}</p>
  </div>
</template>
