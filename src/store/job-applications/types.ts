import { UserState } from './../user/types';

export type JobApplicationState = {
  id: number,
  user_id: number,
  job_id: number,
  status: JobApplicationStatus,
  user?: UserState,
}
export type JobApplicationStatus = 'pending' | 'rejected' | 'accepted';
export default JobApplicationState;