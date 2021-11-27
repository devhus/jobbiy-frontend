import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import NotfoundPage from '../views/NotFoundPage.vue';
import account from './account';
import auth from './auth';
import commercial from './commercial';
import jobs from './jobs';

const routes: Array<RouteRecordRaw> = [
  ...commercial,
  ...auth,
  ...account,
  ...jobs,
  { path: "/:catchAll(.*)", component: NotfoundPage }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
