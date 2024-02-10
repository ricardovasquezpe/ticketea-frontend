import { Box, Grid, GridItem, HStack, Input, InputGroup, InputLeftAddon, Select, Text, VStack } from "@chakra-ui/react";
import { SectionTitle } from "../../components/sectionTitle/sectionTitle";
import { MyContainer } from "../../components/myContainer/myContainer";
import { MyButton } from "../../components/myButton/myButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { EventCardSearch } from "../../components/eventCardSearch/eventCardSearch";
import { FileUploader } from "../../components/fileUploader/fileUploader";
import { useNavigate } from "react-router-dom";

export const SellTicket = () => {
    const navigate = useNavigate();

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
                                <tr>
                                    <td><Text paddingRight={"20px"}>Datos Completos</Text></td>
                                    <td><FontAwesomeIcon color={"var(--chakra-colors-green-default)"} icon={faCircleCheck} size="1x"/></td>
                                </tr>
                                <tr>
                                    <td><Text>DNI sin verificar</Text></td>
                                    <td><FontAwesomeIcon color={"var(--chakra-colors-red-default)"} icon={faCircleXmark} size="1x"/></td>
                                </tr>
                                <tr>
                                    <td><Text>Celular Verificado</Text></td>
                                    <td><FontAwesomeIcon color={"var(--chakra-colors-green-default)"} icon={faCircleCheck} size="1x"/></td>
                                </tr>
                                <tr>
                                    <td><Text>Email Verificado</Text></td>
                                    <td><FontAwesomeIcon color={"var(--chakra-colors-green-default)"} icon={faCircleCheck} size="1x"/></td>
                                </tr>
                            </table>
                        </Box>
                    </MyContainer>
                    <MyContainer>
                        <Text fontSize={"20px"}>Seleccionar evento</Text>
                        <Box margin={{"base": "10px 0px 0px 0px", "sm": "10px 20px 0px 20px", "md": "10px 20px 0px 20px"}}>
                            <Select marginBottom={"15px"} placeholder='Seleccione el evento'>
                                <option value='option1'>World Hottest Tour - Bad Bunny - 19 Feb. 2024</option>
                                <option value='option2'>Martin Garrix en Lima - Martin Garrix - 20 Mar. 2024</option>
                                <option value='option3'>Luis Miguel en Lima - Luis Miguel - 30 Abr. 2024</option>
                            </Select>
                            <EventCardSearch 
                                            eventImage={"https://cdn.teleticket.com.pe/especiales/badbunny2022-fecha2/images/ICS012_rs.jpg"}
                                            eventName={"World Hottest Tour"}
                                            artistName={"Bad Bunny"}
                                            eventDate={"19 feb 2024"}
                                            eventId={1}></EventCardSearch>
                        </Box>
                    </MyContainer>
                    <MyContainer>
                        <Text fontSize={"20px"}>Información de la entrada</Text>
                        <Grid templateColumns="repeat(4, 1fr)" gap={3} margin={{"base": "10px 0px 0px 0px", "sm": "10px 20px 0px 20px", "md": "10px 20px 0px 20px"}}> 
                            <GridItem colSpan={{base: 5, sm: 5, md: 2}}>
                                <Select placeholder='Seleccione la zona'>
                                    <option value='option1'>Zona A</option>
                                    <option value='option2'>Zona B</option>
                                    <option value='option3'>Zona VIP</option>
                                </Select>
                            </GridItem>
                            <GridItem colSpan={{base: 5, sm: 5, md: 2}}>
                                <InputGroup>
                                    <InputLeftAddon bg={"#0a272e"}>
                                        S/.
                                    </InputLeftAddon>
                                    <Input type='text' placeholder='Ingrese precio' />
                                </InputGroup>
                            </GridItem>
                            <GridItem colSpan={{base: 5, sm: 5, md: 2}}>
                                <Input placeholder="Ingresar butaca"></Input>
                            </GridItem>
                        </Grid>
                    </MyContainer>
                    <MyContainer>
                        <Text fontSize={"20px"}>Subir entrada (PDF)</Text>
                        <Text color={"white.half"} fontSize={"16px"}>Sube la entrada E-Ticket para poder validar que tengas la entrada</Text>
                        <Box margin={{"base": "10px 0px 0px 0px", "sm": "10px 20px 0px 20px", "md": "10px 20px 0px 20px"}}>
                            <FileUploader backgroundColor="primary.moreLight" description="Selecciona o arrastra aquí el archivo de tu entrada"/>
                        </Box>
                    </MyContainer>
                    <Box textAlign={"center"}>
                        <MyButton textColor="white" 
                                backgroundColor="secondary.default" 
                                backgroundColorHover="secondary.dark" 
                                title={"Crear anuncio!"}
                                fontSize="18px"
                                padding="14px"></MyButton>
                    </Box>
                </VStack>
            </Box> 
        </>
    );
};