import { Box, Text, VStack } from "@chakra-ui/react";
import { ReturnButton } from "../../components/returnButton/returnButton";
import { SectionTitle } from "../../components/sectionTitle/sectionTitle";
import { MyContainer } from "../../components/myContainer/myContainer";
import { useEffect } from "react";

export const HowItWorks = () => {
    useEffect(() => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }, []);
    
    return (
        <>
            <Box padding={{"base": "40px 1.5rem", "sm": "40px 1.5rem", "customMd": "40px 250px", "customLg": "40px 350px", "customXl": "40px 450px"}}>
                <VStack align='stretch' gap={5}>
                    <ReturnButton route="/ticket-detail"></ReturnButton>
                    <SectionTitle title="Terminos y condiciones"/>
                    <MyContainer>
                        <Text fontSize={"16px"}>
                            Los presentes Términos y Condiciones de Uso (en adelante “Términos y Condiciones”) regulan el acceso y la utilización de los usuarios de los servicios brindados por Teledistribución S.A. (en adelante) a través de su página web, (en adelante, la “Página Web”). Los usuarios del mencionado sitio web se encontrarán sujetos a los Términos y Condiciones, junto con todas las demás políticas y principios que rigen la Página Web y que son incorporados al presente por referencia. Los Términos y Condiciones indicados en este documento serán aplicables a cualquier acto celebrado entre cualquier Usuario de la Página Web y . El usuario declara haber leído los presentes Términos y Condiciones, y manifiesta su conformidad y aceptación al momento de hacer uso de la Página Web (en adelante, los “Usuarios”). Cualquier usuario que no acepte o se encuentre en desacuerdo con estos Términos Condiciones, los cuales tienen un carácter obligatorio y vinculante, deberá abstenerse de utilizar la Página Web.
                        </Text>
                    </MyContainer>
                </VStack>
            </Box>
        </>
    );
};