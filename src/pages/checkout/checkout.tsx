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
import { getEventByEventDateId, getEventById } from "../../services/event.service";
import { PAYMENT_METHOD_BANK_ACCOUNT } from "../../utils/constants";
import { Ticket } from "../../services/models/ticket.model";
import { Event } from "../../services/models/event.model";
import { getTicketById } from "../../services/ticket.service";
import { User } from "../../services/models/user.model";
import { getUserById } from "../../services/user.service";
import { EventDate } from "../../services/models/eventDate.model";

export const Checkout = () => {
    const navigate = useNavigate();
    const [event, setEvent] = useState({} as EventDate);
    const [ticket, setTicket] = useState({} as Ticket);
    const [user, setUser] = useState({} as User);
    const [_, setPaymentMethod] = useState(PAYMENT_METHOD_BANK_ACCOUNT);
    const { ticketId } = useParams();
    const loadingModal = useModal<any>(Modals.LoadingModal);

    useEffect(() => {
        loadingModal.open({title: "Cargando informacion de pago"});
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
        onLoadData();
    }, []);

    const onLoadData = async() => {
        var ticketRes = await getTicketById(ticketId);
        var ticketObj: Ticket = ticketRes.data;
        setTicket(ticketObj);

        var eventRes:any = await getEventByEventDateId(ticketObj.eventDateIdEnc);
        setEvent(eventRes.data);

        var userRes:any = await getUserById(ticketObj.userSellerIdEnc);
        setUser(userRes.data);

        loadingModal.close();
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
                    <EventTicketCard eventImage={(event.event)?event.event.image_url:""}
                                    eventName={(event.event)?event.event.title:""}
                                    artistName={(event.event)?event.event.artist.name:""}
                                    eventDate={event.date}
                                    ratingNumber={user.avgRating!}
                                    sellerImage={user.profile_photo_url}
                                    sellerName={user.fullName}
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