import { Box, Center, HStack, Text, VStack } from "@chakra-ui/react";
import { MyBigInputSearch } from "../../components/myBigInputSearch/myBigInputSearch";
import { SectionTitle } from "../../components/sectionTitle/sectionTitle";
import { EventCard } from "../../components/eventCard/eventCard";
import { OrderByMenu } from "../../components/orderByMenu/orderByMenu";
import { useEffect, useMemo, useState } from "react";
import styles from "./searchEvent.module.css";
import { useDispatch } from "react-redux";
import { onSearch } from "../../store/search/searchAction";
import { searchEvents } from "../../services/event.service";
import { useNavigate } from "react-router-dom";
import { Event } from "../../services/models/event.model";
import { ASC_ORDER_BY, DESC_ORDER_BY } from "../../utils/constants";
import { useModal } from "../../config/modal/use-modal";
import { Modals } from "../../config/modal/modal-config";

export const SearchEvent = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [events, setEvents] = useState([] as any[]);
    const [search, setSearch] = useState("");
    const [orderByDate, setOrderByDate] = useState(false);
    const [timer, setTimer] = useState(null as any);
    const loadingModal = useModal<any>(Modals.LoadingModal);

    const generateRandom = (min = 0, max = 100) =>{
        let difference = max - min;
        let rand = Math.random();
        rand = Math.floor( rand * difference);
        rand = rand + min;
        return rand;
    }
    const imageNumber = useMemo(() => generateRandom(3, 8), []);

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

    const inputChanged = (text:any) => {
        setSearch(text);
        clearTimeout(timer);

        const newTimer = setTimeout(async() => {
            dispatch(onSearch(text));
            searchEvents(text, "date", (orderByDate) ? ASC_ORDER_BY : DESC_ORDER_BY).then((res:any) => {
                setEvents(res.data);
            })
        }, 800);

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
            <Box className={styles.parent}>
                <Box className={styles.background} style={{backgroundImage: "url(/images/party-banner-"+imageNumber+".jpg)"}}></Box>
                <Box paddingBottom={"120px"} paddingTop={"100px"} paddingLeft={"15px"} paddingRight={"15px"}>
                    <Center textAlign={"center"}>
                        <VStack>
                            <Text fontSize={"30px"} fontFamily={"montserratBold"} textShadow={"2px 3px 5px rgba(0,0,0,0.5)"}>La forma más segura de vender y comprar entradas</Text>
                            <Text fontSize={"20px"} fontFamily={"montserratBold"} textShadow={"2px 3px 5px rgba(0,0,0,0.5)"}>Compra y vende sin preocuparte de las estafas</Text>
                        </VStack>
                    </Center>
                </Box>
            </Box>
            <Box marginTop={"-90px"} padding={{"base": "40px 1.5rem", "sm": "40px 1.5rem", "customMd": "40px 250px", "customLg": "40px 350px", "customXl": "40px 450px"}}>
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
                                    events.map((event: Event, index: any) => (
                                        <EventCard key={index} 
                                            eventImage={event.image_url}
                                            eventName={event.title}
                                            artistName={event.artist.name}
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
                            Hay más de 200 eventos en el Perú al año (conciertos, stand up, etc) y con <Text fontFamily={"montserratBold"} display={"inline-block"}>Ticketea</Text> podrás ir a cada uno de ellos de manera segura y sin preocuparte de las estafas
                        </span>
                    </Box>
                }
            </Box>
            
        </>
    );
};