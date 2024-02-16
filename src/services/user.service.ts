import { MY_USER_DATA_URL, USER_BY_ID } from "../utils/constants";
import httpClient from "./config/httpClient";

export async function getUserById(userId: any): Promise<any>{
    return httpClient.get(USER_BY_ID + "/" + userId);   
}

export async function getMyUserData(){
    return httpClient.get(MY_USER_DATA_URL);
}