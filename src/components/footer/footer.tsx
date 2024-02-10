import { Box, Center, HStack, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { MyButton } from "../myButton/myButton";
import styles from "./footer.module.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareFacebook, faSquareInstagram, faSquareTwitter, faTiktok } from "@fortawesome/free-brands-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useModal } from "../../config/modal/use-modal";
import { Modals } from "../../config/modal/modal-config";

export const Footer = () => {
    const registerModal = useModal<any>(Modals.RegisterModal);
    const displayRegisterModal = () => {
        registerModal.open({
          onSave: () => {
            console.log("OnSave");
          },
          onClose: () => {
            console.log("onClose");
            registerModal.close();
          },
          onCancel: () => {
            console.log("onCancel");
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
                            <Link to={"/"}>Términos y condiciones</Link>
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
                            <MyButton textColor="white" 
                                    backgroundColor="secondary.default" 
                                    backgroundColorHover="secondary.dark" 
                                    title={"Registrate Ya!"}
                                    fontSize="22px"
                                    padding="20px 30px 20px 30px"
                                    onClick={()=>{displayRegisterModal()}}></MyButton>
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