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
import { getEventById, getTicketDetailById } from "../../services/event.service";
import { PAYMENT_METHOD_BANK_ACCOUNT } from "../../utils/constants";

export const Checkout = () => {
    const navigate = useNavigate();
    const [event, setEvent] = useState({} as any);
    const [ticket, setTicket] = useState({} as any);
    const [_, setPaymentMethod] = useState(PAYMENT_METHOD_BANK_ACCOUNT);
    const { eventId, ticketId } = useParams();

    useEffect(() => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
        getEventDetail();
        getTicketDetail();
    }, []);

    const getEventDetail = () => {
        getEventById(eventId).then((res: any) => {
            setEvent(res);
        });
    }

    const getTicketDetail = () => {
        getTicketDetailById(eventId, ticketId).then((res: any) => {
            setTicket(res);
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
                    <EventTicketCard eventImage={event.eventImage}
                                    eventName={event.eventName}
                                    artistName={event.artistName}
                                    eventDate={event.eventDate}
                                    ratingNumber={ticket.rating}
                                    sellerImage={ticket.sellerImage}
                                    sellerName={ticket.sellerName}
                                    ticketPrice={ticket.ticketPrice}
                                    ticketZone={ticket.zoneName}
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