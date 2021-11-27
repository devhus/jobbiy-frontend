import { StringDate } from './../types';
export type JobState = {
  id: number,
  title: string,
  location: string,
  description?: string,
  enabled: boolean,
  has_applied: boolean,
  created_at: StringDate,
  update_at: StringDate,
  company_id: number,
  company?: CompanyState
}
export type CompanyState = {
  user_id: number,
  name: string,
  description: string,
  location: string,
  industry: string,
  website: string,
  type: string,
  founded_at: StringDate,
}
export default JobState;