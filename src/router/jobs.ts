import { RouteRecordRaw } from 'vue-router';
import JobsLayout from '../views/Jobs/JobsLayout.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/jobs',
    component: JobsLayout,
    children: [
      {
        path: '',
        name: 'Jobs',
        component: () => import(/* webpackChunkName: "jobs" */ '../views/Jobs/Jobs.vue')
      },
      {
        path: ':jobId',
        name: 'JobView',
        component: () => import(/* webpackChunkName: "job-view" */ '../views/Jobs/JobView.vue')
      },
    ]
  },
];

export default routes;