import Session from "../../utils/session";

const updateHeaderInterceptor = (axiosInstance: any) => {
    axiosInstance.interceptors.request.use((config: any) => {
        if(Session.isLoggedIn()) config.headers["Authorization"] = "Bearer " + Session.getUserToken();
        
        return config;
    },(_: any) => {});
};
export default updateHeaderInterceptor;