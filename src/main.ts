import formRules from '@/helpers/form-validators';
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { createApp } from 'vue';
import VueRecaptcha from "vue3-recaptcha-v2";
import App from './App.vue';
import router from './router';
import store from './store';
import { rootStoreKey } from './store/index';

const app = createApp(App);

formRules.toString();

store.dispatch('user/fetch').finally(() => {
  app
    .use(store, rootStoreKey)
    .use(router)
    .use(VueRecaptcha, {
      siteKey: process.env.VUE_APP_RECAPTCHA_KEY
    })
    .mount('#app')
})

