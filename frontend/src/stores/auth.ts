// src/stores/auth.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
      
export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(localStorage.getItem('token'))

  const isLoggedIn = computed(() => !!token.value)

  const login = (newToken: string) => {
    token.value = newToken
    localStorage.setItem('token', newToken)
  }

  const logout = () => {
    token.value = null
    localStorage.removeItem('token')
  }

  return { token, isLoggedIn, login, logout }
})
