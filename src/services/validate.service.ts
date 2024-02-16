import { SEND_VALIDATION_MY_EMAIL, SEND_VALIDATION_MY_PHONE, VALIDATE_MY_EMAIL, VALIDATE_MY_PERSONAL_DOCUMENT, VALIDATE_MY_PHONE } from "../utils/constants";
import httpClient from "./config/httpClient";

export async function sendMyPhoneValidation(payload: any): Promise<any>{
    return httpClient.post(SEND_VALIDATION_MY_PHONE, payload);   
}

export async function validateMyPhone(payload: any): Promise<any>{
    return httpClient.put(VALIDATE_MY_PHONE, payload);   
}

export async function sendMyEmailValidation(payload: any): Promise<any>{
    return httpClient.post(SEND_VALIDATION_MY_EMAIL, payload);   
}

export async function validateMyEmail(payload: any): Promise<any>{
    return httpClient.put(VALIDATE_MY_EMAIL, payload);   
}

export async function validateMyPersonalDocument(payload: any): Promise<any>{
    return httpClient.put(VALIDATE_MY_PERSONAL_DOCUMENT, payload);   
}