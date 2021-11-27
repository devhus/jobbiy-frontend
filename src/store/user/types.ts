import { CompanyState } from './../jobs/types';
export type UserState = {
  name: string,
  email: string,
  password?: string,
  is_employer?: boolean,
  company?: CompanyState,
}

export type LoginFormData = {
  email: string;
  password: string;
};

export default UserState;