import httpClient from "@/helpers/http-client";
import { Module } from "vuex";
import JobApplicationState from "../job-applications/types";
import { LaravelPaginationResponse, PaginateableState, RootState } from './../types';
import { JobState } from "./types";

const state: PaginateableState<JobState[]> = {
  loading: false,
  pagination: undefined,
  value: [
    // { title: 'bla bla', message: 'bla bla', type: 'error' }
  ]
};

export const JobsModule: Module<PaginateableState<JobState[]>, RootState> = {
  namespaced: true,
  state,
  mutations: {
    setLoading(state, value: boolean) {
      state.loading = value;
    },
    setPagination(state, value: LaravelPaginationResponse) {
      state.pagination = value;
    },
    set(state, jobs: JobState[]) {
      state.value = jobs;
    },
    add(state, job: JobState) {
      if (!state.value) return;
      const listJob = state.value.find(i => i.id === job.id);
      if (listJob) {
        state.value.splice(state.value.indexOf(listJob), 1, job);
        return;
      }
      state.value.unshift(job);
    },
    update(state, job: JobState) {
      if (!state.value) return;
      const listItem = state.value.find(i => i.id === job.id);
      if (!listItem) return;
      state.value.splice(state.value.indexOf(listItem), 1, Object.assign(listItem, job));
    },
    remove(state, id: number) {
      state.value = state.value?.filter((job) => job.id !== id);
    }
  },
  actions: {
    async fetch({ commit, getters }, page: number = 1) {
      const loading: boolean = getters.loading;
      if (loading === true) return;
      commit('setLoading', true);
      const response = await (await httpClient.get<LaravelPaginationResponse<JobState[]>>('jobs', { params: { page } })).data;
      commit('set', response.data);
      commit('setPagination', { ...response, data: undefined });
      commit('setLoading', false);
    },
    async find({ commit }, id: number) {
      const response = await httpClient.get<JobState>(`jobs/${id}`);
      const job = response.data;
      commit('update', job);
      return job;
    },
    async apply({ commit, getters }, id: number) {
      const job: JobState = getters.find(id);
      const response = await httpClient.post<JobApplicationState>(`jobs/${id}/apply`);
      if (job) {
        job.has_applied = true;
        commit('add', job);
      }
      return response.data;
    },

    async employerFetch({ commit, getters }, page: number = 1) {
      const loading: boolean = getters.loading;
      if (loading === true) return;
      commit('setLoading', true);
      const response = await (
        await httpClient.get<LaravelPaginationResponse<JobState[]>>('employer/jobs', { params: { page } })
      ).data;
      commit('set', response.data);
      commit('setPagination', { ...response, data: undefined });
      commit('setLoading', false);
    },
    async create({ commit }, job: JobState) {
      const response = await httpClient.post<JobState>('employer/jobs', job);
      commit('add', response.data);
      return response.data
    },
    async update({ commit }, job: JobState) {
      const response = await httpClient.put<JobState>(`employer/jobs/${job.id}`, job);
      commit('update', response.data);
      return response.data
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
        return state.value?.find(job => job.id === id);
      }
    },
  }
}