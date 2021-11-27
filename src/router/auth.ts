import { RouteRecordRaw } from 'vue-router';
import AuthLayout from '../views/Auth/AuthLayout.vue';
import beforeEnterGuard from './router.guard';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/auth',
    component: AuthLayout,
    meta: {
      forNoAuth: true,
    },
    beforeEnter: beforeEnterGuard,
    children: [
      {
        path: 'login',
        name: 'Auth.Login',
        component: () => import(/* webpackChunkName: "auth.login" */ '../views/Auth/Login.vue')
      },
      {
        path: 'register',
        name: 'Auth.Register',
        component: () => import(/* webpackChunkName: "auth.register" */ '../views/Auth/Register.vue')
      },
      {
        path: '',
        redirect: { name: 'Auth.Login' }
      },
    ]
  },
];

export default routes;