export const MS_TICKET_URL = "/tickets";
export const MS_USER_URL = "/users";
export const EVENTS_SEARCH_URL = MS_TICKET_URL + "/events/search";
export const TICKETS_BY_EVENT_URL = "/tickets/getByEvent";
export const TICKETS_BY_EVENT_DATE_URL = "/tickets/getByEventDate";
export const EVENT_BY_ID = MS_TICKET_URL + "/events";
export const EVENT_BY_EVENT_DATE_ID = MS_TICKET_URL + "/events/getByEventDate";
export const TICKET_BY_ID = "/tickets";
export const USER_BY_ID = "/users";
export const RATING_BY_USER_ID = MS_TICKET_URL + "/ratings/byUser";
export const LOGIN_USER_URL = MS_USER_URL + "/auth/login";
export const REGISTER_USER_URL = MS_USER_URL + "/auth/register";
export const MY_USER_DATA_URL = "/users/me/details";
export const CHANGE_MY_PHOTO_URL = "/users/me/photo";
export const UPDATE_MY_USER_DATA_URL = "/users/me/details";
export const SEND_VALIDATION_MY_PHONE = MS_USER_URL + "/validate/me/phoneSend";
export const VALIDATE_MY_PHONE = MS_USER_URL + "/validate/me/phoneVerify";
export const SEND_VALIDATION_MY_EMAIL = MS_USER_URL + "/validate/me/emailSend";
export const VALIDATE_MY_EMAIL = MS_USER_URL + "/validate/me/emailVerify";
export const VALIDATE_MY_PERSONAL_DOCUMENT = MS_USER_URL + "/validate/me/personalDocument";
export const EVENTS_AVAILABLE_URL = MS_TICKET_URL + "/events/getAllAvailable";
export const ZONES_BY_EVENT_URL = MS_TICKET_URL + "/zones/getByEvent";
export const CREATE_TICKET = "/tickets";
export const MY_TICKETS_URL = "/tickets/users/me";
export const UPDATE_TICKET_PRICE_URL = "/tickets/:ticketId/updatePrice";
export const DELETE_TICKET_URL = "/tickets";
export const BUY_TICKET = "/tickets/buy";
export const SEND_RESET_PASSWORD_URL = MS_USER_URL + "/auth/sendResetPassword";
export const RESET_PASSWORD_URL = MS_USER_URL + "/auth/resetPassword";
export const SELL_TICKET = "/tickets/sell";
export const REQUEST_TICKET = "/tickets/request";
export const MY_REQUESTS_TICKET = "/tickets/requests/me";
export const RECENTS_TICKETS = "/tickets/recents";

export const PAYMENT_METHOD_BANK_ACCOUNT = "1";
export const PAYMENT_METHOD_CREDIT_CARD = "2";
export const PAYMENT_METHOD_YAPE = "3";
export const PAYMENT_METHOD_PLIN = "4";

export const ASC_ORDER_BY = "ASC";
export const DESC_ORDER_BY = "DESC";

export const TICKET_DETAIL_TOUR_STEPS = [{
    content: "Dando click aqui podrás ver los comentarios de sus compradores",
    title: "Rating del vendedor",
    target: "#mybadge",
    order: "",
    group: ""
},
{
    content: "Validamos todos los datos del usuario con nuestro sistema integrado",
    title: "TicketeaProtect",
    target: "#ticketeaSecure",
    order: "",
    group: ""
},
{
    content: "Te damos algunas recomendaciones para que asegures la entrada a la hora de tu compra",
    title: "Tu seguridad es primero",
    target: "#seguridad",
    order: "",
    group: ""
},
{
    content: "Cuando hayas revisado todo el detalle, podrás ponerte en contacto con el vendedor",
    title: "Vamos a comprar!",
    target: "#contact-seller",
    order: "",
    group: ""
}];