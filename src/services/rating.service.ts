import { RATING_BY_USER_ID } from "../utils/constants";
import httpClient from "./config/httpClient";

export async function getRatingsByUserId(userId: any): Promise<any>{
    return httpClient.get(RATING_BY_USER_ID + "/" + userId);   
}