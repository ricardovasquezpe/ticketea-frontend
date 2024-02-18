import { EVENTS_AVAILABLE_URL, EVENTS_SEARCH_URL, EVENT_BY_EVENT_DATE_ID, EVENT_BY_ID } from "../utils/constants";
import httpClient from "./config/httpClient";

export function searchEvents(searchText: string, orderBy: string, order: string): Promise<any[]>{
    return httpClient.get(EVENTS_SEARCH_URL, { params: { title: searchText, orderBy: orderBy, order: order } });    
}

export async function getEventById(eventId: any): Promise<any>{
    return httpClient.get(EVENT_BY_ID + "/" + eventId);
}

export async function getEventsAvailable(): Promise<any>{
    return httpClient.get(EVENTS_AVAILABLE_URL);
}

export async function getEventByEventDateId(eventDateId: any): Promise<any>{
    return httpClient.get(EVENT_BY_EVENT_DATE_ID + "/" + eventDateId);
}