import axios from 'axios';
import store from '../store';
import { AlertState } from './../store/alerts/types';

const httpClient = axios.create({
  baseURL: process.env.VUE_APP_API_ENDPOINT,
  headers: {
    "Content-Type": "application/json",
  }
});


const alertError = (title: string, message: string | string[], type = 'error'): void => {
  store.commit('alerts/add', <AlertState>{
    title: title,
    message: !message ? undefined : (typeof (message) !== 'string' ? Object.values(message).join("\n") : message),
    type: type,
    displaySeconds: 3
  });
}

httpClient.interceptors.request.use(function (config) {
  if (process.env['VUE_APP_ENV'] === 'local') {
    console.log('[REQUEST]', config);
  }

  const access_token = localStorage.getItem('auth_token');
  if (access_token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${access_token}`
    }
  }
  return config;
}, function (error) {
  // Do something with request error
  if (error.response?.data) {
    alertError(error.response.data.message, error.response.data.errors)
  }
  return Promise.reject(error.response);
});

// Add a response interceptor
httpClient.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  if (process.env['VUE_APP_ENV'] === 'local') {
    console.log('[RESPONSE]', response);
  }
  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  if (error.response?.data) {
    alertError(error.response.data.message, error.response.data.errors)
  }
  return Promise.reject(error.response);
});

export type ApiResponse = {
  status: 'success' | 'error' | 'info',
  message?: string,
  errors?: string
}
export default httpClient;