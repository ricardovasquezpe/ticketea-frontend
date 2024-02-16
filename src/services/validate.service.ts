import { SEND_VALIDATION_MY_PHONE, VALIDATE_MY_PHONE } from "../utils/constants";
import httpClient from "./config/httpClient";

export async function sendMyPhoneValidation(payload: any): Promise<any>{
    return httpClient.post(SEND_VALIDATION_MY_PHONE, payload);   
}

export async function validateMyPhone(payload: any): Promise<any>{
    return httpClient.put(VALIDATE_MY_PHONE, payload);   
}