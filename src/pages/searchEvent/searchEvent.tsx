import { Box, Center, HStack, Text, VStack } from "@chakra-ui/react";
import { MyBigInputSearch } from "../../components/myBigInputSearch/myBigInputSearch";
import { SectionTitle } from "../../components/sectionTitle/sectionTitle";
import { EventCard } from "../../components/eventCard/eventCard";
import { OrderByMenu } from "../../components/orderByMenu/orderByMenu";
import { useEffect, useMemo, useState } from "react";
import styles from "./searchEvent.module.css";
import { useDispatch } from "react-redux";
import { onSearch } from "../../store/search/searchAction";
import { getEventByText } from "../../services/event.service";
import { store } from "../../store/store";
import { useNavigate } from "react-router-dom";

export const SearchEvent = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [events, setEvents] = useState([] as any);
    const [search, setSearch] = useState("");
    const [timer, setTimer] = useState(null as any);
    
    const generateRandom = (min = 0, max = 100) =>{
        let difference = max - min;
        let rand = Math.random();
        rand = Math.floor( rand * difference);
        rand = rand + min;
        return rand;
    }
    const imageNumber = useMemo(() => generateRandom(3, 8), []);

    useEffect(() => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
        var searchText = store.getState().search.search;
        setSearch(searchText);
        setEvents(getEventByText(""));
    }, []);

    const inputChanged = (text:any) => {
        setSearch(text);
        clearTimeout(timer);

        const newTimer = setTimeout(() => {
            dispatch(onSearch(text));
            setEvents(getEventByText(text));
        }, 800);

        setTimer(newTimer);
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
                                <OrderByMenu text="Ordenar por: Fecha"></OrderByMenu>
                            </HStack>
                        </Box>
                        <Box>
                            <VStack align='stretch' spacing={3}>

                                {
                                    events.map((event: any, index: any) => (
                                        <EventCard key={index} 
                                            eventImage={event.eventImage}
                                            eventName={event.eventName}
                                            artistName={event.artistName}
                                            ticketsNumber={event.ticketsNumber}
                                            eventDate={event.eventDate}
                                            eventId={event.id}
                                            onClick={()=>{navigate("/tickets/" + event.id)}}></EventCard>
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