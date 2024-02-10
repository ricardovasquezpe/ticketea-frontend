import { LOGIN, LOGOUT } from "./authTypes";

export const onLogin = () => ({
  type: LOGIN,
});
export const onLogout = () => ({
  type: LOGOUT,
});