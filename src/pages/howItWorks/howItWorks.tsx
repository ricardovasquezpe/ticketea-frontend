import { Box, Center, Grid, GridItem, Text, VStack } from "@chakra-ui/react";
import { useEffect, useMemo } from "react";
import styles from "./howItWorks.module.css";
import Utils from "../../utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faMagnifyingGlass, faTicket } from "@fortawesome/free-solid-svg-icons";

export const HowItWorks = () => {
    const imageNumber = useMemo(() => Utils.generateRandom(3, 8), []);

    useEffect(() => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }, []);

    return (
        <>
            <Box className={styles.parent}>
                <Box className={styles.background} style={{backgroundImage: "url(/images/party-banner-"+imageNumber+".jpg)"}}></Box>
                <Box paddingBottom={"80px"} paddingTop={"80px"} paddingLeft={"15px"} paddingRight={"15px"}>
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
                        </VStack>
                    </Center>
                </Box>
            </Box>
            <Box marginTop={{"base": "-75px", "sm": "-75px", "customMd": "-90px"}} padding={{"base": "40px 1.5rem", "sm": "40px 1.5rem", "customMd": "40px 250px", "customLg": "40px 350px", "customXl": "40px 450px"}}>
                
            </Box>
        </>
    );
};