import { combineReducers } from "redux";
import search from "./search/searchReducer";
import auth from "./auth/authReducer";

export default combineReducers({ search, auth });