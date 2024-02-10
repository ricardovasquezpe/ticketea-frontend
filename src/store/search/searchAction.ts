import { CLEAN_SEARCH, SEARCH } from "./searchTypes";

export const onSearch = (data: any) => ({
    type: SEARCH,
    payload: data
});
export const onCleanSearch = () => ({
    type: CLEAN_SEARCH,
});