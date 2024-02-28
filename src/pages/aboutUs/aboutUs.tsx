import { Box, Text, VStack } from "@chakra-ui/react";
import { SectionTitle } from "../../components/sectionTitle/sectionTitle";
import { MyContainer } from "../../components/myContainer/myContainer";
import { useEffect } from "react";
import { MySeo } from "../../components/mySeo/mySeo";

export const AboutUs = () => {
    useEffect(() => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }, []);
    
    return (
        <>
            <MySeo title={`Nosotros | Ticketea!`}
                   description={`Compra la entrada al evento que quieres asistir de manera segura con nuestros vendedores verificados rapido y fácil`}
                   link={`https://ticketea.me/about-us`}
                   image={"/images/logo.png"}/>
            <Box padding={{"base": "40px 1.5rem", "sm": "40px 1.5rem", "customMd": "40px 250px", "customLg": "40px 350px", "customXl": "40px 450px"}}>
                <VStack align='stretch' gap={5}>
                    <SectionTitle title="¿Quienes somos nosotros?" asH1={true}/>
                    <MyContainer>
                        <VStack gap={3} alignItems={"start"} fontSize={"16px"}>
                            <Text>
                                Creamos Ticketea en el año 2022 con el objetivo de acabar con las estafas en las reventas de entradas para diferentes eventos en Perú, poder adquirir una de manera segura, facil y puedas asistir al evento sin problemas
                            </Text>
                            <Text>
                                <Text fontWeight={"bold"}>¿Cómo nació la idea?</Text>
                                La idea nació de uno de los fundadores quien fue estafado al comprar una entrada para un concierto, y buscando soluciones dio con la idea de crear Ticketea para no volver a ser estafado el y sus amigos
                            </Text>
                            <Text>
                                <Text fontWeight={"bold"}>Futuro de Ticketea</Text>
                                Tenemos la firme idea de habilitar la transaccion de la reventa de la entrada atravez de ticketea, donde ticketea sea el intermediario y moderador de la transaccion
                            </Text>
                        </VStack>
                    </MyContainer>
                </VStack>
            </Box>
        </>
    );
};