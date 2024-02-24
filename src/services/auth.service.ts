import { LOGIN_USER_URL, REGISTER_USER_URL, RESET_PASSWORD_URL, SEND_RESET_PASSWORD_URL } from "../utils/constants";
import httpClient from "./config/httpClient";

export async function registerUser(payload: any): Promise<any>{
    return httpClient.post(REGISTER_USER_URL, payload);   
}

export async function loginUser(payload: any): Promise<any>{
    return httpClient.post(LOGIN_USER_URL, payload);   
}

export async function sendResetPassword(payload: any): Promise<any>{
    return httpClient.post(SEND_RESET_PASSWORD_URL, payload);   
}

export async function resetPassword(payload: any): Promise<any>{
    return httpClient.post(RESET_PASSWORD_URL, payload);   
}