import httpClient from "@/helpers/http-client";
import { Module } from "vuex";
import { AlertState } from './../alerts/types';
import { CompanyState } from './../jobs/types';
import { LoadableState, RootState } from './../types';
import { UserState } from "./types";

export const AUTH_TOKEN_LOCAL_KEY = 'auth_token';

const state: LoadableState<UserState> & {
  loggedIn: boolean
} = {
  loading: false,
  value: undefined,
  loggedIn: false
};

export const UserModule: Module<LoadableState<UserState> & {
  loggedIn: boolean
}, RootState> = {
  namespaced: true,
  state,
  mutations: {
    set(state, user: UserState) {
      state.value = user;
      state.loading = false;
      state.loggedIn = true;
    },
    setCompany(state, company: CompanyState) {
      if (!state.value) return;
      state.value.company = company;
    },
    remove(state) {
      state.value = undefined;
      state.loading = false;
      state.loggedIn = false;
    }
  },
  getters: {
    user(state) {
      return state.value
    },
    loggedIn(state) {
      return state.loggedIn
    }
  },
  actions: {
    async login({ commit }, data: any) {
      const response = await httpClient.post<{ access_token: string, user: UserState }>('/auth/login', data);
      const token = response.data.access_token;
      const user = response.data.user;

      localStorage.setItem(AUTH_TOKEN_LOCAL_KEY, token);
      commit('set', user);
      return user;
    },
    logout({ commit }) {
      localStorage.removeItem(AUTH_TOKEN_LOCAL_KEY);
      commit('remove');
    },
    async update({ commit }, data: any) {
      const response = await httpClient.post<UserState>('/account', data);
      commit('set', response.data);
      return response.data;
    },
    async updateCompany({ commit }, data: any) {
      const response = await httpClient.post<CompanyState>('/employer/company', data);
      commit('setCompany', response.data);
      return response.data;
    },
    async fetch({ commit, dispatch }) {
      const auth_token = localStorage.getItem(AUTH_TOKEN_LOCAL_KEY);
      if (!auth_token) {
        return undefined;
      }
      try {
        const user = await httpClient.get<UserState>('/auth/user')
          .then((response) => {
            const user = response.data;
            commit('set', user);
            return user;
          })
        return user;
      } catch (error) {
        dispatch('logout');
        commit('alerts/add', {
          title: 'You have logged out.',
          type: 'error'
        } as AlertState, {
          root: true
        })
      }
    }
  }
}