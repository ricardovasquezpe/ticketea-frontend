import { Box, Center, HStack, SimpleGrid, Text, VStack, useToast } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { MyButton } from "../myButton/myButton";
import styles from "./footer.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareFacebook, faSquareInstagram, faSquareTwitter, faTiktok } from "@fortawesome/free-brands-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useModal } from "../../config/modal/use-modal";
import { Modals } from "../../config/modal/modal-config";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { store } from "../../store/store";

export const Footer = () => {
    const toast = useToast();
    const registerModal = useModal<any>(Modals.RegisterModal);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isLogin, setIsLogin] = useState(store.getState().auth.isLoggedIn);

    useEffect(() => {
        const unsubscribe = store.subscribe(() => {
            var storeLoggedIn = store.getState().auth.isLoggedIn;
            setIsLogin(storeLoggedIn);
        });

        return () => {
            unsubscribe();
        };
    }, [dispatch]);

    const displayRegisterModal = () => {
        registerModal.open({
          onSave: () => {
            registerModal.close();
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
          },
          onCancel: () => {
            registerModal.close();
          },
        });
    }
    return (
        <>
            <Box bg={"primary.ligth"} padding={{"base": "30px 24px", "sm": "30px 24px", "customMd": "30px 250px", "customLg": "30px 350px", "customXl": "30px 450px"}} className={styles.parent}>
                <SimpleGrid columns={{sm: 1, md: 3}} spacing={10}>
                    <Box>
                        <VStack align={{"base": "center", "sm": "center", "md": "start"}}>
                            <Link to={"/"}>Nosotros</Link>
                            <Link to={"/"}>¿Cómo funciona?</Link>
                            <Link to={"/terms-conditions"}>Términos y condiciones</Link>
                        </VStack>
                    </Box>
                    <Box>
                        <VStack align={{"base": "center", "sm": "center", "md": "start"}}>
                            <Link to={"/"}>
                                <FontAwesomeIcon icon={faSquareFacebook} />
                                <Text className={styles.brands}>Facebook</Text>
                            </Link>
                            <Link to={"/"}>
                                <FontAwesomeIcon icon={faSquareInstagram} />
                                <Text className={styles.brands}>Instagram</Text>
                            </Link>
                            <Link to={"/"}>
                                <FontAwesomeIcon icon={faSquareTwitter} />
                                <Text className={styles.brands}>Twitter</Text>
                            </Link>
                            <Link to={"/"}>
                                <FontAwesomeIcon icon={faTiktok} />
                                <Text className={styles.brands}>Tiktok</Text>
                            </Link>
                        </VStack>
                    </Box>
                    <Center className="">
                        <VStack>
                            <Text
                                  align={"center"} 
                                  fontSize={"15px"} 
                                  color={"white.half"} 
                                  mb={"10px"}>No pierdas la oportunidad de ver a tu artista favorito</Text>
                            {(!isLogin) ? <MyButton textColor="white" 
                                    backgroundColor="secondary.default" 
                                    backgroundColorHover="secondary.dark" 
                                    title={"Registrate Ya!"}
                                    fontSize="22px"
                                    padding="20px 30px 20px 30px"
                                    onClick={()=>{displayRegisterModal()}}/> : <MyButton textColor="white" 
                                    backgroundColor="secondary.default" 
                                    backgroundColorHover="secondary.dark" 
                                    title={"Vende tu entrada!"}
                                    fontSize="22px"
                                    padding="20px 30px 20px 30px"
                                    onClick={()=>{navigate("/sell-ticket")}}/>}
                        </VStack>
                    </Center>
                </SimpleGrid>
            </Box>
            <Center h='70px' color='white.half'>
                <HStack>
                    <Text>Creado con</Text>
                    <FontAwesomeIcon icon={faHeart} className={styles.pulseHeart}/>
                    <Text>por</Text>
                    <Text>Ticketea @{new Date().getFullYear()}</Text>
                </HStack>
            </Center>
        </>
    );
};