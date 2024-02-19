import { CREATE_TICKET, DELETE_TICKET_URL, MY_TICKETS_URL, TICKETS_BY_EVENT_DATE_URL, TICKETS_BY_EVENT_URL, TICKET_BY_ID, UPDATE_TICKET_PRICE_URL } from "../utils/constants";
import httpClient from "./config/httpClient";

export async function getTicketsByEventId(eventId: any, orderBy: string, order: string): Promise<any>{
    return httpClient.get(TICKETS_BY_EVENT_URL + "/" + eventId, { params: { orderBy: orderBy, order: order } });   
}

export async function getTicketById(ticketId: any): Promise<any>{
    return httpClient.get(TICKET_BY_ID + "/" + ticketId);
}

export async function createTicket(payload: any): Promise<any>{
    return httpClient.post(CREATE_TICKET, payload);
}

export async function getTicketsByEventDateId(eventDateId: any, orderBy: string, order: string): Promise<any>{
    return httpClient.get(TICKETS_BY_EVENT_DATE_URL + "/" + eventDateId, { params: { orderBy: orderBy, order: order } });   
}

export async function getMySoldTickets(): Promise<any>{
    return httpClient.get(MY_TICKETS_URL);   
}

export async function updateTicketPrice(ticketId: string, payload: any): Promise<any>{
    return httpClient.put(UPDATE_TICKET_PRICE_URL.replace(":ticketId", ticketId), payload);   
}

export async function deleteTicket(ticketId: string): Promise<any>{
    return httpClient.delete(DELETE_TICKET_URL + "/" + ticketId);   
}