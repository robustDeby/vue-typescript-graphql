<template>
  <div class="auth-page">
    <div class="auth-card">
      <h1>Welcome back</h1>
      <p class="subtitle">Log in to your account</p>

      <form @submit.prevent="handleLogin">
        <div class="field">
          <label>Email</label>
          <input
            v-model="form.email"
            type="email"
            placeholder="you@example.com"
            required
          />
        </div>

        <div class="field">
          <label>Password</label>
          <input
            v-model="form.password"
            type="password"
            placeholder="••••••••"
            required
          />
        </div>

        <p v-if="error" class="error">{{ error }}</p>

        <button :disabled="loading">
          {{ loading ? 'Logging in…' : 'Login' }}
        </button>
      </form>

      <p class="footer">
        Don’t have an account?
        <router-link to="/register">Create one</router-link>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const loading = ref(false)
const error = ref('')

const form = reactive({
  email: '',
  password: ''
})

async function handleLogin() {
  error.value = ''
  loading.value = true

  try {
    const res = await fetch('http://localhost:5000/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          mutation Login($input: LoginInput!) {
            login(input: $input) {
              token
              user {
                id
                name
                email
                avatar
              }
            }
          }
        `,
        variables: {
          input: {
            email: form.email,
            password: form.password
          }
        }
      })
    })

    const json = await res.json()
    if (json.errors) throw new Error(json.errors[0].message)

    localStorage.setItem('token', json.data.login.token)
    router.push('/blogs')
  } catch (e: any) {
    error.value = e.message || 'Login failed'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
/* Page */
.auth-page {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: antiquewhite;
  font-family: system-ui, -apple-system, BlinkMacSystemFont;
}

/* Card */
.auth-card {
  width: 420px;
  background: #fffaf3;
  padding: 36px;
  border-radius: 12px;
  border: 1px solid #e7dccb;
}

/* Headings */
h1 {
  margin: 0;
  font-size: 26px;
  color: #3f3a32;
}

.subtitle {
  margin-bottom: 24px;
  color: #6b6359;
}

/* Form */
.field {
  margin-bottom: 18px;
}

label {
  display: block;
  font-size: 14px;
  margin-bottom: 6px;
  color: #5a544a;
}

input {
  width: 100%;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #d6c9b7;
  background: #ffffff;
  color: #2f2a24;
}

input:focus {
  outline: none;
  border-color: #7a9cc6;
}

/* Button */
button {
  width: 100%;
  margin-top: 10px;
  padding: 12px;
  background: #7a9cc6;
  border: none;
  border-radius: 6px;
  color: white;
  font-weight: 500;
  cursor: pointer;
}

button:hover {
  background: #6b8db8;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Error */
.error {
  margin-top: 8px;
  color: #b45309;
  font-size: 14px;
}

/* Footer */
.footer {
  margin-top: 24px;
  text-align: center;
  color: #6b6359;
}

.footer a {
  color: #7a9cc6;
  text-decoration: none;
}
</style>
