import { Badge, Box, HStack, Image, Show, Text } from "@chakra-ui/react";
import styles from "./eventCard.module.css";

export const EventCard = (props: Props) => {
    return (
        <Box className={styles.parent} onClick={props.onClick}>
            <HStack justifyContent="space-between">
                <HStack gap={3}>
                    <Show above="sm">
                        <Image className={styles.eventImage} 
                            src={props.eventImage}
                            fallbackSrc='https://via.placeholder.com/150'/>
                    </Show>
                    <Box textAlign={"start"}>
                        <Text className={styles.eventName}>{props.eventName}</Text>
                        <Text className={styles.artistName}>{props.artistName}</Text>
                    </Box>
                </HStack>
                <Box textAlign={"end"}>
                    <Badge variant={(props.ticketsNumber == 0) ? "red": "green"}className={styles.ticketsNumber}>{props.ticketsNumber} tickets</Badge>
                    <Text className={styles.eventDate}>{props.eventDate}</Text>
                </Box>
            </HStack>
        </Box>
    );
};

type Props = {
    eventName: string,
    artistName: string,
    eventImage: string,
    ticketsNumber: number,
    eventDate: string,
    eventId: number,
    onClick?: () => void
};