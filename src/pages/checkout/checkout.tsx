import { Box, VStack } from "@chakra-ui/react";
import { SectionTitle } from "../../components/sectionTitle/sectionTitle";
import { EventTicketCard } from "../../components/eventTicketCard/eventTicketCard";
import { PaymentMethodSection } from "../../components/paymentMethodSection/paymentMethodSection";
import { MyButton } from "../../components/myButton/myButton";
import { useEffect, useState } from "react";
import { ReturnButton } from "../../components/returnButton/returnButton";
import { useModal } from "../../config/modal/use-modal";
import { Modals } from "../../config/modal/modal-config";
import { useNavigate, useParams } from "react-router-dom";
import { getTicketById } from "../../services/event.service";
import { PAYMENT_METHOD_BANK_ACCOUNT } from "../../utils/constants";
import { Ticket } from "../../services/models/ticket.model";
import { Event } from "../../services/models/event.model";

export const Checkout = () => {
    const navigate = useNavigate();
    const [event, setEvent] = useState({} as Event);
    const [ticket, setTicket] = useState({} as Ticket);
    const [_, setPaymentMethod] = useState(PAYMENT_METHOD_BANK_ACCOUNT);
    const { ticketId } = useParams();

    useEffect(() => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
        getTicketDetail();
    }, []);

    const getTicketDetail = () => {
        getTicketById(ticketId).then((res: any) => {
            var ticket:Ticket = res.data;
            setTicket(ticket);
            setEvent(ticket.event);
        });
    }

    const FinishPaymentModal = useModal<any>(Modals.FinishPaymentModal);
    const click = () => {
        FinishPaymentModal.open({
            onSave: () => {
              console.log("OnSave");
            },
            onClose: () => {
              FinishPaymentModal.close();
              navigate("/");
            },
            onCancel: () => {
              console.log("onCancel");
              FinishPaymentModal.close();
            },
          });
    }

    return (
        <>
            <Box padding={{"base": "40px 1.5rem", "sm": "40px 1.5rem", "customMd": "40px 250px", "customLg": "40px 350px", "customXl": "40px 450px"}}>
                <VStack align='stretch' gap={5}>
                    <ReturnButton route="/ticket-detail"></ReturnButton>
                    <SectionTitle title="Ticket"/>
                    <EventTicketCard eventImage={event.image_url}
                                    eventName={event.title}
                                    artistName={(event.artist)?event.artist.name:""}
                                    eventDate={event.date}
                                    ratingNumber={2}
                                    sellerImage={(ticket.userSeller)?ticket.userSeller.profile_photo_url:""}
                                    sellerName={(ticket.userSeller)?ticket.userSeller.fullName:""}
                                    ticketPrice={ticket.price}
                                    ticketZone={(ticket.zone)?ticket.zone.name:""}
                                    seat={ticket.seat}></EventTicketCard>
                    <SectionTitle title="Metodo de pago"/>
                    <PaymentMethodSection onChange={(method)=>{setPaymentMethod(method)}}/>
                    <Box textAlign={"center"}>
                        <MyButton textColor="white" 
                                backgroundColor="secondary.default" 
                                backgroundColorHover="secondary.dark" 
                                title={"Compra tu entrada ahora!"}
                                fontSize="18px"
                                padding="14px"
                                onClick={click}></MyButton>
                    </Box>
                </VStack>
            </Box>
        </>
    );
};