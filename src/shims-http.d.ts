import httpClient from "./helpers/http-client";

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $http: typeof httpClient
    $validate: (data: unknown, rule: unknown) => boolean
  }
}