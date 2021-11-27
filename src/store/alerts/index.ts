import { uuid } from "@/helpers/utilities";
import { Module } from "vuex";
import store from "../index";
import { RootState, StoreState } from './../types';
import AlertState from "./types";

const state: StoreState<AlertState[]> = {
  value: [
    // { title: 'bla bla', message: 'bla bla', type: 'error' }
  ]
};

export const AlertsModule: Module<StoreState<AlertState[]>, RootState> = {
  namespaced: true,
  state,
  mutations: {
    add(state, alert: AlertState) {
      alert.id = uuid();
      state.value.unshift(alert);
      if (alert.displayForever) return;
      setTimeout(() => {
        store.commit('alerts/remove', alert.id);
      }, (alert.displaySeconds || 3) * 1000);
    },
    remove(state, alert: AlertState | string) {
      state.value = state.value.filter((i) => typeof (alert) === 'string' ? i.id !== alert : alert.id !== alert.id);
    }
  },
  // actions: { ... },
  getters: {
    all(state) {
      return state.value;
    },
  }
}