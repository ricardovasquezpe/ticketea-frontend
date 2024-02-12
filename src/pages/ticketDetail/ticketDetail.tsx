import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Avatar, Box, Center, Divider, Grid, GridItem, HStack, Highlight, Image, Link, Text, VStack } from "@chakra-ui/react";
import { SectionTitle } from "../../components/sectionTitle/sectionTitle";
import { MyContainer } from "../../components/myContainer/myContainer";
import { MyButton } from "../../components/myButton/myButton";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import styles from "./ticketDetails.module.css";
import { ReturnButton } from "../../components/returnButton/returnButton";
import { useEffect, useState } from "react";
import { Modals } from "../../config/modal/modal-config";
import { useModal } from "../../config/modal/use-modal";
import { useNavigate, useParams } from "react-router-dom";
import { getTicketById } from "../../services/event.service";
import { RatingBadge } from "../../components/ratingBadge/ratingBadge";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faShieldHeart } from "@fortawesome/free-solid-svg-icons";
import { TourGuideClient } from "@sjmc11/tourguidejs";
import "@sjmc11/tourguidejs/src/scss/tour.scss" 
import Utils from "../../utils/utils";
import { Ticket } from "../../services/models/ticket.model";

export const TicketDetail = () => {
    const navigate = useNavigate();
    const [event, setEvent] = useState({} as any);
    const [ticket, setTicket] = useState({} as any);
    const { eventId, ticketId } = useParams();
    const steps = [{
        content: "Dando click aqui podrás ver los comentarios de sus compradores",
        title: "Rating del vendedor",
        target: "#mybadge",
        order: "",
        group: ""
    },
    {
        content: "Validamos todos los datos del usuario con nuestro sistema integrado",
        title: "TicketeaProtect",
        target: "#ticketeaSecure",
        order: "",
        group: ""
    },
    {
        content: "Te damos algunas recomendaciones para que asegures la entrada a la hora de tu compra",
        title: "Tu seguridad es primero",
        target: "#seguridad",
        order: "",
        group: ""
    },
    {
        content: "Cuando estes listo, podras ir a comprar la entrada",
        title: "Vamos a comprar!",
        target: "#buy",
        order: "",
        group: ""
    }]
    const tg = new TourGuideClient({steps: steps, autoScroll:true, nextLabel: "Siguiente", prevLabel: "Atras", finishLabel: "Terminar"});

    const click = () => {
        navigate("/ticket-buy/" + eventId + "/" + ticketId);
    }

    useEffect(() => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
        getTicketDetail();
        tourInit();
    }, []);

    const tourInit = () => {
        const tour = localStorage.getItem('tour-ticket-detail');
        if(tour != "true") {
            tg.start();
            localStorage.setItem('tour-ticket-detail', "true");
        }
    } 

    const getTicketDetail = () => {
        getTicketById(ticketId).then((res: any) => {
            var ticket: Ticket = res.data;
            setTicket(ticket);
            setEvent(ticket.event);

            console.log(ticket.userSeller.last_name_father);
            
        });
    }

    const ratingDetailModal = useModal<any>(Modals.RatingDetailsModal);
    const displayRatingDetailModal = () => {
        ratingDetailModal.open({
          onSave: () => {
            console.log("OnSave");
          },
          onClose: () => {
            console.log("onClose");
            ratingDetailModal.close();
          },
          onCancel: () => {
            console.log("onCancel");
            ratingDetailModal.close();
          },
        });
    }

    const ticketeaProtectModal = useModal<any>(Modals.TicketeaProtectModal);
    const openTickeaProtect = () => {
        ticketeaProtectModal.open({
            onSave: () => {
              console.log("OnSave");
            },
            onClose: () => {
              console.log("onClose");
              ratingDetailModal.close();
            },
            onCancel: () => {
              console.log("onCancel");
              ratingDetailModal.close();
            },
          });
    }

    return (
        <>
            <Box className={styles.parent}>
                <Box className={styles.background} style={{backgroundImage: "url("+event.image_url+")"}}></Box>
                <Box paddingBottom={5} paddingTop={5}>
                    <Center>
                        <Grid templateColumns="repeat(5, 1fr)" gap={5}> 
                            <GridItem colSpan={{base: 5, sm: 5, md: 1}}>
                                <Center>
                                    <Image className={styles.eventImage} src={event.image_url}></Image>
                                </Center>
                            </GridItem>
                            <GridItem colSpan={{base: 5, sm: 5, md: 4}}>
                                <Box textAlign={{base: "center", sm: "center", md: "left"}}>
                                    <Text fontSize={30} fontFamily={"robotoBold"} marginBottom={2}>{event.title}</Text>
                                    <HStack>
                                        <Text>{(event.artist)?event.artist.name:""}</Text>
                                        <Text fontWeight={"bold"}>|</Text>
                                        <Text>{event.date}</Text>
                                        <Text fontWeight={"bold"}>|</Text>
                                        <Text>{event.place}</Text>
                                    </HStack>
                                </Box>
                            </GridItem>
                        </Grid>
                    </Center>
                </Box>
            </Box>
            <Box padding={{"base": "40px 1.5rem", "sm": "40px 1.5rem", "customMd": "40px 250px", "customLg": "40px 350px", "customXl": "40px 450px"}}>
                <Box style={{width: "min-content"}}>
                    <ReturnButton route="/tickets"></ReturnButton>
                </Box>
                <Box marginTop={3}></Box>
                <SectionTitle title="Ticket"/>
                <Box marginTop={3}></Box>
                <MyContainer>
                    <HStack justifyContent={"space-between"}>
                        <Box>
                            <Text fontFamily={"robotoBold"} fontSize={"22px"}>{(ticket.zone)?ticket.zone.name:""}</Text>
                            {(ticket.seat)?<Text fontSize={"16px"} color={"white.half"}>Butaca {ticket.seat}</Text>:<></>}
                        </Box>
                        <HStack id="buy">
                            <Text fontSize={"14px"} color={"white.half"}>(+30% del precio original)</Text>
                            <Text marginRight={4}>S/. {(ticket.price!=null)?Utils.currencyFormat(ticket.price):0}</Text>
                            <MyButton textColor="white" 
                                    backgroundColor="secondary.default" 
                                    backgroundColorHover="secondary.dark" 
                                    title={"Comprar"}
                                    fontSize="18px"
                                    padding="14px"
                                    onClick={click}></MyButton>
                        </HStack>
                    </HStack>
                    <Divider marginTop={3} marginBottom={3} borderColor={"primary.default"} borderWidth={1.5}/>
                    <Link color='teal.500' href={(ticket.event)?ticket.event.url:""} isExternal>
                        Link de la pagina oficial <ExternalLinkIcon mx='2px' />
                    </Link>
                </MyContainer>
                <Box marginTop={5}></Box>
                <SectionTitle title="Vendedor"/>
                <Box marginTop={3}></Box>
                <Grid templateColumns="repeat(5, 1fr)" gap={3}> 
                    <GridItem colSpan={{base: 5, sm: 5, md: 2}}>
                        <MyContainer>
                            <VStack>
                                <Avatar size='xl' name={(ticket.userSeller)?ticket.userSeller.fullName:""} src={(ticket.userSeller)?ticket.userSeller.profile_photo_url:""} />
                                <Box textAlign={"center"}>
                                    <Text lineHeight={"20px"} fontFamily={"robotoBold"} fontSize={"22px"}>{(ticket.userSeller)?ticket.userSeller.fullName:""}</Text>
                                </Box>
                                <RatingBadge id="mybadge" rating={3} onClick={displayRatingDetailModal}></RatingBadge>
                                <Box marginTop={1}></Box>
                                <VStack gap={1} width={"100%"} paddingLeft={30} paddingRight={30}>
                                    <HStack justifyContent={"space-between"} width={"100%"}>
                                        <Text>Celular Verificado</Text>
                                        <FontAwesomeIcon color={"var(--chakra-colors-green-default)"} icon={faCircleCheck} size="1x"/>
                                    </HStack>
                                    <HStack justifyContent={"space-between"} width={"100%"}>
                                        <Text>Email Verificado</Text>
                                        <FontAwesomeIcon color={"var(--chakra-colors-green-default)"} icon={faCircleCheck} size="1x"/>
                                    </HStack>
                                    <HStack justifyContent={"space-between"} width={"100%"}>
                                        <Text>DNI Verificado por RENIEC</Text>
                                        <FontAwesomeIcon color={"var(--chakra-colors-green-default)"} icon={faCircleCheck} size="1x"/>
                                    </HStack>
                                    <HStack justifyContent={"space-between"} width={"100%"}>
                                        <Text>Datos Completos</Text>
                                        <FontAwesomeIcon color={"var(--chakra-colors-green-default)"} icon={faCircleCheck} size="1x"/>
                                    </HStack>
                                    <Divider marginTop={3} marginBottom={3} borderColor={"primary.default"} borderWidth={1.5}/>
                                    <HStack id="ticketeaSecure">
                                        <Text>Validado por</Text>
                                        <Link color='#4CAF50' onClick={openTickeaProtect}>
                                            TicketeaProtect
                                        </Link>
                                        <FontAwesomeIcon color='#4CAF50' style={{marginTop: "-5px"}} icon={faShieldHeart} size="xl"/>
                                    </HStack>
                                </VStack>
                            </VStack>
                        </MyContainer>
                    </GridItem>
                    <GridItem colSpan={{base:5, sm: 5, md: 3}}>
                        <MyContainer>
                            <Box textAlign={"center"} id="seguridad">
                                <Text fontSize={"22px"} fontFamily={"robotoBold"}>Seguridad</Text>
                                <Highlight query='nominar' styles={{ px: '0.5', py: '0.5', bg: 'grey.default' }}>
                                    Para validar que la entrada sea original recomendamos que realices el proceso de nominar la entrada con el vendedor y asegurarte que la entrada tenga tu nombre
                                </Highlight>
                                <br />
                                <Link color='teal.500' href='https://teleticketperu.zendesk.com/hc/es/articles/10212876635163--C%C3%93MO-NOMINAR-MI-TICKET' isExternal>
                                    Nominar entrada en Teleticket <ExternalLinkIcon mx='2px' />
                                </Link>
                                <br />
                                <Link color='teal.500' href='https://blog.joinnus.com/entradas-nominativas-como-comprar/' isExternal>
                                    Nominar entrada en Joinus <ExternalLinkIcon mx='2px' />
                                </Link>
                                <br />
                                <Link color='teal.500' href='https://blog.ticketmaster.es/post/que-son-las-entradas-nominales-27129/' isExternal>
                                    Nominar entrada en TicketMaster <ExternalLinkIcon mx='2px' />
                                </Link>
                            </Box>
                        </MyContainer>
                        <Box marginTop={3}></Box>
                        <MyContainer>
                            <Box textAlign={"center"}>
                                <Text fontSize={"22px"} fontFamily={"robotoBold"}>Tiempos</Text>
                                <Text>Tendras como máximo 2 dias para confirmar o cancelar tu compra, sino la entrada sera devuelta al vendedor</Text>
                                <Link color='teal.500' href='/terminos-y-condiciones' isExternal>
                                    Términos y condiciones <ExternalLinkIcon mx='2px' />
                                </Link>
                            </Box>
                        </MyContainer>
                    </GridItem>
                </Grid>
                <Box marginTop={5}></Box>
                <SectionTitle title="Preguntas Frecuentes"/>
                <Box marginTop={3}></Box>
                <MyContainer>
                    <Accordion allowMultiple>
                        <AccordionItem border={"none"}>
                            <AccordionButton>
                                <Box as="span" flex='1' textAlign='left'>
                                    <Text>¿Cómo puedo asegurarme que la entrada es original?</Text>
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                            <AccordionPanel pb={4}>
                                <Text fontSize={16}>
                                    Recomendamos hacer el proceso de nomincion de la entrada con el vendedor en persona o compartiendo pantalla
                                </Text>
                            </AccordionPanel>
                        </AccordionItem>

                        <AccordionItem border={"none"}>
                            <h2>
                                <AccordionButton>
                                    <Box as="span" flex='1' textAlign='left'>
                                        <Text>¿En cuanto tiempo validan mi pago?</Text>
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                                <Text fontSize={16}>
                                    Validaremos el deposito de tu pago en un plazo maximo de 1 dia (24 horas)
                                </Text>
                            </AccordionPanel>
                        </AccordionItem>

                        <AccordionItem border={"none"}>
                            <h2>
                                <AccordionButton>
                                    <Box as="span" flex='1' textAlign='left'>
                                        <Text>¿Que pasa si no me contacto con el vendedor?</Text>
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                                <Text fontSize={16}>
                                    Tienes como maximo 2 dias para contactarte con el vendedor para recibir la entrada o hacer el proceso de nominacion
                                </Text>
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>
                </MyContainer>
            </Box>
        </>
        
    );
};