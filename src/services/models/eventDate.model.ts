import { Event } from "./event.model";

export class EventDate {
    public encId: string;
    public date: number;
    public event: Event;
    public ticketsCount: number;

    constructor(encId: string, date: number, event:Event, ticketsCount: number){
        this.encId = encId;
        this.date = date;
        this.event = event;
        this.ticketsCount = ticketsCount;
    }
}