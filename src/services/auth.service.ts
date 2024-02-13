import { LOGIN_USER_URL, REGISTER_USER_URL } from "../utils/constants";
import httpClient from "./config/httpClient";

export async function registerUser(payload: any): Promise<any>{
    return httpClient.post(REGISTER_USER_URL, payload);   
}

export async function loginUser(payload: any): Promise<any>{
    return httpClient.post(LOGIN_USER_URL, payload);   
}