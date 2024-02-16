import { Box, Grid, GridItem, HStack, Input, InputGroup, InputLeftAddon, Select, Text, VStack } from "@chakra-ui/react";
import { SectionTitle } from "../../components/sectionTitle/sectionTitle";
import { MyContainer } from "../../components/myContainer/myContainer";
import { MyButton } from "../../components/myButton/myButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { EventCardSearch } from "../../components/eventCardSearch/eventCardSearch";
import { FileUploader } from "../../components/fileUploader/fileUploader";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useModal } from "../../config/modal/use-modal";
import { Modals } from "../../config/modal/modal-config";
import { getMyUserData } from "../../services/user.service";
import { User } from "../../services/models/user.model";
import { Event } from "../../services/models/event.model";
import { getEventsAvailable } from "../../services/event.service";
import { UserValidationType } from "../../utils/enums/userValidationType.enum";
import moment from 'moment/min/moment-with-locales';
import { Zone } from "../../services/models/zone.model";
import { getZonesByEventId } from "../../services/zone.service";
import { useForm } from "react-hook-form";
import { createTicket } from "../../services/ticket.service";

export const SellTicket = () => {
    const navigate = useNavigate();
    const [files, setFiles] = useState([] as File[]);
    const [user, setUser] = useState({} as User);
    const [events, setEvents] = useState([] as Event[]);
    const [eventSelected, setEventSelected] = useState({} as Event);
    const [zones, setZones] = useState([] as Zone[]);
    const { register: sell, trigger: sellTrigger, getValues: sellGetValues, formState: { errors }, setValue: sellSetValue  } = useForm();
    const loadingModal = useModal<any>(Modals.LoadingModal);
    const [errorMessage, setErrorMessage] = useState("" as any);

    useEffect(() => {
        loadingModal.open({title: "Cargando informacion de pago"});
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
            setEventSelected(events.find((ev) => ev.encId == eventId)!);
            var zonesResp = await getZonesByEventId(eventId);
            setZones(zonesResp.data);
        } else {
            setEventSelected({} as Event);
            setZones([]);
        }
    }

    const sellTicket = async () => {
        if(user.userValidations?.length != 5){
            setErrorMessage("Debes compeltar la verificación de tu perfil");
            return;
        }

        const isValid = await sellTrigger(["event", "price", "zone", "seat"], { shouldFocus: true });
        if(!isValid){
            setErrorMessage(Object.values(errors)[0]?.message);
            return;
        }

        if(files.length == 0){
            setErrorMessage("Debes subir tu entrada en formato PDF")
            return;
        }

        var formData = new FormData();
        formData.append("eventId", eventSelected.encId);
        formData.append("zoneId", sellGetValues().zone);
        formData.append("price", sellGetValues().price);
        formData.append("seat", sellGetValues().seat);
        formData.append("file", files[0]);
        //var res = await createTicket();
    }

    const handlePrecioChange = (e: any) => {
        let input = e.target.value;
        input = input.replace(/[^0-9.]/g, "");
        if (input.split(".").length > 2) {
            input = input.slice(0, -1);
        }

        sellSetValue("price", input);
    }

    return (
        <>
            <Box padding={{"base": "40px 1.5rem", "sm": "40px 1.5rem", "customMd": "40px 250px", "customLg": "40px 350px", "customXl": "40px 450px"}}>
                <VStack align='stretch' gap={5}>
                    <SectionTitle title="Vende tu entrada"/>
                    <MyContainer>
                        <HStack justifyContent="space-between">
                            <Text fontSize={"20px"}>Verificar identidad</Text>
                            <MyButton textColor="white" 
                                        backgroundColor="secondary.default" 
                                        backgroundColorHover="secondary.dark" 
                                        title={"Completar verificación"}
                                        fontSize="14px"
                                        padding="5px 10px"
                                        onClick={()=>navigate("/my-account")}
                                        size="xs"></MyButton>
                        </HStack>
                        <Box margin={{"base": "10px 0px 0px 0px", "sm": "10px 20px 0px 20px", "md": "10px 20px 0px 20px"}}>
                            <table>
                                <tbody>
                                    <tr>
                                        <td><Text paddingRight={"20px"}>Foto de perfil</Text></td>
                                        {
                                            (user.userValidations?.find((val)=>val.validated && val.type == UserValidationType.PhotoVerified)) ? 
                                            <td><FontAwesomeIcon color={"var(--chakra-colors-green-default)"} icon={faCircleCheck} size="1x"/></td> : 
                                            <td><FontAwesomeIcon color={"var(--chakra-colors-red-default)"} icon={faCircleXmark} size="1x"/></td>
                                        }
                                    </tr>
                                    <tr>
                                        <td><Text paddingRight={"20px"}>Datos Completos</Text></td>
                                        {
                                            (user.userValidations?.find((val)=>val.validated && val.type == UserValidationType.ProfileUpdated)) ? 
                                            <td><FontAwesomeIcon color={"var(--chakra-colors-green-default)"} icon={faCircleCheck} size="1x"/></td> : 
                                            <td><FontAwesomeIcon color={"var(--chakra-colors-red-default)"} icon={faCircleXmark} size="1x"/></td>
                                        }
                                    </tr>
                                    <tr>
                                        <td><Text>Numero Celular</Text></td>
                                        {
                                            (user.userValidations?.find((val)=>val.validated && val.type == UserValidationType.PhoneVerified)) ? 
                                            <td><FontAwesomeIcon color={"var(--chakra-colors-green-default)"} icon={faCircleCheck} size="1x"/></td> : 
                                            <td><FontAwesomeIcon color={"var(--chakra-colors-red-default)"} icon={faCircleXmark} size="1x"/></td>
                                        }
                                    </tr>
                                    <tr>
                                        <td><Text>Correo Electronico</Text></td>
                                        {
                                            (user.userValidations?.find((val)=>val.validated && val.type == UserValidationType.EmailVerified)) ? 
                                            <td><FontAwesomeIcon color={"var(--chakra-colors-green-default)"} icon={faCircleCheck} size="1x"/></td> : 
                                            <td><FontAwesomeIcon color={"var(--chakra-colors-red-default)"} icon={faCircleXmark} size="1x"/></td>
                                        }
                                    </tr>
                                    <tr>
                                        <td><Text marginRight={"10px"}>Documento de Identificación</Text></td>
                                        {
                                            (user.userValidations?.find((val)=>val.validated && val.type == UserValidationType.PersonalDocumentVerified)) ? 
                                            <td><FontAwesomeIcon color={"var(--chakra-colors-green-default)"} icon={faCircleCheck} size="1x"/></td> : 
                                            <td><FontAwesomeIcon color={"var(--chakra-colors-red-default)"} icon={faCircleXmark} size="1x"/></td>
                                        }
                                    </tr>
                                </tbody>
                            </table>
                        </Box>
                    </MyContainer>
                    <MyContainer>
                        <Text fontSize={"20px"}>Seleccionar evento</Text>
                        <Box margin={{"base": "10px 0px 0px 0px", "sm": "10px 20px 0px 20px", "md": "10px 20px 0px 20px"}}>
                            <Select marginBottom={"15px"} 
                                    placeholder='Seleccione el evento' 
                                    {...sell("event",{
                                            required: "La zona es requerido",
                                            onChange: (e) => { onSelectEvent(e) }
                                        })} 
                                    isInvalid={(errors?.event?.message != null) ? true : false}>
                                {events.map((event: Event, index: number) => {
                                    return <option key={index} value={event.encId}> {event.title} / {event.artist.name} / {moment(event.date * 1000).format("DD MMMM. YYYY h:mm A")}</option>
                                })}
                            </Select>
                            {
                                (eventSelected.encId) ? <EventCardSearch eventImage={eventSelected.image_url}
                                                                    eventName={eventSelected.title}
                                                                    artistName={eventSelected.artist.name}
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
                                        {...sell("seat", {maxLength: {value: 100, message: "La butaca no debe ser tener de 100 caracteres"}})}
                                        isInvalid={(errors?.seat?.message != null) ? true : false} ></Input>
                                    <Text color={"white.half"} fontSize={"14px"}>La butaca no es obligatorio, pero siempre es bueno especificarlo</Text>
                                </VStack>
                            </GridItem>
                        </Grid>
                    </MyContainer>
                    <MyContainer>
                        <Text fontSize={"20px"}>Subir entrada (formato PDF)</Text>
                        <Text color={"white.half"} fontSize={"16px"}>Sube la entrada E-Ticket para poder validar que tengas la entrada </Text>
                        <Box margin={{"base": "10px 0px 0px 0px", "sm": "10px 20px 0px 20px", "md": "10px 20px 0px 20px"}}>
                            <FileUploader 
                                acceptFiles={{"application/pdf": [".pdf"]}}
                                maxFiles={1}
                                onChange={(files) => {setFiles(files)}}
                                backgroundColor="primary.moreLight" 
                                description="Selecciona o arrastra aquí el archivo de tu entrada en formato PDF"/>
                        </Box>
                    </MyContainer>
                    <VStack textAlign={"center"}>
                        <MyButton textColor="white" 
                                backgroundColor="secondary.default" 
                                backgroundColorHover="secondary.dark" 
                                title={"Crear anuncio!"}
                                fontSize="18px"
                                padding="14px"
                                onClick={sellTicket}></MyButton>
                        <Text color={"red.default"} textAlign={"center"} fontSize={"14px"}>{errorMessage}</Text>
                    </VStack>
                </VStack>
            </Box> 
        </>
    );
};