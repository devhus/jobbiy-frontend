import { RouteRecordRaw } from 'vue-router';
import Home from '../views/Commercial/Home.vue';
import CommonLayout from '../views/CommonLayout.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: CommonLayout,
    children: [
      {
        path: '/',
        name: 'Home',
        component: Home,
      },
      {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/Commercial/About.vue')
      },
    ]
  },
];

export default routes;