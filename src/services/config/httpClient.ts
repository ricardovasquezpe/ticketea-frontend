import axios from "axios";

const httpClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});
/*errorInterceptor(httpClient);
updateHeaderInterceptor(httpClient);*/

export default httpClient;