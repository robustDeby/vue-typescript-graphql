import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import BlogList from '../pages/BlogList.vue'
import BlogDetail from '../pages/BlogDetail.vue'
import Register from '../pages/Register.vue'
import Login from '@/pages/Login.vue'
import { hasValidLocalToken } from '@/auth/session'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home ,    meta: { public: true }},
    { path: '/register', component: Register,    meta: { public: true } },
    { path: '/login', component: Login,    meta: { public: true } },
    { path: '/blogs', component: BlogList },
    { path: '/blogs/:id', component: BlogDetail, props: true },
  ],
})

router.beforeEach((to) => {
  if (to.meta.public) return true

  if (!hasValidLocalToken()) {
    return '/login'
  }
})

