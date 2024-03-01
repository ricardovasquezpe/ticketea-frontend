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
                    <SectionTitle title="Quiénes somos nosotros?" asH1={true}/>
                    <MyContainer>
                        <VStack gap={3} alignItems={"start"} fontSize={"16px"}>
                            <Text>
                                Ante el notorio número de estafas en la reventa de entradas de eventos, nace Ticketea con el objetivo de acabar con las estafas por medio de una plataforma segura, fácil y sin inconvenientes.
                            </Text>
                            <Text>
                                <Text fontWeight={"bold"}>¿Cómo nació la idea?</Text>
                                En el 2021 se presentaba una famosa banda en el estadio nacional del Perú, agotándose las entradas en zona VIP. Un miembro del equipo se arriesgó al comprar la entrada a un revendedor por redes sociales. Llegando al evento se llevó la sorpresa que lo habían estafado con una entrada falsa a él y a otras personas más. Al notar que dicha estafa llegó incluso a las noticias, se puso en acción con el resto del equipo y nació Ticketea
                            </Text>
                            <Text>
                                <Text fontWeight={"bold"}>Futuro de Ticketea</Text>
                                Tenemos la firme idea de habilitar la transacción de la reventa de la entrada atravez de ticketea, donde ticketea sea el intermediario y moderador de la transacción
                            </Text>
                        </VStack>
                    </MyContainer>
                </VStack>
            </Box>
        </>
    );
};