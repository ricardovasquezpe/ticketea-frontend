import { Artist } from "./artist.model";
import { Event } from "./event.model";

export class EventDate {
    public encId: string;
    public date: number;
    public event:Event;

    constructor(encId: string, date: number, event:Event){
        this.encId = encId;
        this.date = date;
        this.event = event;
    }
}