import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Avatar, Box, Center, Divider, Grid, GridItem, HStack, Highlight, Image, Link, Show, Text, VStack, useToast } from "@chakra-ui/react";
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
import { getEventByEventDateId } from "../../services/event.service";
import { RatingBadge } from "../../components/ratingBadge/ratingBadge";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleXmark, faShieldHeart } from "@fortawesome/free-solid-svg-icons";
import { TourGuideClient } from "@sjmc11/tourguidejs";
import "@sjmc11/tourguidejs/src/scss/tour.scss" 
import Utils from "../../utils/utils";
import { Ticket } from "../../services/models/ticket.model";
import moment from 'moment/min/moment-with-locales';
import { TICKET_DETAIL_TOUR_STEPS } from "../../utils/constants";
import { buyTicket, getTicketById } from "../../services/ticket.service";
import { User } from "../../services/models/user.model";
import { getUserById } from "../../services/user.service";
import { getRatingsByUserId } from "../../services/rating.service";
import { UserValidationType } from "../../utils/enums/userValidationType.enum";
import { EventDate } from "../../services/models/eventDate.model";
import Session from "../../utils/session";
import { MySeo } from "../../components/mySeo/mySeo";
import { ErrorType } from "../../utils/enums/errorType.enum";

const TicketDetail = () => {
    //const navigate = useNavigate();
    const [event, setEvent] = useState({} as EventDate);
    const [ticket, setTicket] = useState({} as Ticket);
    const [user, setUser] = useState({} as User);
    const [loading, setLoading] = useState(false);
    const { ticketId } = useParams();
    const tg = new TourGuideClient({steps: TICKET_DETAIL_TOUR_STEPS, 
                                    autoScroll: true, 
                                    dialogPlacement: 'bottom',
                                    nextLabel: "Siguiente", 
                                    prevLabel: "Atras", 
                                    finishLabel: "Terminar",
                                    autoScrollOffset: 500});
    const loadingModal = useModal<any>(Modals.LoadingModal);
    const loginModal = useModal<any>(Modals.LoginModal);
    const toast = useToast();
    const navigate = useNavigate();

    const click = async () => {
        //navigate("/ticket-buy/" + ticketId);
        if(Session.isLoggedIn()){
            setLoading(true);
            callBuyTicket();
        } else {
            loginModal.open({
                onSave: async () =>{
                    loginModal.close();
                    setLoading(true);
                    callBuyTicket();
                },
                onClose: ()=>{
                    loginModal.close();
                }
            });
        }
    }

    const callBuyTicket = async() => {
        var res = await buyTicket(String(ticketId));
        if(res.data.errorType == ErrorType.Info){
            toast({
                title: res.data.message,
                description: "",
                status: 'info',
                duration: 10000,
                isClosable: true,
            });
            
            navigate("/mi-cuenta");
            setLoading(false);
            return;
        }
        setLoading(false);
        toast({
            title: 'Hemos enviado tu información al vendedor, en breves él se comunicará contigo!',
            description: "",
            status: 'success',
            duration: 10000,
            isClosable: true,
        });
    }

    useEffect(() => {
        loadingModal.open({title: "Cargando el detalle de la entrada"});
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
        onLoadData();
    }, []);

    const tourInit = () => {
        const tour = localStorage.getItem('tour-ticket-detail');
        if(tour != "true") {
            tg.start();
            localStorage.setItem('tour-ticket-detail', "true");
        }
    } 

    const onLoadData = async() => {
        var ticketRes = await getTicketById(ticketId);
        var ticketObj: Ticket = ticketRes.data;
        setTicket(ticketObj);

        var eventRes:any = await getEventByEventDateId(ticketObj.eventDateIdEnc);
        setEvent(eventRes.data);

        var userRes:any = await getUserById(ticketObj.userSellerIdEnc);
        setUser(userRes.data);

        loadingModal.close();
        tourInit();
    }

    const ratingDetailModal = useModal<any>(Modals.RatingDetailsModal);
    const displayRatingDetailModal = async () => {
        var ratings = await getRatingsByUserId(user.encId);
        ratingDetailModal.open({
            ratings: ratings.data,
            onSave: () => {
            },
            onClose: () => {
                ratingDetailModal.close();
            },
            onCancel: () => {
                ratingDetailModal.close();
            },
        });
    }

    const ticketeaProtectModal = useModal<any>(Modals.TicketeaProtectModal);
    const openTickeaProtect = () => {
        ticketeaProtectModal.open({
            onSave: () => {
            },
            onClose: () => {
              ticketeaProtectModal.close();
            },
            onCancel: () => {
              ticketeaProtectModal.close();
            },
          });
    }

    return (
        <>
            <MySeo title={`${(event.event) ? event.event.title : ""} | Ticketea!`}
                   description={`Entrada del vendedor ${user.fullName} del evento ${(event.event) ? event.event.title : ""} en Ticketea`}
                   link={`https://ticketea.me/tickets/${ticket.encId}`}
                   image={(event.event) ? event.event.image_url : ""}/>
            <Box className={styles.parent}>
                <Box className={styles.background} style={{backgroundImage: "url("+((event && event.event && event.event.image_url.trim() != "") ? event.event.image_url : "/images/party-banner-9.jpg")+")"}}></Box>
                <Box paddingBottom={5} paddingTop={5}>
                    <Center>
                        <Grid templateColumns="repeat(5, 1fr)" gap={5}> 
                            <GridItem colSpan={{base: 5, sm: 5, md: 1}}>
                                <Center>
                                    <Image className={styles.eventImage} 
                                           src={((event.event) ? event.event.image_url : "")} 
                                           fallbackSrc={"/images/party-banner-9.jpg"}
                                           alt={`Evento de ${(event.event) ? event.event.title : ""}`}
                                           title={`Evento de ${(event.event) ? event.event.title : ""}`}></Image>
                                </Center>
                            </GridItem>
                            <GridItem colSpan={{base: 5, sm: 5, md: 4}}>
                                <Box textAlign={{base: "center", sm: "center", md: "left"}}>
                                    <Text as="h1" lineHeight={"30px"} fontSize={30} marginLeft={"20px"} marginRight={"20px"} fontFamily={"robotoBold"} marginBottom={2}>{(event.event)?event.event.title:""}</Text>
                                    <Show below='sm'>
                                        <VStack gap={0}>
                                            <Text as="h2" textAlign={"center"}>{(event.event) ? event.event.artist.name : ""}</Text>
                                            <Text as="h2" textAlign={"center"}>{moment(event.date * 1000).format("DD MMMM. YYYY")}</Text>
                                            <Text as="h2" textAlign={"center"}>{(event.event)?event.event.place:""}</Text>
                                        </VStack>
                                    </Show>
                                    <Show above='sm'>
                                        <HStack gap={2}>
                                            <Text as="h2" textAlign={"center"}>{(event.event) ? event.event.artist.name : ""}</Text>
                                            <Text fontWeight={"bold"}>|</Text>
                                            <Text as="h2" textAlign={"center"}>{moment(event.date * 1000).format("DD MMMM. YYYY")}</Text>
                                            <Text fontWeight={"bold"}>|</Text>
                                            <Text as="h2" textAlign={"center"}>{(event.event)?event.event.place:""}</Text>
                                        </HStack>
                                    </Show>
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
                            <Text fontFamily={"robotoBold"} fontSize={"22px"}>Zona: {(ticket.zone)?ticket.zone.name:""}</Text>
                            {(ticket.seat)?<Text fontSize={"16px"} color={"white.half"} wordBreak={"break-all"}>Butaca: {ticket.seat}</Text>:<></>}
                        </Box>
                        <VStack id="buy" align={"end"} gap={1}>
                            <Grid templateColumns="repeat(2, 1fr)" gap={2}>
                                <GridItem colSpan={{base: 2, sm: 2, customMd: 2}} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                    <Text>S/. {(ticket.price!=null)?Utils.currencyFormat(ticket.price):0}</Text>
                                </GridItem>
                                {
                                    /* 
                                        <GridItem colSpan={{base: 2, sm: 1, customMd: 1}}>
                                            <MyButton textColor="white" 
                                                    backgroundColor="secondary.default" 
                                                    backgroundColorHover="secondary.dark" 
                                                    title={"Contactar"}
                                                    fontSize="18px"
                                                    padding="14px"
                                                    onClick={click}></MyButton>
                                        </GridItem>
                                    */
                                }
                            </Grid>
                            {   
                                ticket.zone && 
                                <Text fontSize={"14px"} color={"white.half"}>({Utils.calculatePercentageAdd(ticket.price, ticket.zone.price)}% del precio original)</Text>
                            }
                        </VStack>
                    </HStack>
                    {
                        ticket.comment && <Box color={"white.half"} fontSize={"16px"}>
                                                Cometario del vendedor: {ticket.comment}
                                           </Box>
                    }
                    <Divider marginTop={3} marginBottom={3} borderColor={"primary.default"} borderWidth={1.5}/>
                    <Link color='teal.500' href={(event.event)?event.event.url:""} isExternal>
                        Link de la página oficial del evento <ExternalLinkIcon mx='2px' />
                    </Link>
                    <Divider marginTop={3} marginBottom={3} borderColor={"primary.default"} borderWidth={1.5}/>
                    <VStack id="contact-seller" gap={5}>
                        <Text textAlign={"center"}>Al dar click, le brindaremos tus datos al vendedor para que se ponga en contacto contigo y puedas comprar la entrada!</Text>
                        <MyButton textColor="white" 
                                backgroundColor="secondary.default" 
                                backgroundColorHover="secondary.dark" 
                                title={"Deseo adquirir la entrada!"}
                                fontSize="18px"
                                padding="14px"
                                onClick={click}
                                isLoading={loading}></MyButton>
                    </VStack>
                </MyContainer>
                <Box marginTop={5}></Box>
                <SectionTitle title="Vendedor"/>
                <Box marginTop={3}></Box>
                <Grid templateColumns="repeat(5, 1fr)" gap={3}> 
                    <GridItem colSpan={{base: 5, sm: 5, md: 2}}>
                        <MyContainer>
                            <VStack>
                                <Avatar size='xl' 
                                        name={user.fullName} 
                                        src={user.profile_photo_url}
                                        title={`Imagen de vendedor verificado ${user.fullName}`}
                                        loading="eager"/>
                                <Box textAlign={"center"}>
                                    <Text lineHeight={"20px"} fontFamily={"robotoBold"} fontSize={"22px"}>{user.fullName}</Text>
                                </Box>
                                <RatingBadge id="mybadge" 
                                             rating={user.avgRating!} 
                                             onClick={displayRatingDetailModal}
                                             showLabel={true}></RatingBadge>
                                <Box marginTop={1}></Box>
                                <VStack gap={1} width={"100%"} paddingLeft={30} paddingRight={30}>
                                    <HStack justifyContent={"space-between"} width={"100%"}>
                                        <Text>Datos Completos</Text>
                                        {
                                            (user.userValidations?.find((val)=>val.validated && val.type == UserValidationType.ProfileUpdated)) ? 
                                            <td><FontAwesomeIcon color={"var(--chakra-colors-green-default)"} icon={faCircleCheck} size="1x"/></td> : 
                                            <td><FontAwesomeIcon color={"var(--chakra-colors-red-default)"} icon={faCircleXmark} size="1x"/></td>
                                        }
                                    </HStack>
                                    <HStack justifyContent={"space-between"} width={"100%"}>
                                        <Text>DNI Verificado por RENIEC</Text>
                                        {
                                            (user.userValidations?.find((val)=>val.validated && val.type == UserValidationType.PersonalDocumentVerified)) ? 
                                            <td><FontAwesomeIcon color={"var(--chakra-colors-green-default)"} icon={faCircleCheck} size="1x"/></td> : 
                                            <td><FontAwesomeIcon color={"var(--chakra-colors-red-default)"} icon={faCircleXmark} size="1x"/></td>
                                        }
                                    </HStack>
                                    <HStack justifyContent={"space-between"} width={"100%"}>
                                        <Text>Celular Verificado</Text>
                                        {
                                            (user.userValidations?.find((val)=>val.validated && val.type == UserValidationType.PhoneVerified)) ? 
                                            <td><FontAwesomeIcon color={"var(--chakra-colors-green-default)"} icon={faCircleCheck} size="1x"/></td> : 
                                            <td><FontAwesomeIcon color={"var(--chakra-colors-red-default)"} icon={faCircleXmark} size="1x"/></td>
                                        }
                                    </HStack>
                                    <HStack justifyContent={"space-between"} width={"100%"}>
                                        <Text>Email Verificado</Text>
                                        {
                                            (user.userValidations?.find((val)=>val.validated && val.type == UserValidationType.EmailVerified)) ? 
                                            <td><FontAwesomeIcon color={"var(--chakra-colors-green-default)"} icon={faCircleCheck} size="1x"/></td> : 
                                            <td><FontAwesomeIcon color={"var(--chakra-colors-red-default)"} icon={faCircleXmark} size="1x"/></td>
                                        }
                                    </HStack>
                                    
                                    <Divider marginTop={3} marginBottom={3} borderColor={"primary.default"} borderWidth={1.5}/>
                                    <Box id="ticketeaSecure" textAlign={"center"}>
                                        <Text>Validado por 
                                            <Link display={"inline-block"} color='#4CAF50' onClick={openTickeaProtect} fontFamily={"montserratBold"} marginLeft={"5px"}>
                                                TicketeaProtect
                                                <FontAwesomeIcon color='#4CAF50' style={{marginTop: "-5px", marginLeft: "5px"}} icon={faShieldHeart} size="xl"/>
                                            </Link>            
                                        </Text>
                                    </Box>
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
                                <Box marginTop={"7px"}>
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
                            </Box>
                        </MyContainer>
                        <Box marginTop={3}></Box>
                        <MyContainer>
                            {
                                /* 
                                    <Box textAlign={"center"}>
                                        <Text fontSize={"22px"} fontFamily={"robotoBold"}>Tiempos</Text>
                                        <Text>Tendras como máximo 2 dias para confirmar o cancelar tu compra, sino la entrada sera devuelta al vendedor</Text>
                                        <Link color='teal.500' href='/terminos-condiciones' isExternal>
                                            Términos y condiciones <ExternalLinkIcon mx='2px' />
                                        </Link>
                                    </Box>
                                */
                            }
                            <Box textAlign={"center"}>
                                <Text fontSize={"22px"} fontFamily={"robotoBold"}>¿Dudas?</Text>
                                <Text>Recuerda que toda duda o consulta puedes comunicarte con nosotros a nuestro correo electrónico hola.ticketea@gmail.com</Text>
                                <Box marginTop={"7px"}>
                                    <Link color='teal.500' href='/terminos-condiciones' isExternal>
                                        Términos y condiciones <ExternalLinkIcon mx='2px' />
                                    </Link>
                                </Box>
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
                                    <Text>¿Cómo puedo asegurarme que la entrada que compre es original?</Text>
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                            <AccordionPanel pb={4}>
                                <Text fontSize={16}>
                                    Recomendamos hacer el proceso de nominación de la entrada con el vendedor en persona o compartiendo pantalla. Así te aseguras al 100% de ser el dueño de la entrada a comprar
                                </Text>
                                <Box marginTop={"7px"}>
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
                            </AccordionPanel>
                        </AccordionItem>

                        <AccordionItem border={"none"}>
                            <AccordionButton>
                                <Box as="span" flex='1' textAlign='left'>
                                    <Text>¿Cómo funciona Ticketea?</Text>
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                            <AccordionPanel pb={4}>
                                <Text fontSize={16}>
                                    Se le enviará tu nombre y número celular al vendedor para que se ponga en contacto contigo y puedan realizar la compra/venta de la entrada
                                </Text>
                            </AccordionPanel>
                        </AccordionItem>

                        <AccordionItem border={"none"}>
                            <AccordionButton>
                                <Box as="span" flex='1' textAlign='left'>
                                    <Text>¿Puedo realizar la compra a través de Ticketea?</Text>
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                            <AccordionPanel pb={4}>
                                <Text fontSize={16}>
                                    Estamos trabajando para que sea posible las compras en Ticketea. Estes atento a nuevas novedades!
                                </Text>
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>
                </MyContainer>
            </Box>
        </>
        
    );
};

export default TicketDetail;