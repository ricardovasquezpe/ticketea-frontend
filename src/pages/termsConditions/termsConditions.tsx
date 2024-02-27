import { Box, Text, VStack } from "@chakra-ui/react";
import { SectionTitle } from "../../components/sectionTitle/sectionTitle";
import { MyContainer } from "../../components/myContainer/myContainer";
import { useEffect } from "react";
import { MySeo } from "../../components/mySeo/mySeo";

export const TermsConditions = () => {
    useEffect(() => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }, []);
    
    return (
        <>
            <MySeo title={`Términos y condiciones | Ticketea!`}
                   description={`Compra la entrada al evento que quieres asistir de manera segura con nuestros vendedores verificados rapido y facil`}
                   link={`https://ticketea.me/how-works`}
                   image={"/images/logo.png"}/>
            <Box padding={{"base": "40px 1.5rem", "sm": "40px 1.5rem", "customMd": "40px 250px", "customLg": "40px 350px", "customXl": "40px 450px"}}>
                <VStack align='stretch' gap={5}>
                    <SectionTitle title="Términos y condiciones" asH1/>
                    <MyContainer>
                        <VStack gap={3} alignItems={"start"} fontSize={"16px"}>
                            <Text>
                                Bienvenido a Ticketea, la plataforma digital que conecta a vendedores de entradas para eventos con potenciales compradores. Al utilizar nuestro sitio web, usted acepta estar vinculado por estos Términos y Condiciones de Uso (en adelante, "Términos"), así como por nuestra Política de Privacidad. Si no está de acuerdo con alguno de los términos establecidos, no debe utilizar nuestros servicios.
                            </Text>
                            <Text>
                                <Text fontWeight={"bold"}>Servicios Ofrecidos</Text>
                                Ticketea proporciona una plataforma en línea para que los usuarios puedan vender y comprar entradas para eventos. No somos propietarios ni creadores de los eventos listados, y no vendemos entradas directamente.
                            </Text>
                            <Text>
                                <Text fontWeight={"bold"}>Registro y Cuenta de Usuario</Text>
                                Para utilizar algunos servicios de Ticketea, puede ser necesario registrarse y crear una cuenta. Usted es responsable de mantener la confidencialidad de su cuenta y contraseña, así como de todas las actividades que ocurran bajo su cuenta.
                            </Text>
                            <Text>
                                <Text fontWeight={"bold"}>Uso de la Plataforma</Text>
                                <Text>Vendedores: Al listar una entrada para la venta, usted declara y garantiza que tiene el derecho legal de vender dicha entrada, que la entrada es auténtica y válida para el evento descrito, y que cumplirá con todas las leyes aplicables en relación con la venta.</Text>
                                <Text>Compradores: Entiende que Ticketea actúa como un intermediario y que cualquier compra realizada a través de nuestra plataforma es un contrato directamente entre usted y el vendedor. Ticketea no garantiza la autenticidad, validez, o entrega puntual de las entradas compradas.</Text>
                            </Text>
                            <Text>
                                <Text fontWeight={"bold"}>Exclusión de Garantías y Limitación de Responsabilidad</Text>
                                <Text>Ticketea no verifica la autenticidad, legalidad, o validez de las entradas listadas en nuestra plataforma por los usuarios. Por lo tanto, no ofrecemos garantías en relación con las entradas o los eventos.</Text>
                                <Text>En ningún caso Ticketea o sus afiliados serán responsables por cualquier daño directo, indirecto, incidental, especial, consecuencial, o punitivo resultante del uso o incapacidad de uso de nuestro servicio, incluso si hemos sido informados de la posibilidad de tales daños.</Text>
                            </Text>
                            <Text>
                                <Text fontWeight={"bold"}>Indemnización</Text>
                                Usted acuerda indemnizar y eximir de responsabilidad a Ticketea, sus directores, empleados, y agentes, contra cualquier reclamo, pérdida, daño, responsabilidad, coste, o gasto (incluyendo honorarios legales) que surjan de su uso de nuestra plataforma, su violación de estos Términos, o su violación de cualquier derecho de terceros.
                            </Text>
                            <Text>
                                <Text fontWeight={"bold"}>Modificaciones a los Términos y Condiciones</Text>
                                Ticketea se reserva el derecho de modificar estos Términos en cualquier momento. Las modificaciones entrarán en vigor inmediatamente después de su publicación en el sitio web. Su uso continuado de la plataforma después de cualquier modificación constituirá su aceptación de los términos modificados.
                            </Text>
                            <Text>
                                <Text fontWeight={"bold"}>Jurisdicción y Ley Aplicable</Text>
                                Estos Términos se regirán e interpretarán de acuerdo con las leyes del país de Perú, sin dar efecto a ningún principio de conflictos de leyes. Cualquier disputa relacionada con estos Términos será resuelta exclusivamente en los tribunales de Perú.
                            </Text>
                            <Text>
                                <Text fontWeight={"bold"}>Si tiene alguna pregunta sobre estos Términos, por favor contáctenos a través del correo hola.ticketea@gmail.com</Text>
                            </Text>
                            <Text>Fecha de la última actualización: 26/02/2024</Text>
                        </VStack>
                    </MyContainer>
                </VStack>
            </Box>
        </>
    );
};