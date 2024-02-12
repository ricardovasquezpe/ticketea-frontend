import { User } from "./user.model";
import { Zone } from "./zone.model";

export class Ticket {
    public encId: string;
    public price: number;
    public seat: string;
    public zone: Zone;
    public userSeller: User;

    constructor(encId: string, price: number, seat:string, zone: Zone, userSeller: User){
        this.encId = encId;
        this.price = price;
        this.seat = seat;
        this.zone = zone;
        this.userSeller = userSeller;
    }
}