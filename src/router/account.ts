import RouterPass from '@/components/RouterPass.vue';
import { RouteRecordRaw } from 'vue-router';
import AccountLayout from '../views/Account/AccountLayout.vue';
import beforeEnterGuard from './router.guard';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/account',
    component: AccountLayout,
    meta: {
      forAuth: true,
    },
    beforeEnter: beforeEnterGuard,
    children: [
      {
        path: '',
        name: 'Account',
        component: () => import(/* webpackChunkName: "account" */ '../views/Account/Account.vue')
      },
      {
        path: 'company',
        component: RouterPass,
        children: [
          {
            path: 'details',
            name: 'Account.Company',
            component: () => import(/* webpackChunkName: "account.company" */ '../views/Account/Company.vue')
          },
          {
            path: 'jobs',
            name: 'Account.Jobs',
            component: () => import(/* webpackChunkName: "account.jobs" */ '../views/Account/EmployerJobs.vue')
          },
        ]
      },
    ]
  },
];

export default routes;