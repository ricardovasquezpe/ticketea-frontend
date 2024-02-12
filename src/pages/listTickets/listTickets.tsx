import { Box, Center, HStack, Image, Text, VStack } from "@chakra-ui/react";
import styles from "./listTickets.module.css";
import { SectionTitle } from "../../components/sectionTitle/sectionTitle";
import { OrderByMenu } from "../../components/orderByMenu/orderByMenu";
import { TicketCard } from "../../components/ticketCard/ticketCard";
import { ReturnButton } from "../../components/returnButton/returnButton";
import { useEffect, useState } from "react";
import { getEventById, getTicketsByEventId } from "../../services/event.service";
import { useNavigate, useParams } from "react-router-dom";
import { MyButton } from "../../components/myButton/myButton";
import { ASC_ORDER_BY, DESC_ORDER_BY } from "../../utils/constants";
import { Ticket } from "../../services/models/ticket.model";
import { Event } from "../../services/models/event.model";
import moment from 'moment/min/moment-with-locales';

export const ListTickets = () => {
    const [tickets, setTickets] = useState([] as any);
    const [event, setEvent] = useState({} as Event);
    const [orderByDate, setOrderByDate] = useState(false);
    const { eventId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
        getEventDetail();
        getTickets();
    }, []);

    const getTickets = () => {
        getTicketsByEventId(eventId, "price", (orderByDate)?ASC_ORDER_BY:DESC_ORDER_BY).then((res:any) =>{
            setTickets(res.data);
        });
    }
    
    const getEventDetail = () => {
        getEventById(eventId).then((res: any) => {
            setEvent(res.data);
        });
    }

    const orderBy = (active: boolean) => {
        setOrderByDate(active);
    }


    return (
        <>
            <Box className={styles.parent}>
                <Box className={styles.background} style={{backgroundImage: "url("+event.image_url+")"}}></Box>
                <Box paddingBottom={5} paddingTop={5}>
                    <Center>
                        <VStack spacing={3}>
                            <Image className={styles.eventImage} 
                                src={event.image_url}></Image>
                            <Text fontSize={30} fontFamily={"robotoBold"}>{event.title}</Text>
                            <HStack gap={2}>
                                <Text>{(event.artist) ? event.artist.name : ""}</Text>
                                <Text fontWeight={"bold"}>|</Text>
                                <Text>{moment(event.date * 1000).format("DD MMMM. YYYY h:mm A")}</Text>
                                <Text fontWeight={"bold"}>|</Text>
                                <Text>{event.place}</Text>
                            </HStack>
                        </VStack>
                    </Center>
                </Box>
            </Box>
            <Box padding={{"base": "40px 1.5rem", "sm": "40px 1.5rem", "customMd": "40px 250px", "customLg": "40px 350px", "customXl": "40px 450px"}}>
                {
                    (tickets.length != 0) ? 
                    <>
                        <Box style={{width: "min-content"}}>
                            <ReturnButton route="/"></ReturnButton>
                        </Box>
                        <Box className={styles.containerTitle}>
                            <HStack justify={"space-between"}>
                                <SectionTitle title="Tickets del evento"></SectionTitle>
                                <OrderByMenu text="Ordenar por: Precio" onChange={(active)=>{orderBy(active)}}></OrderByMenu>
                            </HStack>
                        </Box>
                        <Box>
                            <VStack align='stretch' spacing={3}>
                                {
                                    tickets.map((ticket: Ticket, index: any) => (
                                        <TicketCard key={index}
                                            ticketId={ticket.encId} 
                                            zoneName={ticket.zone.name}
                                            ratingNumber={3}
                                            ticketPrice={ticket.price}
                                            sellerImage={ticket.userSeller.profile_photo_url}
                                            sellerName={ticket.userSeller.name}
                                            seat={ticket.seat}></TicketCard>
                                    ))
                                }
                            </VStack>
                        </Box>
                    </> : <>
                        <Box style={{width: "min-content"}}>
                            <ReturnButton route="/"></ReturnButton>
                        </Box>
                        <Box className={styles.containerNoResults}>
                            <VStack gap={6}>
                                <Text className={styles.noResultsTitle}>
                                    Sé el primero en vender una entrada de este evento de manera segura y rápida
                                </Text>
                                <MyButton textColor="white" 
                                    backgroundColor="secondary.default" 
                                    backgroundColorHover="secondary.dark" 
                                    title={"Vende aqui"}
                                    fontSize="18px"
                                    padding="14px"
                                    onClick={()=>{navigate("/sell-ticket")}}></MyButton>
                            </VStack>
                        </Box>
                    </>
                }
            </Box>
        </>
    );
};