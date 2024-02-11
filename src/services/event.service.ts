import { EVENTS_SEARCH_URL } from "../utils/constants";
import httpClient from "./config/httpClient";
import { Event } from "./models/event.model";

const events = [{
    id: 1,
    eventName: "World Hottest Tour",
    artistName: "Bad Bunny",
    ticketsNumber: 7,
    eventDate: "19 Feb. 2024 - 05:00 PM",
    eventPlace: "Jockey club",
    eventImage: "https://cdn.teleticket.com.pe/especiales/badbunny2022-fecha2/images/ICS012_rs.jpg",
    tickets: [
        {
            id: 1,
            zoneName: "Zona Premium",
            ticketPrice: 200,
            rating: 5,
            sellerImage: "https://bit.ly/dan-abramov",
            sellerName: "Carlos Alberto",
            seat: "45D"
        },
        {
            id: 2,
            zoneName: "Zona Platinium",
            ticketPrice: 100,
            rating: 0,
            sellerImage: "https://bit.ly/kent-c-dodds",
            sellerName: "Carlos Alberto",
            seat: "45D"
        },
        {
            id: 3,
            zoneName: "Zona Platinium",
            ticketPrice: 150,
            rating: 4,
            sellerImage: "https://bit.ly/ryan-florence",
            sellerName: "Carlos Alberto",
            seat: "45D"
        },
        {
            id: 3,
            zoneName: "Zona Platinium",
            ticketPrice: 350,
            rating: 4,
            sellerImage: "https://bit.ly/prosper-baba",
            sellerName: "Carlos Alberto",
            seat: "45D"
        },
        {
            id: 4,
            zoneName: "Zona Base",
            ticketPrice: 50,
            rating: 5,
            sellerImage: "https://bit.ly/code-beast",
            sellerName: "Carlos Alberto",
            seat: "45D"
        },
        {
            id: 4,
            zoneName: "Zona Gold",
            ticketPrice: 500,
            rating: 5,
            sellerImage: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            sellerName: "Carlos Alberto",
            seat: "45D"
        },
        {
            id: 4,
            zoneName: "Zona Gold",
            ticketPrice: 500,
            rating: 5,
            sellerImage: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            sellerName: "Carlos Alberto",
            seat: "45D"
        }
    ]
},
{
    id: 2,
    eventName: "Libido - La Reunión",
    artistName: "Libido",
    ticketsNumber: 0,
    eventDate: "19 Feb. 2024 - 05:00 PM",
    eventPlace: "Jockey club",
    eventImage: "https://cdn.teleticket.com.pe/images/eventos/gro009_calugalistado.jpg",
    tickets: []
},
{
    id: 3,
    eventName: "Martin Garrix en Lima",
    artistName: "Martin Garrix",
    ticketsNumber: 2,
    eventDate: "19 Feb. 2024 - 05:00 PM",
    eventPlace: "Jockey club",
    eventImage: "https://cdn.teleticket.com.pe/images/eventos/vts001_calugalistado.jpg",
    tickets: [
        {
            id: 1,
            zoneName: "Zona Electro",
            ticketPrice: 300,
            rating: 5,
            sellerImage: "https://bit.ly/dan-abramov",
            sellerName: "Carlos Alberto",
            seat: ""
        },
        {
            id: 2,
            zoneName: "Zona Meet and Greet",
            ticketPrice: 600,
            rating: 4.5,
            sellerImage: "https://bit.ly/kent-c-dodds",
            sellerName: "Carlos Alberto",
            seat: ""
        }
    ]
},
{
    id: 4,
    eventName: "Ultra Peru 2024",
    artistName: "Ultra",
    ticketsNumber: 0,
    eventDate: "19 Feb. 2024 - 05:00 PM",
    eventPlace: "Jockey club",
    eventImage: "https://cdn.teleticket.com.pe/images/eventos/vas019_calugalistado.jpg",
    tickets: []
},
{
    id: 5,
    eventName: "Luis Miguel en Lima",
    artistName: "Luis Miguel",
    ticketsNumber: 1,
    eventDate: "19 Feb. 2024 - 05:00 PM",
    eventPlace: "Jockey club",
    eventImage: "https://cdn.teleticket.com.pe/images/eventos/gro001_calugalistado.jpg",
    tickets: [{
        id: 1,
        zoneName: "Zona Lluvia",
        ticketPrice: 650,
        rating: 5,
        sellerImage: "https://bit.ly/kent-c-dodds",
        sellerName: "Carlos Alberto",
        seat: "15-C"
    }]
}];

export function searchEvents(searchText: string, orderBy: string, order: string): Promise<any[]>{
    return httpClient.get(EVENTS_SEARCH_URL, { params: { title: searchText, orderBy: orderBy, order: order } });    
}

export function getEventByText(searchText:string) {
    return events.filter(obj => obj.eventName.toLowerCase().includes(searchText.toLowerCase()) || obj.artistName.toLowerCase().includes(searchText.toLowerCase()))
}

export async function getTicketsByEventId(eventId: any): Promise<any>{
    return events.find(obj => obj.id == eventId)?.tickets;
}

export async function getEventDetailById(eventId: any): Promise<any>{
    return events.find(obj => obj.id == eventId);
}

export async function getTicketDetailById(eventId: any, ticketId: any): Promise<any>{
    return events.find(obj => obj.id == eventId)?.tickets.find(obj => obj.id == ticketId);
}