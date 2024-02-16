import Session from "../../utils/session";
import { LOGIN, LOGOUT } from "./authTypes";

const initialState = { isLoggedIn: false };
export default function (state = initialState, action: any) {
  const { type } = action;
  switch (type) {
    case LOGIN:
      return {
        ...state,
        isLoggedIn: true,
      };
    case LOGOUT:
      Session.clearUserToken();
      return {
        ...state,
        isLoggedIn: false,
      };
    default:
      return state;
  }
}