import { Avatar, Box, Divider, HStack, Image, Link, Show, Text } from "@chakra-ui/react";
import styles from "./eventiTicketCard.module.css";
import { RatingBadge } from "../ratingBadge/ratingBadge";
import Utils from "../../utils/utils";
import moment from 'moment/min/moment-with-locales';
import { TicketState, TicketStateString } from "../../utils/enums/ticketState.enum";
import { ExternalLinkIcon } from "@chakra-ui/icons";

export const EventTicketCard = (props: Props) => {
    return (
        <Box className={styles.parent}>
            <HStack justifyContent="space-between">
                <HStack gap={3}>
                    <Show above="sm">
                        <Image className={styles.eventImage} 
                            src={props.eventImage}
                            fallbackSrc='https://via.placeholder.com/150'/>
                    </Show>
                    <Box textAlign={"start"}>
                        <Text className={styles.eventName}>
                            {props.eventName}
                            <Link marginLeft={"5px"} href={"https://ticketea.me/ticket-detail/" + props.ticketId} isExternal>
                                <ExternalLinkIcon mx='2px' />
                            </Link>
                        </Text>
                        <Text className={styles.artistName}>{props.artistName}</Text>
                    <Text className={styles.eventDate}>{moment(props.eventDate * 1000).format("DD MMMM. YYYY h:mm A")}</Text>
                    </Box>
                </HStack>
                <Box textAlign={"end"}>
                    <Text className={styles.ticketPrice}>S/. {(props.ticketPrice!=null)?Utils.currencyFormat(props.ticketPrice):0}</Text>
                    <Text className={styles.ticketZone}>{props.ticketZone}</Text>
                    {(props.seat)?<Text fontSize={"16px"} color={"white.half"}>Butaca: {props.seat}</Text>:<></>}
                </Box>
            </HStack>
            {(props.sellerName != null) ? <>
                <Divider marginTop={3} marginBottom={3} borderColor={"primary.default"} borderWidth={1.5}/>
                <HStack gap={3}>
                    <Avatar size='sm' name={props.sellerName} src={props.sellerImage} />
                    <Text>{props.sellerName}</Text>
                    <RatingBadge id="mybadge" rating={props.ratingNumber!} showLabel={false}></RatingBadge>
                </HStack>
            </> : <></>}
            {
                (props.state != null && props.state != TicketState.Active) ? <div className={styles.arrowRight}>
                                                            <span>{TicketStateString[props.state!]}</span>
                                                        </div> : <></>
            }
        </Box>
    );
};

type Props = {
    eventImage: string,
    eventName: string,
    artistName: string,
    eventDate: number,
    ticketZone: string,
    ticketPrice: number,
    sellerName?: string,
    sellerImage?: string,
    ratingNumber?: number,
    seat: string,
    state?: TicketState,
    ticketId?: string
};