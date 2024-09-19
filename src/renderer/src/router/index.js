import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import Breweries from '../components/Breweries.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/breweries',
    name: 'breweries',
    component: Breweries,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
