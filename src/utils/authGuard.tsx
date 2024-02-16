import { Navigate } from "react-router-dom"
import Session from "./session";

export const AuthGuard = (props: Props) => {
    if (!Session.isLoggedIn()) {
      return <Navigate to="/" replace />;
    }
  
    return props.children;
};

type Props = {
    children?: any
};