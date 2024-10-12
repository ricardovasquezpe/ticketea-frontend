import { Navigate } from "react-router-dom"
import Session from "./session";
import { onLogout } from "../store/auth/authAction";
import { useDispatch } from "react-redux";

export const AuthGuard = (props: Props) => {
    const dispatch = useDispatch();
    if (!Session.isLoggedIn()) {
      dispatch(onLogout());
      return <Navigate to="/" replace />;
    }
  
    return props.children;
};

type Props = {
    children?: any
};