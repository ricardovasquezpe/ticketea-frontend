
import { USER_BY_ID } from "../utils/constants";
import httpClient from "./config/httpClient";

export async function getUserById(userId: any): Promise<any>{
    return httpClient.get(USER_BY_ID + "/" + userId);   
}