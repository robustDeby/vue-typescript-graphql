import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import BlogList from '../pages/BlogList.vue'
import BlogDetail from '../pages/BlogDetail.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/blogs', component: BlogList },
    { path: '/blogs/:id', component: BlogDetail, props: true },
  ],
})
