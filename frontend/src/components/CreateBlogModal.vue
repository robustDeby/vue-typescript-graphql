<script setup lang="ts">
import { ref } from 'vue'
import { graphqlClient } from '@/graphql/client'
import { ADD_BLOG } from '@/graphql/operations'

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'created'): void
}>()

const title = ref('')
const content = ref('')
const loading = ref(false)

const submit = async () => {
  if (!title.value.trim() || !content.value.trim()) return

  loading.value = true

  await graphqlClient.request(ADD_BLOG, {
    title: title.value,
    content: content.value,
  })

  loading.value = false
  title.value = ''
  content.value = ''

  emit('created')
  emit('close')
}
</script>

<template>
  <!-- Backdrop -->
  <div class="backdrop" @click.self="emit('close')">
    <!-- Modal -->
    <div class="modal">
      <h2>Create new blog</h2>

      <input
        v-model="title"
        placeholder="Blog title"
      />

      <textarea
        v-model="content"
        placeholder="Write your content..."
      />

      <div class="actions">
        <button class="cancel" @click="emit('close')">
          Cancel
        </button>
        <button class="submit" :disabled="loading" @click="submit">
          {{ loading ? 'Creating...' : 'Create' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.backdrop {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  width: 100%;
  max-width: 500px;
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.25);
}

.modal h2 {
  margin-bottom: 1rem;
  color: #0f172a;
}

input,
textarea {
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border-radius: 10px;
  border: 1px solid #cbd5e1;
}

textarea {
  min-height: 120px;
  resize: vertical;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: #2563eb;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
}

.cancel {
  background: transparent;
  border: none;
  color: #64748b;
  cursor: pointer;
}

.submit {
  background: #2563eb;
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 10px;
  cursor: pointer;
}

.submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
