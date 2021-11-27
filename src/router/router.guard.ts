import store from "@/store";
import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import { UserState } from './../store/user/types';

export const beforeEnterGuard = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  const forAuth: boolean = <boolean>to.meta.forAuth ?? false;
  const forNoAuth: boolean = <boolean>to.meta.forNoAuth ?? false;
  const user: UserState = store.getters['user/user'];

  if (forAuth === true && !user) {
    next({ name: 'Auth.Login' });
    return;
  }
  if (forNoAuth === true && user) {
    next({ name: 'Home' });
  }

  next();
}

export default beforeEnterGuard;