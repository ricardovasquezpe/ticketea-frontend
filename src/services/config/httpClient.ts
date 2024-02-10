import axios from "axios";

const httpClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});
/*errorInterceptor(httpClient);
updateHeaderInterceptor(httpClient);*/

export default httpClient;