import { Avatar, Box, HStack, Show, Text } from "@chakra-ui/react";
import styles from "./ticketCard.module.css";
import { useNavigate } from "react-router-dom";
import { RatingBadge } from "../ratingBadge/ratingBadge";
import Utils from "../../utils/utils";

export const TicketCard = (props: Props) => {
    const navigate = useNavigate();
    const click = () => {
        navigate("/ticket-detail"+ "/" + props.ticketId);
    }

    return (
        <Box className={styles.parent} onClick={click}>
            <HStack justifyContent="space-between">
                <HStack gap={3}>
                    <Show above="sm">
                        <Avatar size='lg' name={props.sellerName} src={props.sellerImage} />
                    </Show>
                    <Box textAlign={"start"}>
                        <Text className={styles.ticketZoneName}>{props.zoneName}</Text>
                        <RatingBadge rating={props.ratingNumber}></RatingBadge>
                    </Box>
                </HStack>
                <Box textAlign={"end"}>
                    <Text className={styles.ticketPrice}>S/. {Utils.currencyFormat(props.ticketPrice)}</Text>
                    {(props.seat)?<Text fontSize={"16px"} color={"white.half"}>Butaca: {props.seat}</Text>:<></>}
                </Box>
            </HStack>
        </Box>
    );
};

type Props = {
    zoneName: string,
    ratingNumber: number,
    ticketPrice: number,
    sellerName: string,
    sellerImage: string,
    ticketId: string,
    seat: string
};