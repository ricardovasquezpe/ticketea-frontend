import { Modals } from "../../config/modal/modal-config";
import { useModal } from "../../config/modal/use-modal";
import Session from "../../utils/session";

const errorInterceptor = (axiosInstance: any) => {
    axiosInstance.interceptors.response.use((response: any) => {
        return response;
    },(error: any) => {
        if(error.response.status === 401) {
            Session.clearUserToken();
            window.location.href = '/';
        } else if(error.response.status != 200 || error.response.status != 201){
            const errorModal = useModal<any>(Modals.ErrorModal);
            errorModal.open({});
        }
    });
};
export default errorInterceptor;