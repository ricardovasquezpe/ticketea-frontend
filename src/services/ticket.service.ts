import { TICKETS_BY_EVENT_URL, TICKET_BY_ID } from "../utils/constants";
import httpClient from "./config/httpClient";

export async function getTicketsByEventId(eventId: any, orderBy: string, order: string): Promise<any>{
    return httpClient.get(TICKETS_BY_EVENT_URL + "/" + eventId, { params: { orderBy: orderBy, order: order } });   
}

export async function getTicketById(ticketId: any): Promise<any>{
    return httpClient.get(TICKET_BY_ID + "/" + ticketId);
}