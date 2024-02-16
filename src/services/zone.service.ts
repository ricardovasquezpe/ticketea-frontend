import { ZONES_BY_EVENT_URL } from "../utils/constants";
import httpClient from "./config/httpClient";

export async function getZonesByEventId(eventId: any): Promise<any>{
    return httpClient.get(ZONES_BY_EVENT_URL + "/" + eventId);   
}