import { Box, Checkbox, Grid, GridItem, Input, InputGroup, InputLeftAddon, Select, Text, Textarea, Tooltip, VStack, useToast } from "@chakra-ui/react";
import { SectionTitle } from "../../components/sectionTitle/sectionTitle";
import { MyContainer } from "../../components/myContainer/myContainer";
import { MyButton } from "../../components/myButton/myButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faCircleMinus, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { EventCardSearch } from "../../components/eventCardSearch/eventCardSearch";
//import { FileUploader } from "../../components/fileUploader/fileUploader";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useModal } from "../../config/modal/use-modal";
import { Modals } from "../../config/modal/modal-config";
import { getMyUserData } from "../../services/user.service";
import { User } from "../../services/models/user.model";
import { getEventsAvailable } from "../../services/event.service";
import { UserValidationType } from "../../utils/enums/userValidationType.enum";
import moment from 'moment/min/moment-with-locales';
import { Zone } from "../../services/models/zone.model";
import { getZonesByEventId } from "../../services/zone.service";
import { useForm } from "react-hook-form";
import { createTicket } from "../../services/ticket.service";
import { EventDate } from "../../services/models/eventDate.model";
import { ErrorType } from "../../utils/enums/errorType.enum";
import { MySeo } from "../../components/mySeo/mySeo";
import { faSquareFacebook, faSquareInstagram, faTiktok } from "@fortawesome/free-brands-svg-icons";

