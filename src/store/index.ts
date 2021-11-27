import { InjectionKey } from 'vue';
import { createStore, Store, useStore as baseUseStore } from 'vuex';
import { AlertsModule } from './alerts/index';
import { JobApplicationsModule } from './job-applications/index';
import { JobsModule } from './jobs/index';
import { RootState } from './types';
import { UserModule } from './user/index';


// define injection key
export const rootStoreKey: InjectionKey<Store<RootState>> = Symbol()

export const store = createStore<RootState>({
  modules: {
    alerts: AlertsModule,
    user: UserModule,
    jobs: JobsModule,
    applications: JobApplicationsModule
  }
})

// define your own `useStore` composition function
export function useRootStore() {
  return baseUseStore(rootStoreKey)
}


export default store
