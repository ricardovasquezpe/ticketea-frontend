import { Zone } from "./zone.model";

export class Ticket {
    public encId: string;
    public price: number;
    public seat: string;
    public zone: Zone;
    public userSellerIdEnc: string;
    public eventIdEnc: string;

    constructor(encId: string, price: number, seat:string, zone: Zone, userSellerIdEnc: string, eventIdEnc: string){
        this.encId = encId;
        this.price = price;
        this.seat = seat;
        this.zone = zone;
        this.userSellerIdEnc = userSellerIdEnc;
        this.eventIdEnc = eventIdEnc;
    }
}