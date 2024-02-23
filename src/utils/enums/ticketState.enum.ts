export enum TicketState {
    Inactive = 0,
    Active = 1,
    SoldOnHold = 2,
    SoldApproved = 3,
    InactiveTemp = 4,
}

export const TicketStateString = ["Inactivo", "Activo", "En espera", "Vendido", "Temporal"];