import httpClient from "@/helpers/http-client";
import { Module } from "vuex";
import { LaravelPaginationResponse, PaginateableState, RootState } from '../types';
import { JobApplicationState, JobApplicationStatus } from "./types";

const state: PaginateableState<JobApplicationState[]> = {
  loading: false,
  pagination: undefined,
  value: [
    // { title: 'bla bla', message: 'bla bla', type: 'error' }
  ]
};

export const JobApplicationsModule: Module<PaginateableState<JobApplicationState[]>, RootState> = {
  namespaced: true,
  state,
  mutations: {
    setLoading(state, value: boolean) {
      state.loading = value;
    },
    setPagination(state, value: LaravelPaginationResponse) {
      state.pagination = value;
    },
    set(state, applications: JobApplicationState[]) {
      state.value = applications;
    },
    add(state, application: JobApplicationState) {
      if (!state.value) return;
      const listJob = state.value.find(i => i.id === application.id);
      if (listJob) {
        state.value.splice(state.value.indexOf(listJob), 1, application);
        return;
      }
      state.value.unshift(application);
    },
    update(state, application: JobApplicationState) {
      if (!state.value) return;
      const listItem = state.value.find(i => i.id === application.id);
      if (!listItem) return;
      state.value.splice(state.value.indexOf(listItem), 1, Object.assign(listItem, application));
    },
    remove(state, id: number) {
      state.value = state.value?.filter((application) => application.id !== id);
    }
  },
  actions: {
    async fetch({ commit, getters }, payload: { jobId: number, page: number }) {
      const loading: boolean = getters.loading;
      if (loading === true) return;
      commit('setLoading', true);
      const response = await httpClient.get<LaravelPaginationResponse<JobApplicationState[]>>(
        `employer/jobs/${payload.jobId}/applications`,
        { params: { page: payload.page ?? 1 } }
      )
      const pagination = response.data;
      commit('set', pagination.data);
      commit('setPagination', { ...pagination, data: undefined });
      commit('setLoading', false);
    },
    async status({ commit }, payload: { jobId: number, applicationId: number, status: JobApplicationStatus }) {
      const response = await httpClient.put<JobApplicationState>(
        `employer/jobs/${payload.jobId}/applications/${payload.applicationId}`,
        { status: payload.status }
      )
      const application = response.data;
      commit('update', application);
      return application;
    },
  },
  getters: {
    loading(state) {
      return state.loading;
    },
    pagination(state) {
      return state.pagination;
    },
    all(state) {
      return state.value;
    },
    find(state) {
      return (id: number) => {
        return state.value?.find(application => application.id === id);
      }
    },
  }
}