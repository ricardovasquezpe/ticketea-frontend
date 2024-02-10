import { Box, Center, HStack, Image, Text, VStack } from "@chakra-ui/react";
import styles from "./listTickets.module.css";
import { SectionTitle } from "../../components/sectionTitle/sectionTitle";
import { OrderByMenu } from "../../components/orderByMenu/orderByMenu";
import { TicketCard } from "../../components/ticketCard/ticketCard";
import { ReturnButton } from "../../components/returnButton/returnButton";
import { useEffect, useState } from "react";
import { getEventDetailById, getTicketsByEventId } from "../../services/event.service";
import { useNavigate, useParams } from "react-router-dom";
import { MyButton } from "../../components/myButton/myButton";

export const ListTickets = () => {
    const [tickets, setTickets] = useState([] as any);
    const [event, setEvent] = useState({} as any);
    const { eventId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
        getEventDetail();
        getTickets();
    }, []);

    const getTickets = () => {
        getTicketsByEventId(eventId).then((res:any) =>{
            setTickets(res);
        });
    }
    
    const getEventDetail = () => {
        getEventDetailById(eventId).then((res: any) => {
            setEvent(res);
        });
    }

    return (
        <>
            <Box className={styles.parent}>
                <Box className={styles.background} style={{backgroundImage: "url("+event.eventImage+")"}}></Box>
                <Box paddingBottom={5} paddingTop={5}>
                    <Center>
                        <VStack spacing={3}>
                            <Image className={styles.eventImage} 
                                src={event.eventImage}></Image>
                            <Text fontSize={30} fontFamily={"robotoBold"}>{event.eventName}</Text>
                            <HStack gap={2}>
                                <Text>{event.artistName}</Text>
                                <Text fontWeight={"bold"}>|</Text>
                                <Text>{event.eventDate}</Text>
                                <Text fontWeight={"bold"}>|</Text>
                                <Text>{event.eventPlace}</Text>
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
                                <OrderByMenu text="Ordenar por: Precio"></OrderByMenu>
                            </HStack>
                        </Box>
                        <Box>
                            <VStack align='stretch' spacing={3}>
                                {
                                    tickets.map((ticket: any, index: any) => (
                                        <TicketCard key={index}
                                            eventId={eventId}
                                            ticketId={ticket.id} 
                                            zoneName={ticket.zoneName}
                                            ratingNumber={ticket.rating}
                                            ticketPrice={ticket.ticketPrice}
                                            sellerImage={ticket.sellerImage}
                                            sellerName={ticket.sellerName}
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