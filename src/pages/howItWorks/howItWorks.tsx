import { Box, Center, Grid, GridItem, HStack, Image, Text, VStack, useToast } from "@chakra-ui/react";
import { useEffect, useMemo } from "react";
import styles from "./howItWorks.module.css";
import Utils from "../../utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShieldHeart } from "@fortawesome/free-solid-svg-icons";
import { MyButton } from "../../components/myButton/myButton";
import { useNavigate } from "react-router-dom";
import { MyContainer } from "../../components/myContainer/myContainer";
import { useModal } from "../../config/modal/use-modal";
import { Modals } from "../../config/modal/modal-config";
import Session from "../../utils/session";
import { StarIcon } from "@chakra-ui/icons";
import { MySeo } from "../../components/mySeo/mySeo";

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
            navigate("/mi-cuenta");
            return;
        }

        registerModal.open({
            onSave: () => {
                registerModal.close();
                navigate("/mi-cuenta");
                toast({
                    title: 'Gracias por registrarte! Ahora ya puedes anunciar tus entradas y comprar!',
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
            <MySeo title={`¿Cómo funciona? | Ticketea!`}
                   description={`Compra la entrada al evento que quieres asistir de manera segura con nuestros vendedores verificados rapido y facil`}
                   link={`https://ticketea.me/como-funciona`}
                   image={"/images/logo.png"}/>
            <Box className={styles.parent}>
                <Box className={styles.background} style={{backgroundImage: "url(/images/party-banner-"+imageNumber+".jpg)"}}></Box>
                <Box paddingBottom={"50px"} paddingTop={"60px"} paddingLeft={"15px"} paddingRight={"15px"}>
                    <Center textAlign={"center"}>
                        <VStack gap={8}>
                            <Text as={"h1"} fontSize={"30px"} fontFamily={"montserratBold"} textShadow={"2px 3px 5px rgba(0,0,0,0.5)"}>3 simples pasos para obtener tu entrada de manera rápida y segura</Text>
                            <Grid templateColumns="repeat(6, 1fr)" gap={10} width={"70%"}>
                                <GridItem colSpan={{base: 6, sm: 6, md: 2}}>
                                    <VStack gap={5}>
                                        <Box background={"secondary.dark"} borderRadius={"0.625rem"} padding={"15px"}>
                                            <Image src={"/images/how/search_event.png"} width={"70px"}></Image>
                                            {/*<FontAwesomeIcon icon={faMagnifyingGlass} size="3x"/>*/}
                                        </Box>
                                        <Text fontSize={"20px"} textShadow={"2px 3px 5px rgba(0,0,0,0.5)"}>Busca el evento de tu interés y ve la lista de vendedores</Text>
                                    </VStack>
                                </GridItem>
                                <GridItem colSpan={{base: 6, sm: 6, md: 2}}>
                                    <VStack gap={5}>
                                        <Box background={"secondary.dark"} borderRadius={"0.625rem"} padding={"15px"}>
                                            <Image src={"/images/how/select_seller.png"} width={"70px"}></Image>
                                            {/*<FontAwesomeIcon icon={faPeopleArrows} size="3x"/>*/}
                                        </Box>
                                        {/*<Text fontSize={"20px"} textShadow={"2px 3px 5px rgba(0,0,0,0.5)"}>Elige al que mas te convenga y compra de manera facil y segura</Text> */}
                                        <Text fontSize={"20px"} textShadow={"2px 3px 5px rgba(0,0,0,0.5)"}>Escoge a uno y ponte en contacto con el vendedor</Text>
                                    </VStack>
                                </GridItem>
                                <GridItem colSpan={{base: 6, sm: 6, md: 2}}>
                                    <VStack gap={5}>
                                        <Box background={"secondary.dark"} borderRadius={"0.625rem"} padding={"15px"}>
                                            <Image src={"/images/how/buy_ticket.png"} width={"70px"}></Image>
                                            {/*<FontAwesomeIcon icon={faTicket} size="3x"/>*/}
                                        </Box>
                                        <Text fontSize={"20px"} textShadow={"2px 3px 5px rgba(0,0,0,0.5)"}>Recuerda nominar la entrada y disfruta del evento!</Text>
                                    </VStack>
                                </GridItem>
                            </Grid>
                            <Text width={"70%"} color={"white.half"}>Recuerda que los vendedores se encuentran verificados por nuestra plataforma. Al adquirir una entrada asegurate de nominarla a tu nombre para que disfrutes el evento!</Text>
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
                        <Text fontSize={"23px"}>¿Cuáles son los métodos que utilizamos para verificar a nuestros vendedores?</Text>
                    </Box>
                    <MyContainer>
                        <VStack gap={7} width={"100%"} padding={"10px"}>
                            <Grid templateColumns="repeat(15, 1fr)" gap={5} width={{base: "auto", sm: "100%"}}>
                                <GridItem colSpan={{base: 15, sm: 2, md: 2}} textAlign={"center"}>
                                    <Image src={"/images/how/dni_validation.png"} width={"100px"} display={"block"} margin={"auto"}></Image>
                                    {/*<FontAwesomeIcon icon={faIdCard} size="2x"/>*/}
                                </GridItem>
                                <GridItem colSpan={{base: 15, sm: 13, md: 13}} textAlign={{base: "center", sm: "start"}} padding={{base: "0px 40px 0px 40px", sm: "0px"}}>
                                    <Text fontSize={"20px"}>Validación del DNI físico con RENIEC</Text>
                                    <Text color={"white.half"}>El DNI físico se escanea por ambos lados y se valida con el sistema de RENIEC. Así verificamos la veracidad de los datos ingresados</Text>  
                                </GridItem>
                            </Grid>
                            <Grid templateColumns="repeat(15, 1fr)" gap={5} width={{base: "auto", sm: "100%"}}>
                                <GridItem colSpan={{base: 15, sm: 2, md: 2}} textAlign={"center"}>
                                    <Image src={"/images/how/personal_data_validation.png"} width={"100px"} display={"block"} margin={"auto"}></Image>
                                    {/*<FontAwesomeIcon icon={faAddressBook} size="2x"/>*/}
                                </GridItem>
                                <GridItem colSpan={{base: 15, sm: 13, md: 13}} textAlign={{base: "center", sm: "start"}} padding={{base: "0px 40px 0px 40px", sm: "0px"}}>
                                    <Text fontSize={"20px"}>Validación de datos personales</Text>
                                    <Text color={"white.half"}>Se requiere al vendedor cada uno de sus datos como nombres completos, fecha de nacimiento, DNI, foto de perfil, etc. Y validamos que todos los datos coincidan con su documento de identificación</Text>
                                </GridItem>
                            </Grid>
                            <Grid templateColumns="repeat(15, 1fr)" gap={5} width={{base: "auto", sm: "100%"}}>
                                <GridItem colSpan={{base: 15, sm: 2, md: 2}} textAlign={"center"}>
                                    <Image src={"/images/how/email_validation.png"} width={"100px"} display={"block"} margin={"auto"}></Image>
                                    {/*<FontAwesomeIcon icon={faAt} size="2x"/>*/}
                                </GridItem>
                                <GridItem colSpan={{base: 15, sm: 13, md: 13}} textAlign={{base: "center", sm: "start"}} padding={{base: "0px 40px 0px 40px", sm: "0px"}}>
                                    <Text fontSize={"20px"}>Validación de datos de contacto</Text>
                                    <Text color={"white.half"}>El vendedor brinda un número de celular y correo electrónico al momento de su registro, los cuáles se validan</Text>  
                                </GridItem>
                            </Grid>
                        </VStack>
                        <Text fontSize={"16px"} color={"white.half"} marginTop={"10px"}> * No permitimos que el vendedor cambie sus datos más de 2 veces así aseguramos que el vendedor siempre sea verificado</Text>
                    </MyContainer>
                </VStack>
                <br />
                <br />
                <VStack gap={6}>
                    <Box textAlign={"center"}>
                        <Text textAlign={"center"} fontSize={"30px"} marginBottom={"10px"}>Sé un vendedor <Box display={"inline-block"} borderRadius={"0.625rem"} paddingLeft={"10px"} paddingRight={"10px"} background={"gold.default"}><Text color={"black"}>verificado <StarIcon marginTop={"-5px"} color={"#323232"} boxSize={5}/></Text></Box></Text>
                        <Text>Cumpliendo estos 3 simples pasos</Text>
                    </Box>
                    <Grid templateColumns="repeat(6, 1fr)" gap={4} width={"100%"}>
                        <GridItem colSpan={{base: 6, sm: 6, md: 2}}>
                            <MyContainer>
                                <VStack gap={5} padding={"15px"} textAlign={"center"}>
                                    <Image src={"/images/how/register_seller.png"} width={"80px"}></Image>
                                    {/*<FontAwesomeIcon icon={faPersonCircleCheck} size="3x"/>*/}
                                    <Text fontSize={"20px"} textShadow={"2px 3px 5px rgba(0,0,0,0.5)"}>Regístrate, completa tus datos y verifícate</Text>
                                </VStack>
                            </MyContainer>
                        </GridItem>
                        <GridItem colSpan={{base: 6, sm: 6, md: 2}}>
                            <MyContainer>
                                <VStack gap={5} padding={"15px"} textAlign={"center"}>
                                    <Image src={"/images/how/seller_announce.png"} width={"80px"}></Image>
                                    {/*<FontAwesomeIcon icon={faCartShopping} size="3x"/>*/}
                                    <Text fontSize={"20px"} textShadow={"2px 3px 5px rgba(0,0,0,0.5)"}>Anuncia tu entrada y <Text fontFamily={"montserratBold"} display={"inline-block"}>Ticketea</Text> lo pondrá visible para posibles compradores</Text>
                                </VStack>
                            </MyContainer>
                        </GridItem>
                        <GridItem colSpan={{base: 6, sm: 6, md: 2}}>
                            <MyContainer>
                                <VStack gap={5} padding={"15px"} textAlign={"center"}>
                                    <Image src={"/images/how/shake_hand_seller.png"} width={"80px"}></Image>
                                    {/*<FontAwesomeIcon icon={faHandshake} size="3x"/>*/}
                                    <Text fontSize={"20px"} textShadow={"2px 3px 5px rgba(0,0,0,0.5)"}>Nomina la entrada con el comprador y obtén tu venta!</Text>
                                </VStack>
                            </MyContainer>
                        </GridItem>
                    </Grid>
                    <MyButton textColor="black" 
                            backgroundColor="gold.default" 
                            backgroundColorHover="gold.dark" 
                            title={"Únete ahora!"}
                            fontSize="22px"
                            padding="20px 30px 20px 30px"
                            onClick={openRegisterModal}/>
                </VStack>
            </Box>
        </>
    );
};

export default HowItWorks;