// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import ProjectDetail from '../pages/ProjectDetail.vue'
import LiveProjects from '../pages/LiveProjects.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/project/:id', component: ProjectDetail },
  { path: '/live-projects/:id', component: LiveProjects, name: 'live-project-detail' }
]

export default createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // Always scroll to top
    return { top: 0 }
  }
})
