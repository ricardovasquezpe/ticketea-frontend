import { Box, Center, Grid, GridItem, HStack, Text, VStack } from "@chakra-ui/react";
import { useEffect, useMemo } from "react";
import styles from "./howItWorks.module.css";
import Utils from "../../utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressBook, faAt, faCartShopping, faIdCard, faMagnifyingGlass, faShieldHeart, faTicket } from "@fortawesome/free-solid-svg-icons";
import { MyButton } from "../../components/myButton/myButton";
import { useNavigate } from "react-router-dom";

export const HowItWorks = () => {
    const imageNumber = useMemo(() => Utils.generateRandom(3, 8), []);
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }, []);

    return (
        <>
            <Box className={styles.parent}>
                <Box className={styles.background} style={{backgroundImage: "url(/images/party-banner-"+imageNumber+".jpg)"}}></Box>
                <Box paddingBottom={"50px"} paddingTop={"60px"} paddingLeft={"15px"} paddingRight={"15px"}>
                    <Center textAlign={"center"}>
                        <VStack gap={14}>
                            <Text fontSize={"30px"} fontFamily={"montserratBold"} textShadow={"2px 3px 5px rgba(0,0,0,0.5)"}>Compra tu entrada con un vendedor verificado y de confianza</Text>
                            <Grid templateColumns="repeat(6, 1fr)" gap={10} width={"70%"}>
                                <GridItem colSpan={{base: 6, sm: 6, md: 2}}>
                                    <VStack gap={5}>
                                        <Box background={"#0093D3"} borderRadius={"100px"} padding={"22px"}>
                                            <FontAwesomeIcon icon={faMagnifyingGlass} size="3x"/>
                                        </Box>
                                        <Text fontSize={"20px"} textShadow={"2px 3px 5px rgba(0,0,0,0.5)"}>Busca el evento y explora la lista de vendedores verificados</Text>
                                    </VStack>
                                </GridItem>
                                <GridItem colSpan={{base: 6, sm: 6, md: 2}}>
                                    <VStack gap={5}>
                                        <Box background={"#0093D3"} borderRadius={"100px"} padding={"22px"}>
                                            <FontAwesomeIcon icon={faCartShopping} size="3x"/>
                                        </Box>
                                        <Text fontSize={"20px"} textShadow={"2px 3px 5px rgba(0,0,0,0.5)"}>Elige al que mas te convenga y compra de manera facil y segura</Text>
                                    </VStack>
                                </GridItem>
                                <GridItem colSpan={{base: 6, sm: 6, md: 2}}>
                                    <VStack gap={5}>
                                        <Box background={"#0093D3"} borderRadius={"100px"} padding={"22px"}>
                                            <FontAwesomeIcon icon={faTicket} size="3x"/>
                                        </Box>
                                        <Text fontSize={"20px"} textShadow={"2px 3px 5px rgba(0,0,0,0.5)"}>Asegurate de monimar tu entrada con el vendedor</Text>
                                    </VStack>
                                </GridItem>
                            </Grid>
                            <MyButton textColor="white" 
                                    backgroundColor="secondary.default" 
                                    backgroundColorHover="secondary.dark" 
                                    title={"Busca tu entrada ahora!"}
                                    fontSize="22px"
                                    padding="20px 30px 20px 30px"
                                    onClick={()=>{navigate("/")}}/>
                        </VStack>
                    </Center>
                </Box>
            </Box>
            <Box padding={{"base": "40px 1.5rem", "sm": "40px 1.5rem", "customMd": "40px 250px", "customLg": "40px 350px", "customXl": "40px 450px"}}>
                <VStack gap={6}>
                    <HStack>
                        <Text fontSize={"30px"}>Tu seguridad con </Text>
                        <Text fontSize={"30px"} color='#4CAF50'>TicketeaProtect</Text>
                        <FontAwesomeIcon color='#4CAF50' style={{marginTop: "-5px"}} icon={faShieldHeart} size="xl"/>
                    </HStack>
                    <Box textAlign={"center"}>
                        <Text fontSize={"23px"}>TicketProtect es un sistema integrado que valida la identificación del vendedor con diferentes metodos</Text>
                        <Text fontSize={"16px"} color={"white.half"} marginTop={"10px"}> * No permitimos que el vendedor cambie sus datos mas de vecez asi aseguramos que el vendedor siempre sea el verificado</Text>
                    </Box>
                    <VStack gap={7} margin={"20px"} width={"100%"}>
                        <HStack gap={5} width={"100%"}>
                            <FontAwesomeIcon color="#959595" style={{marginTop: "-5px"}} icon={faIdCard} size="2x"/>
                            <Box>
                                <Text fontSize={"20px"}>Validación del DNI físico con RENIEC</Text>
                                <Text color={"white.half"}>Se escanea el DNI físico (frontal y posterior) y se valida con el sistema de RENIEC para verificar la veracidad de los datos ingresados por el vendedor</Text>  
                            </Box>
                        </HStack>
                        <HStack gap={5} width={"100%"}>
                            <FontAwesomeIcon color="#959595" style={{marginTop: "-5px"}} icon={faAddressBook} size="2x"/>
                            <Box>
                                <Text fontSize={"20px"}>Validación de cada uno de sus datos</Text>
                                <Text color={"white.half"}>Se requiere al vendedor cada uno de sus datos como nombres completos, fecha de nacimiento, DNI, foto de perfil, etc. Y validamos que todos los datos coincidan con su documento de identificación</Text>  
                            </Box>
                        </HStack>
                        <HStack gap={5} width={"100%"}>
                            <FontAwesomeIcon color="#959595" style={{marginTop: "-5px"}} icon={faAt} size="2x"/>
                            <Box>
                                <Text fontSize={"20px"}>Validación del número celular y correo electrónico (no spams)</Text>
                                <Text color={"white.half"}>Se confirma que el numero celular y correo electronico sean los correctos y los pertenecientes al vendedor</Text>  
                            </Box>
                        </HStack>
                    </VStack>
                </VStack>
            </Box>
        </>
    );
};