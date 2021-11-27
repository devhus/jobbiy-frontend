export type AlertState = {
  id?: string,
  title: string,
  message?: string,
  displaySeconds?: number,
  displayForever?: boolean,
  type?: AlertStateType,
}
export type AlertStateType = 'error' | 'success' | 'warning' | 'info';
export default AlertState;