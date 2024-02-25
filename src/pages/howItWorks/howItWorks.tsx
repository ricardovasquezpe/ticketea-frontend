import { Box, Center, Grid, GridItem, HStack, Text, VStack, useToast } from "@chakra-ui/react";
import { useEffect, useMemo } from "react";
import styles from "./howItWorks.module.css";
import Utils from "../../utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressBook, faAt, faCartShopping, faHandshake, faIdCard, faMagnifyingGlass, faPersonCircleCheck, faShieldHeart, faTicket } from "@fortawesome/free-solid-svg-icons";
import { MyButton } from "../../components/myButton/myButton";
import { useNavigate } from "react-router-dom";
import { MyContainer } from "../../components/myContainer/myContainer";
import { useModal } from "../../config/modal/use-modal";
import { Modals } from "../../config/modal/modal-config";
import Session from "../../utils/session";

export const HowItWorks = () => {
    const imageNumber = useMemo(() => Utils.generateRandom(3, 8), []);
    const navigate = useNavigate();
    const toast = useToast();

    useEffect(() => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }, []);

    const registerModal = useModal<any>(Modals.RegisterModal);
    const openRegisterModal = () => {
        if(Session.isLoggedIn()){
            navigate("/my-account");
            return;
        }

        registerModal.open({
            onSave: () => {
                registerModal.close();
                navigate("/my-account");
                toast({
                    title: 'Gracias por registrarte! ahora ya puedes anunciar tus entradas y comprar!',
                    description: "",
                    status: 'success',
                    containerStyle: {
                        fontSize: "16px"
                    },
                    duration: 9000,
                    isClosable: true,
                })
            },
            onClose: () => {
                registerModal.close();
            }
        });
    }

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
                    <HStack textAlign={"center"}>
                        <Text fontSize={"30px"}>Tu seguridad con <Text display={"inline-block"} fontFamily={"montserratBold"} fontSize={"30px"} color='#4CAF50'>TicketeaProtect</Text> <FontAwesomeIcon color='#4CAF50' style={{marginTop: "-5px"}} icon={faShieldHeart}/></Text>
                    </HStack>
                    <Box textAlign={"center"}>
                        <Text fontSize={"23px"}>TicketProtect es un sistema integrado que valida la identificación del vendedor con diferentes metodos</Text>
                        <Text fontSize={"16px"} color={"white.half"} marginTop={"10px"}> * No permitimos que el vendedor cambie sus datos mas de 2 vecez asi aseguramos que el vendedor siempre sea verificado</Text>
                    </Box>
                    <MyContainer>
                        <VStack gap={7} width={"100%"} padding={"10px"}>
                            <Grid templateColumns="repeat(15, 1fr)" gap={5} width={"100%"}>
                                <GridItem colSpan={{base: 10, sm: 1, md: 1}} textAlign={"center"}>
                                    <FontAwesomeIcon icon={faIdCard} size="2x"/>
                                </GridItem>
                                <GridItem colSpan={{base: 10, sm: 9, md: 14}} textAlign={{base: "center", sm: "start"}}>
                                    <Text fontSize={"20px"}>Validación del DNI físico con RENIEC</Text>
                                    <Text color={"white.half"}>Se escanea el DNI físico (frontal y posterior) y se valida con el sistema de RENIEC para verificar la veracidad de los datos ingresados por el vendedor</Text>  
                                </GridItem>
                            </Grid>
                            <Grid templateColumns="repeat(15, 1fr)" gap={5} width={"100%"}>
                                <GridItem colSpan={{base: 10, sm: 1, md: 1}} textAlign={"center"}>
                                    <FontAwesomeIcon icon={faAddressBook} size="2x"/>
                                </GridItem>
                                <GridItem colSpan={{base: 10, sm: 9, md: 14}} textAlign={{base: "center", sm: "start"}}>
                                    <Text fontSize={"20px"}>Validación de cada uno de sus datos</Text>
                                    <Text color={"white.half"}>Se requiere al vendedor cada uno de sus datos como nombres completos, fecha de nacimiento, DNI, foto de perfil, etc. Y validamos que todos los datos coincidan con su documento de identificación</Text>
                                </GridItem>
                            </Grid>
                            <Grid templateColumns="repeat(15, 1fr)" gap={5} width={"100%"}>
                                <GridItem colSpan={{base: 10, sm: 1, md: 1}} textAlign={"center"}>
                                    <FontAwesomeIcon icon={faAt} size="2x"/>
                                </GridItem>
                                <GridItem colSpan={{base: 10, sm: 9, md: 14}} textAlign={{base: "center", sm: "start"}}>
                                    <Text fontSize={"20px"}>Validación del número celular y correo electrónico (no spams)</Text>
                                    <Text color={"white.half"}>Se confirma que el numero celular y correo electronico sean los correctos y los pertenecientes al vendedor</Text>  
                                </GridItem>
                            </Grid>
                        </VStack>
                    </MyContainer>
                </VStack>
                <br />
                <br />
                <VStack gap={6}>
                    <Text fontSize={"30px"} marginBottom={"15px"}>Sé un vendedor <Text display={"inline-block"} color={"gold.default"}>verificado!</Text></Text>
                    <Grid templateColumns="repeat(6, 1fr)" gap={10} width={"100%"}>
                        <GridItem colSpan={{base: 6, sm: 6, md: 2}}>
                            <MyContainer>
                                <VStack gap={5} padding={"15px"} textAlign={"center"}>
                                    <FontAwesomeIcon icon={faPersonCircleCheck} size="3x"/>
                                    <Text fontSize={"20px"} textShadow={"2px 3px 5px rgba(0,0,0,0.5)"}>Registrate, llena tus datos basicos y verificate</Text>
                                </VStack>
                            </MyContainer>
                        </GridItem>
                        <GridItem colSpan={{base: 6, sm: 6, md: 2}}>
                            <MyContainer>
                                <VStack gap={5} padding={"15px"} textAlign={"center"}>
                                    <FontAwesomeIcon icon={faCartShopping} size="3x"/>
                                    <Text fontSize={"20px"} textShadow={"2px 3px 5px rgba(0,0,0,0.5)"}>Anuncia tu entrada y <Text fontFamily={"montserratBold"} display={"inline-block"}>Ticketea</Text> lo pondra visible a posibles compradores</Text>
                                </VStack>
                            </MyContainer>
                        </GridItem>
                        <GridItem colSpan={{base: 6, sm: 6, md: 2}}>
                            <MyContainer>
                                <VStack gap={5} padding={"15px"} textAlign={"center"}>
                                    <FontAwesomeIcon icon={faHandshake} size="3x"/>
                                    <Text fontSize={"20px"} textShadow={"2px 3px 5px rgba(0,0,0,0.5)"}>Nomina la entrada con el comprador y recibe el dinero en tu cuenta bancaria</Text>
                                </VStack>
                            </MyContainer>
                        </GridItem>
                    </Grid>
                    <MyButton textColor="black" 
                            backgroundColor="gold.default" 
                            backgroundColorHover="gold.dark" 
                            title={"Unete ahora!"}
                            fontSize="22px"
                            padding="20px 30px 20px 30px"
                            onClick={openRegisterModal}/>
                </VStack>
            </Box>
        </>
    );
};