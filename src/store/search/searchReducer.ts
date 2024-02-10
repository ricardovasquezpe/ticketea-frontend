import { CLEAN_SEARCH, SEARCH } from "./searchTypes";

const initialState = { search: "" };
export default function (state = initialState, action: any) {
  const { type, payload } = action;
  switch (type) {
    case SEARCH:
      return {
        search: payload
      };
    case CLEAN_SEARCH:
      return {
        search: ""
      };
    default:
      return state;
  }
}