import { Event } from './event.model';
import { User } from "./user.model";
import { Zone } from "./zone.model";

export class Ticket {
    public encId: string;
    public price: number;
    public seat: string;
    public zone: Zone;
    public userSeller: User;
    public event: Event;

    constructor(encId: string, price: number, seat:string, zone: Zone, userSeller: User, event: Event){
        this.encId = encId;
        this.price = price;
        this.seat = seat;
        this.zone = zone;
        this.userSeller = userSeller;
        this.event = event;
    }
}