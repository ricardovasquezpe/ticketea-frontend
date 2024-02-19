export const EVENTS_SEARCH_URL = "/events/search";
export const TICKETS_BY_EVENT_URL = "/tickets/getByEvent";
export const TICKETS_BY_EVENT_DATE_URL = "/tickets/getByEventDate";
export const EVENT_BY_ID = "/events";
export const EVENT_BY_EVENT_DATE_ID = "/events/getByEventDate";
export const TICKET_BY_ID = "/tickets";
export const USER_BY_ID = "/users";
export const RATING_BY_USER_ID = "/ratings/byUser";
export const LOGIN_USER_URL = "/auth/login";
export const REGISTER_USER_URL = "/auth/register";
export const MY_USER_DATA_URL = "/users/me/details";
export const CHANGE_MY_PHOTO_URL = "/users/me/photo";
export const UPDATE_MY_USER_DATA_URL = "/users/me/details";
export const SEND_VALIDATION_MY_PHONE = "/validate/me/phoneSend";
export const VALIDATE_MY_PHONE = "/validate/me/phoneVerify";
export const SEND_VALIDATION_MY_EMAIL = "/validate/me/emailSend";
export const VALIDATE_MY_EMAIL = "/validate/me/emailVerify";
export const VALIDATE_MY_PERSONAL_DOCUMENT = "/validate/me/personalDocument";
export const EVENTS_AVAILABLE_URL = "/events/getAllAvailable";
export const ZONES_BY_EVENT_URL = "/zones/getByEvent";
export const CREATE_TICKET = "/tickets";
export const MY_TICKETS_URL = "/tickets/users/me";

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
    content: "Cuando estes listo, podras ir a comprar la entrada",
    title: "Vamos a comprar!",
    target: "#buy",
    order: "",
    group: ""
}];