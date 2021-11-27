import AlertState from "./alerts/types";
import UserState from "./user/types";

export interface RootState {
  alerts?: {
    value: AlertState[]
  },
  user?: {
    loading: boolean,
    value: UserState
  },
  //alerts: Alert[],
}

export type LaravelPaginationResponse<T = any> = {
  current_page: number;
  data?: T,
  first_page_url: string,
  from: number,
  last_page: number,
  last_page_url: string,
  links: {
    url?: string | null,
    label: string,
    active: boolean
  }[],
  next_page_url?: string | null,
  path: string,
  per_page: number,
  prev_page_url?: string | null,
  to: number,
  total: number,
}


export type LoadableState<T> = {
  loading: boolean,
  value?: T
}

export type PaginateableState<T> = LoadableState<T> & {
  pagination?: LaravelPaginationResponse<T>,
}

export type StoreState<T> = {
  value: T
}

export type StringDate = string;