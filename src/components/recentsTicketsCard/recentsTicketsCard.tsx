import { Box, HStack, Image, Show, Text } from "@chakra-ui/react";
import styles from "./recentsTicketsCard.module.css";
import moment from 'moment/min/moment-with-locales';
import Utils from "../../utils/utils";

export const RecentsTicketsCard = (props: Props) => {
    const formattedTime = moment(props.eventDate * 1000).format("DD MMMM. YYYY");

    return (
        <Box className={styles.parent}>
            <HStack justifyContent="space-between">
                <HStack gap={3}>
                    <Show above="sm">
                        <Image className={styles.eventImage} 
                            src={props.eventImage}
                            fallbackSrc={"/images/party-banner-9.jpg"}
                            alt={`Evento de ${props.eventName} en Perú`}
                            title={`Evento de ${props.eventName} en Perú`}/>
                    </Show>
                    <Box textAlign={"start"}>
                        <Text className={styles.eventName}>{props.eventName}</Text>
                        <Text className={styles.artistName}>{formattedTime}</Text>
                    </Box>
                </HStack>
                <Box textAlign={"end"}>
                    <Text className={styles.eventDate}>S/. {Utils.currencyFormat(props.ticketPrice)}</Text>
                </Box>
            </HStack>
        </Box>
    );
};

type Props = {
    eventName: string,
    eventImage: string,
    eventDate: number,
    ticketPrice: number,
};