export const SellTicket = () => {
    const navigate = useNavigate();
    //const [files, setFiles] = useState([] as File[]);
    const [user, setUser] = useState({} as User);
    const [events, setEvents] = useState([] as EventDate[]);
    const [eventSelected, setEventSelected] = useState({} as EventDate);
    const [zones, setZones] = useState([] as Zone[]);
    const { register: sell, trigger: sellTrigger, getValues: sellGetValues, formState: { errors }, setValue: sellSetValue  } = useForm();
    const loadingModal = useModal<any>(Modals.LoadingModal);
    const [errorMessage, setErrorMessage] = useState("" as any);
    const [loading, setLoading] = useState(false);
    const toast = useToast();

    useEffect(() => {
        loadingModal.open({title: "Cargando información"});
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
        onLoadData();
    }, []);

    const onLoadData = async () => {
        var userRes = await getMyUserData();
        setUser(userRes.data);
        var eventRes = await getEventsAvailable();
        setEvents(eventRes.data);
        loadingModal.close();
    }

    const onSelectEvent = async(event: any) => {
        var eventId = event.target.value;
        if(eventId){
            var eventDateFound = events.find((ev) => ev.encId == eventId)!;
            setEventSelected(eventDateFound);
            var zonesResp = await getZonesByEventId(eventDateFound.event.encId);
            setZones(zonesResp.data);
            sellSetValue("zone", null);
        } else {
            setEventSelected({} as EventDate);
            setZones([]);
        }
    }

    const sellTicket = async () => {
        setErrorMessage("");
        if(user.userValidations?.filter((vald) => vald.validated == true).length != 5){
            setErrorMessage("Debes compeltar la verificación de tu perfil");
            return;
        }

        const isValid = await sellTrigger(["event", "zone", "price", "seat", "acceptSellTerms"], { shouldFocus: true });
        if(!isValid){
            return;
        }

        if(!sellGetValues().facebookApp && !sellGetValues().tiktokApp && !sellGetValues().instagramApp){
            setErrorMessage("Debes escoger mínimo 1 aplicación donde se promocionará tu entrada");
            return;
        }

        if(sellGetValues().facebookApp && sellGetValues().tiktokApp && sellGetValues().instagramApp){
            setErrorMessage("Solo puedes escoger 2 aplicaciones como máximo donde se promocionará tu entrada");
            return;
        }

        /*if(files.length == 0){
            setErrorMessage("Debes subir tu entrada en formato PDF")
            return;
        }*/

        setLoading(true);
        /*var formData = new FormData();
        formData.append("eventDateId", eventSelected.encId);
        formData.append("eventId", eventSelected.event.encId);
        formData.append("zoneId", sellGetValues().zone);
        formData.append("price", sellGetValues().price);
        formData.append("seat", sellGetValues().seat);*/
        //formData.append("file", files[0]);
        var data = {
            eventDateId: eventSelected.encId,
            eventId: eventSelected.event.encId,
            zoneId: sellGetValues().zone,
            price: sellGetValues().price,
            seat: sellGetValues().seat,
            comment: sellGetValues().comment
        }

        var response = await createTicket(data);
        if(response.data.errorType == ErrorType.ValidationError){
            setErrorMessage("Falta llenar algunos campos");
            setLoading(false);
            return;
        }

        if(response.data.errorType  == ErrorType.Info){
            setErrorMessage(response.data.message);
            setLoading(false);
            return;
        }

        toast({
            title: 'Tu entrada ya esta creada, ahora solo falta esperar a un vendedor!',
            description: "",
            status: 'success',
            containerStyle: {
                fontSize: "16px"
            },
            duration: 9000,
            isClosable: true,
        });

        navigate("/mis-tickets");
    }

    const handlePrecioChange = (e: any) => {
        let input = e.target.value;
        input = input.replace(/[^0-9.]/g, "");
        if (input.split(".").length > 2) {
            input = input.slice(0, -1);
        }

        sellSetValue("price", input);
    }

    const iconPersonalDocumentVerification = () => {
        var validation = user.userValidations?.find((val)=>val.type == UserValidationType.PersonalDocumentVerified);
        if(!validation){
            return <td><FontAwesomeIcon color={"var(--chakra-colors-red-default)"} icon={faCircleXmark} size="1x"/></td>;
        }
        
        if(validation?.validated == true){
            return <td><FontAwesomeIcon color={"var(--chakra-colors-green-default)"} icon={faCircleCheck} size="1x"/></td>;
        } else if (validation?.validated == false && validation.manualValidation == false){
            return <td><FontAwesomeIcon color={"var(--chakra-colors-red-default)"} icon={faCircleXmark} size="1x"/></td>;
        } else {
            return <td><Tooltip label='En proceso de validacion manual'><FontAwesomeIcon color={"#FFEB3B"} icon={faCircleMinus} size="1x"/></Tooltip></td>
        }
    }

    return (
        <>
            <MySeo title={`Vender entrada | Ticketea!`}
                   description={`Compra la entrada al evento que quieres asistir de manera segura con nuestros vendedores verificados rapido y facil`}
                   link={`https://ticketea.me/vender-ticket`}
                   image={"/images/logo.png"}/>
            <Box padding={{"base": "40px 1.5rem", "sm": "40px 1.5rem", "customMd": "40px 250px", "customLg": "40px 350px", "customXl": "40px 450px"}}>
                <VStack align='stretch' gap={5}>
                    <SectionTitle title="Vende tu entrada"/>
                    <MyContainer>
                        <Grid templateColumns='repeat(2, 1fr)' gap={2} width={"100%"}>
                            <GridItem colSpan={{base: 2, sm: 1}}>
                                <Text fontSize={"20px"}>Verificar identidad</Text>
                            </GridItem>
                            {(user.userValidations?.length != 5) ? <GridItem colSpan={{base: 2, sm: 1}} textAlign={{base: "left", sm: "end"}}>
                                <MyButton textColor="white" 
                                            backgroundColor="secondary.default" 
                                            backgroundColorHover="secondary.dark" 
                                            title={"Completar verificación"}
                                            fontSize="14px"
                                            padding="5px 10px"
                                            onClick={()=>navigate("/mi-cuenta")}
                                            size="xs"></MyButton>
                            </GridItem> : <></>}
                        </Grid>
                        <Box margin={{"base": "10px 0px 0px 0px", "sm": "10px 20px 0px 20px", "md": "10px 20px 0px 20px"}}>
                            <table>
                                <tbody>
                                    <tr>
                                        <td><Text color={"white.half"} fontSize={"16px"} paddingRight={"20px"}>Foto de perfil</Text></td>
                                        {
                                            (user.userValidations?.find((val)=>val.validated && val.type == UserValidationType.PhotoVerified)) ? 
                                            <td><FontAwesomeIcon color={"var(--chakra-colors-green-default)"} icon={faCircleCheck} size="1x"/></td> : 
                                            <td><FontAwesomeIcon color={"var(--chakra-colors-red-default)"} icon={faCircleXmark} size="1x"/></td>
                                        }
                                    </tr>
                                    <tr>
                                        <td><Text color={"white.half"} fontSize={"16px"} paddingRight={"20px"}>Datos Completos</Text></td>
                                        {
                                            (user.userValidations?.find((val)=>val.validated && val.type == UserValidationType.ProfileUpdated)) ? 
                                            <td><FontAwesomeIcon color={"var(--chakra-colors-green-default)"} icon={faCircleCheck} size="1x"/></td> : 
                                            <td><FontAwesomeIcon color={"var(--chakra-colors-red-default)"} icon={faCircleXmark} size="1x"/></td>
                                        }
                                    </tr>
                                    <tr>
                                        <td><Text color={"white.half"} fontSize={"16px"}>Número Celular</Text></td>
                                        {
                                            (user.userValidations?.find((val)=>val.validated && val.type == UserValidationType.PhoneVerified)) ? 
                                            <td><FontAwesomeIcon color={"var(--chakra-colors-green-default)"} icon={faCircleCheck} size="1x"/></td> : 
                                            <td><FontAwesomeIcon color={"var(--chakra-colors-red-default)"} icon={faCircleXmark} size="1x"/></td>
                                        }
                                    </tr>
                                    <tr>
                                        <td><Text color={"white.half"} fontSize={"16px"}>Correo Electrónico</Text></td>
                                        {
                                            (user.userValidations?.find((val)=>val.validated && val.type == UserValidationType.EmailVerified)) ? 
                                            <td><FontAwesomeIcon color={"var(--chakra-colors-green-default)"} icon={faCircleCheck} size="1x"/></td> : 
                                            <td><FontAwesomeIcon color={"var(--chakra-colors-red-default)"} icon={faCircleXmark} size="1x"/></td>
                                        }
                                    </tr>
                                    <tr>
                                        <td><Text color={"white.half"} fontSize={"16px"} marginRight={"10px"}>Documento de Identificación</Text></td>
                                        {
                                            iconPersonalDocumentVerification()
                                        }
                                    </tr>
                                </tbody>
                            </table>
                        </Box>
                    </MyContainer>
                    <MyContainer>
                        <Text fontSize={"20px"}>Elegir el evento</Text>
                        <Box margin={{"base": "10px 0px 0px 0px", "sm": "10px 20px 0px 20px", "md": "10px 20px 0px 20px"}}>
                            <Select marginBottom={"15px"} 
                                    placeholder='Seleccione el evento' 
                                    {...sell("event",{
                                            required: "El evento es requerido",
                                            onChange: (e) => { onSelectEvent(e) }
                                        })} 
                                    isInvalid={(errors?.event?.message != null) ? true : false}>
                                {events.map((event: EventDate, index: number) => {
                                    return <option key={index} value={event.encId}> {event.event.title} - 🎤​ {event.event.artist.name} - 📅​​ {moment(event.date * 1000).format("DD MMMM. YYYY")}</option>
                                })}
                            </Select>
                            {
                                (eventSelected.encId) ? <EventCardSearch eventImage={eventSelected.event.image_url}
                                                                    eventName={eventSelected.event.title}
                                                                    artistName={eventSelected.event.artist.name}
                                                                    eventDate={eventSelected.date}></EventCardSearch> : <></>
                            }
                        </Box>
                    </MyContainer>
                    <MyContainer>
                        <Text fontSize={"20px"}>Información de la entrada</Text>
                        <Grid templateColumns="repeat(4, 1fr)" gap={3} margin={{"base": "10px 0px 0px 0px", "sm": "10px 20px 0px 20px", "md": "10px 20px 0px 20px"}}> 
                            <GridItem colSpan={{base: 5, sm: 5, md: 2}}>
                                <Select placeholder='Seleccione la zona' 
                                        {...sell("zone", {required: "La zona es requerido"})} 
                                        isInvalid={(errors?.zone?.message != null) ? true : false}>
                                    {
                                        zones.map((zone: Zone, index: number) => {
                                            return <option key={index} value={zone.encId}>{zone.name}</option>;
                                        })
                                    }
                                </Select>
                            </GridItem>
                            <GridItem colSpan={{base: 5, sm: 5, md: 2}}>
                                <InputGroup>
                                    <InputLeftAddon bg={"#0a272e"}>
                                        S/.
                                    </InputLeftAddon>
                                    <Input type='text' 
                                           placeholder='Ingrese precio' 
                                           {...sell("price",{
                                                required: "El precio es requerido",
                                                onChange: (e) => { handlePrecioChange(e) },
                                                min: 1
                                            })} 
                                           isInvalid={(errors?.price?.message != null) ? true : false}/>
                                </InputGroup>
                            </GridItem>
                            <GridItem colSpan={{base: 5, sm: 5, md: 2}}>
                                <VStack width={"100%"} alignItems={"start"}>
                                    <Input placeholder="Ingresar butaca"
                                        {...sell("seat", {maxLength: {value: 15, message: "La butaca no debe ser tener de 15 caracteres"}})}
                                        isInvalid={(errors?.seat?.message != null) ? true : false} ></Input>
                                    <Text color={"white.half"} fontSize={"14px"}>La butaca no es obligatorio, pero ingreselo si la entrada es numerada con una butaca</Text>
                                </VStack>
                            </GridItem>
                        </Grid>
                    </MyContainer>
                    <MyContainer>
                        <Text fontSize={"20px"}>¿Donde quisieras promocionar?</Text>
                        <Text color={"white.half"} fontSize={"14px"}>Escoge máximo 2 aplicaciónes donde quisieras que tu entrada se promocione y se venda más rapido!</Text>
                        <Grid templateColumns="repeat(6, 1fr)" gap={3} margin={{"base": "10px 0px 0px 0px", "sm": "10px 20px 0px 20px", "md": "10px 20px 0px 20px"}}> 
                            <GridItem colSpan={{base: 6, sm: 6, md: 2}}>
                            <Checkbox {...sell("facebookApp")}>
                                    <FontAwesomeIcon icon={faSquareFacebook} />
                                    <Text as={"label"} fontSize={"15px"} marginLeft={"8px"}>Facebook</Text>
                                </Checkbox>
                            </GridItem>
                            <GridItem colSpan={{base: 6, sm: 6, md: 2}}>
                                <Checkbox {...sell("tiktokApp")}>
                                    <FontAwesomeIcon icon={faTiktok} />
                                    <Text as={"label"} fontSize={"15px"} marginLeft={"8px"}>Tiktok</Text>
                                </Checkbox>
                            </GridItem>
                            <GridItem colSpan={{base: 6, sm: 6, md: 2}}>
                                <Checkbox {...sell("instagramApp")}>
                                    <FontAwesomeIcon icon={faSquareInstagram} />
                                    <Text as={"label"} fontSize={"15px"} marginLeft={"8px"}>Instagram</Text>
                                </Checkbox>
                            </GridItem>
                        </Grid>
                    </MyContainer>
                    <MyContainer>
                        <Text fontSize={"20px"}>¿Deseas dejar algun comentario del ticket? (Opcional)</Text>
                        <Text color={"white.half"} fontSize={"14px"}>Este comentario ayudará al comprador a saber mas sobre el ticket</Text>
                        <Box margin={{"base": "10px 0px 0px 0px", "sm": "10px 20px 0px 20px", "md": "10px 20px 0px 20px"}}>
                            <Textarea {...sell("comment")} placeholder="Ingresar comentario (opcional)"/>
                        </Box>
                    </MyContainer>
                    <MyContainer>
                        <Checkbox isInvalid={(errors?.acceptSellTerms?.message != null) ? true : false}
                                 {...sell("acceptSellTerms", {required: "Aceptar el consentimiento de venta es obligatorio"})}><Text fontSize={"15px"}>Doy mi consentimiento de tener la entrada original y en caso de encontrarse algún tipo de fraude seré responsable de los daños y prejuicios sucedidos</Text></Checkbox>
                    </MyContainer>
                    {
                        /*
                            <MyContainer>
                                <Text fontSize={"20px"}>Subir entrada (formato PDF)</Text>
                                <Text color={"white.half"} fontSize={"16px"}>Sube la entrada E-Ticket para poder validar que tengas la entrada, no guardaremos la entrada </Text>
                                <Box margin={{"base": "10px 0px 0px 0px", "sm": "10px 20px 0px 20px", "md": "10px 20px 0px 20px"}}>
                                    <FileUploader 
                                        acceptFiles={{"application/pdf": [".pdf"]}}
                                        maxFiles={1}
                                        onChange={(files) => {setFiles(files)}}
                                        backgroundColor="primary.moreLight" 
                                        description="Selecciona o arrastra aquí el archivo de tu entrada en formato PDF"/>
                                </Box>
                            </MyContainer>
                        */
                    }
                    <VStack textAlign={"center"}>
                        <MyButton textColor="white" 
                                backgroundColor="secondary.default" 
                                backgroundColorHover="secondary.dark" 
                                title={"Crear anuncio de mi entrada!"}
                                fontSize="18px"
                                padding="14px"
                                onClick={sellTicket}
                                isLoading={loading}></MyButton>
                        <Text color={"red.default"} textAlign={"center"} fontSize={"14px"} marginTop={"10px"}>
                            {errorMessage && errorMessage}
                            {(Object.values(errors).length != 0) && <p>{Object.values(errors)[0]?.message + ""}</p>}
                        </Text>
                    </VStack>
                </VStack>
            </Box> 
        </>
    );
};

export default SellTicket;