<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const auth = useAuthStore()

const logout = () => {
  auth.logout()
  router.push('/login')
}

</script>

<template>
  <header class="header">
    <div class="container">
      <h1 class="logo">MyBlog</h1>

       <nav>
        <RouterLink to="/" v-if="auth.isLoggedIn">Home</RouterLink>
        <RouterLink to="/blogs" v-if="auth.isLoggedIn">Blogs</RouterLink>
        <a href="#" v-if="auth.isLoggedIn" @click.prevent="logout">Logout</a>

        <RouterLink to="/register" v-if="!auth.isLoggedIn">Register</RouterLink>
        <RouterLink to="/login" v-if="!auth.isLoggedIn">Login</RouterLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.header {
  border-bottom: 1px solid #eee;
  background-color: #097095;
  color: white;
}

.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 1rem;

  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.4rem;
  font-weight: 600;
}

nav a {
  margin-left: 1.5rem;
  text-decoration: none;
  color: #333;
}

nav a.router-link-active {
  font-weight: 600;
}
</style>
