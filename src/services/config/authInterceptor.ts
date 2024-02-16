import Session from "../../utils/session";

const updateHeaderInterceptor = (axiosInstance: any) => {
    axiosInstance.interceptors.request.use((config: any) => {
        config.headers["Authorization"] = "Bearer " + Session.getUserToken();
        return config;
    },(error: any) => {});
};
export default updateHeaderInterceptor;