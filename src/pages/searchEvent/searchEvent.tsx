import { Box, Center, HStack, Heading, Text, VStack } from "@chakra-ui/react";
import { MyBigInputSearch } from "../../components/myBigInputSearch/myBigInputSearch";
import { SectionTitle } from "../../components/sectionTitle/sectionTitle";
import { EventCard } from "../../components/eventCard/eventCard";
import { OrderByMenu } from "../../components/orderByMenu/orderByMenu";
import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { onSearch } from "../../store/search/searchAction";
import { searchEvents } from "../../services/event.service";
import { useNavigate } from "react-router-dom";
import { ASC_ORDER_BY, DESC_ORDER_BY } from "../../utils/constants";
import { useModal } from "../../config/modal/use-modal";
import { Modals } from "../../config/modal/modal-config";
import { EventDate } from "../../services/models/eventDate.model";
import Utils from "../../utils/utils";
import styles from "./searchEvent.module.css";
import { MySeo } from "../../components/mySeo/mySeo";

export const SearchEvent = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [events, setEvents] = useState([] as EventDate[]);
    const [search, setSearch] = useState("");
    const [orderByDate, setOrderByDate] = useState(false);
    const [timer, setTimer] = useState(null as any);
    const loadingModal = useModal<any>(Modals.LoadingModal);
    const imageNumber = useMemo(() => Utils.generateRandom(3, 8), []);

    useEffect(() => {
        loadingModal.open({title: "Cargando los eventos"});
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
        //var searchText = store.getState().search.search;
        //setSearch(searchText);
        onLoadData();
    }, []);

    const onLoadData = async () => {
        var res:any = await searchEvents("", "date", ASC_ORDER_BY)
        setEvents(res.data);
        loadingModal.close();
    }

    const inputChanged = (text: any) => {
        text = String(text).trim();
        
        setSearch(text);
        clearTimeout(timer);

        const newTimer = setTimeout(async() => {
            dispatch(onSearch(text));
            searchEvents(text, "date", (orderByDate) ? ASC_ORDER_BY : DESC_ORDER_BY).then((res:any) => {
                setEvents(res.data);
            })
        }, 500);

        setTimer(newTimer);
    }

    const orderBy = (active: boolean) => {
        setOrderByDate(active);
        searchEvents(search, "date", (active) ? ASC_ORDER_BY : DESC_ORDER_BY).then((res:any) => {
            setEvents(res.data);
        })
    }

    return (
        <>
            <MySeo title="Ticketea! Compra y vende entradas de manera segura"
                   description="Compra la entrada al evento que quieres asistir de manera segura con nuestros vendedores verificados rapido y facil"
                   link="https://ticketea.me/"
                   image="/images/logo.png"></MySeo>
            <Box className={styles.parent}>
                <Box className={styles.background} style={{backgroundImage: "url(/images/party-banner-"+imageNumber+".jpg)"}}></Box>
                <Box paddingBottom={"120px"} paddingTop={"100px"} paddingLeft={"15px"} paddingRight={"15px"}>
                    <Center textAlign={"center"}>
                        <VStack>
                            <Heading as='h1' size='4xl' noOfLines={1} fontSize={"30px"} fontFamily={"montserratBold"} textShadow={"2px 3px 5px rgba(0,0,0,0.5)"}>
                                La forma más segura de vender y comprar entradas
                            </Heading>
                            <Text fontSize={"20px"} fontFamily={"montserratBold"} textShadow={"2px 3px 5px rgba(0,0,0,0.5)"}>Compra y vende sin preocuparte de las estafas</Text>
                        </VStack>
                    </Center>
                </Box>
            </Box>
            <Box marginTop={{"base": "-75px", "sm": "-75px", "customMd": "-90px"}} padding={{"base": "40px 1.5rem", "sm": "40px 1.5rem", "customMd": "40px 250px", "customLg": "40px 350px", "customXl": "40px 450px"}}>
                <MyBigInputSearch value={search} setValue={inputChanged}></MyBigInputSearch>
                {
                    (events.length) ? 
                    <>
                        <Box className={styles.containerTitle}>
                            <HStack justify={"space-between"}>
                                <SectionTitle title="Eventos encontrados"></SectionTitle>
                                <OrderByMenu onChange={(active)=>{orderBy(active)}} 
                                             text="Ordenar por: Fecha"
                                             default={true}></OrderByMenu>
                            </HStack>
                        </Box>
                        <Box>
                            <VStack align='stretch' spacing={3}>
                                {
                                    events.map((event: EventDate, index: any) => (
                                        <EventCard key={index} 
                                            eventImage={event.event.image_url}
                                            eventName={event.event.title}
                                            artistName={event.event.artist.name}
                                            ticketsNumber={event.ticketsCount}
                                            eventDate={event.date}
                                            eventId={event.encId}
                                            onClick={()=>{navigate("/tickets/" + event.encId)}}></EventCard>
                                    ))
                                }
                            </VStack>
                        </Box>
                    </> : 
                    <Box className={styles.containerNoResults}>
                        <span className={styles.noResultsTitle}>
                            Hay más de 200 eventos en el Perú al año (conciertos, partidos, stand up, etc) y con <Text fontFamily={"montserratBold"} display={"inline-block"}>Ticketea</Text> podrás ir a cada uno de ellos de manera segura y sin preocuparte de las estafas
                        </span>
                    </Box>
                }
            </Box>
            
        </>
    );
};