import Session from "../../utils/session";

const errorInterceptor = (axiosInstance: any) => {
    axiosInstance.interceptors.response.use((response: any) => {
        return response;
    },(error: any) => {
        if(error.response.status === 401) {
            Session.clearUserToken();
            window.location.href = '/';
        }
    });
};
export default errorInterceptor;