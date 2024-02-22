import { Box, Center, HStack, Image, Show, Text, VStack } from "@chakra-ui/react";
import styles from "./listTickets.module.css";
import { SectionTitle } from "../../components/sectionTitle/sectionTitle";
import { OrderByMenu } from "../../components/orderByMenu/orderByMenu";
import { TicketCard } from "../../components/ticketCard/ticketCard";
import { ReturnButton } from "../../components/returnButton/returnButton";
import { useEffect, useState } from "react";
import { getEventByEventDateId } from "../../services/event.service";
import { useNavigate, useParams } from "react-router-dom";
import { MyButton } from "../../components/myButton/myButton";
import { ASC_ORDER_BY, DESC_ORDER_BY } from "../../utils/constants";
import { Ticket } from "../../services/models/ticket.model";
import moment from 'moment/min/moment-with-locales';
import { getTicketsByEventDateId } from "../../services/ticket.service";
import { useModal } from "../../config/modal/use-modal";
import { Modals } from "../../config/modal/modal-config";
import Session from "../../utils/session";
import { EventDate } from "../../services/models/eventDate.model";

export const ListTickets = () => {
    const [tickets, setTickets] = useState([] as Ticket[]);
    const [event, setEvent] = useState({} as EventDate);
    const { eventDateId } = useParams();
    const navigate = useNavigate();
    const loadingModal = useModal<any>(Modals.LoadingModal);
    const loginModal = useModal<any>(Modals.LoginModal);

    useEffect(() => {
        loadingModal.open({title: "Cargando los tickets"});
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
        onLoadData();
    }, []);

    const onLoadData = async() => {
        var ticketsRes = await getTicketsByEventDateId(eventDateId, "price", ASC_ORDER_BY);
        setTickets(ticketsRes.data);
        var eventRes = await getEventByEventDateId(eventDateId);
        setEvent(eventRes.data);
        loadingModal.close();
    }

    const orderBy = async (active: boolean) => {
        var res:any = await getTicketsByEventDateId(eventDateId, (active)?"price":"createdAt", (active)?ASC_ORDER_BY:DESC_ORDER_BY);
        setTickets(res.data);
    }

    const onClickSell = () => {
        if(Session.isLoggedIn()){
            navigate("/sell-ticket");
            return;
        }

        loginModal.open({
            onSave: () => {
                loginModal.close();
                navigate("/sell-ticket");
            },
            onClose: () => {
                loginModal.close();
            },
            onCancel: () => {
                loginModal.close();
            },
        });
    }

    return (
        <>
            <Box className={styles.parent}>
                <Box className={styles.background} style={{backgroundImage: "url("+((event.event) ? event.event.image_url : "")+")"}}></Box>
                <Box paddingBottom={5} paddingTop={5}>
                    <Center>
                        <VStack spacing={3}>
                            <Image className={styles.eventImage} 
                                   src={(event.event)?event.event.image_url:""}
                                   fallbackSrc='https://via.placeholder.com/150'></Image>
                            <Text fontSize={30} fontFamily={"robotoBold"}>{(event.event)?event.event.title:""}</Text>
                            <Show below='sm'>
                                <VStack gap={0}>
                                    <Text textAlign={"center"}>{(event.event) ? event.event.artist.name : ""}</Text>
                                    <Text textAlign={"center"}>{moment(event.date * 1000).format("DD MMMM. YYYY h:mm A")}</Text>
                                    <Text textAlign={"center"}>{(event.event)?event.event.place:""}</Text>
                                </VStack>
                            </Show>
                            <Show above='sm'>
                                <HStack gap={2}>
                                    <Text textAlign={"center"}>{(event.event) ? event.event.artist.name : ""}</Text>
                                    <Text fontWeight={"bold"}>|</Text>
                                    <Text textAlign={"center"}>{moment(event.date * 1000).format("DD MMMM. YYYY h:mm A")}</Text>
                                    <Text fontWeight={"bold"}>|</Text>
                                    <Text textAlign={"center"}>{(event.event)?event.event.place:""}</Text>
                                </HStack>
                            </Show>
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
                                <OrderByMenu text="Ordenar por: Precio" 
                                             onChange={(active)=>{orderBy(active)}}
                                             default={true}></OrderByMenu>
                            </HStack>
                        </Box>
                        <Box>
                            <VStack align='stretch' spacing={3}>
                                {
                                    tickets.map((ticket: Ticket, index: any) => (
                                        <TicketCard key={index}
                                            ticketId={ticket.encId} 
                                            zoneName={ticket.zone.name}
                                            ratingNumber={ticket.userSeller!.avgRating!}
                                            ticketPrice={ticket.price}
                                            sellerImage={ticket.userSeller!.profile_photo_url}
                                            sellerName={ticket.userSeller!.name}
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
                                    onClick={onClickSell}></MyButton>
                            </VStack>
                        </Box>
                    </>
                }
            </Box>
        </>
    );
};