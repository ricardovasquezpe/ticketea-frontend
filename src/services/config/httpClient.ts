import axios from "axios";
import updateHeaderInterceptor from "./authInterceptor";
import errorInterceptor from "./errorInterceptor";

const httpClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 20000
});
errorInterceptor(httpClient);
updateHeaderInterceptor(httpClient);

export default httpClient;