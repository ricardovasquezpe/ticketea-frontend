import { User } from "./user.model";
import { Zone } from "./zone.model";

export class Ticket {
    public encId: string;
    public price: number;
    public seat: string;
    public zone: Zone;
    public userSellerIdEnc: string;
    public userSeller?: User;
    public eventIdEnc: string;

    constructor(encId: string, price: number, seat:string, zone: Zone, userSellerIdEnc: string, userSeller: User, eventIdEnc: string){
        this.encId = encId;
        this.price = price;
        this.seat = seat;
        this.zone = zone;
        this.userSellerIdEnc = userSellerIdEnc;
        this.userSeller = userSeller;
        this.eventIdEnc = eventIdEnc;
    }
}