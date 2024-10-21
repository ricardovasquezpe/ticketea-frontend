import { TicketState } from "../../utils/enums/ticketState.enum";
import { EventDate } from "./eventDate.model";
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
    public eventDateIdEnc?: string;
    public eventDate?: EventDate;
    public state: TicketState;
    public comment?: string;

    constructor(encId: string, price: number, seat:string, zone: Zone, userSellerIdEnc: string, userSeller: User, eventIdEnc: string, eventDateIdEnc: string, eventDate: EventDate, state: TicketState, comment: string){
        this.encId = encId;
        this.price = price;
        this.seat = seat;
        this.zone = zone;
        this.userSellerIdEnc = userSellerIdEnc;
        this.userSeller = userSeller;
        this.eventIdEnc = eventIdEnc;
        this.eventDateIdEnc = eventDateIdEnc;
        this.eventDate = eventDate;
        this.state = state;
        this.comment = comment;
    }
}