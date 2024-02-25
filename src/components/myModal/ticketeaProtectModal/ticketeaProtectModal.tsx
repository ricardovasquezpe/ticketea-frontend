import { AbsoluteCenter, Box, Divider, HStack, Text, VStack } from "@chakra-ui/react";
import { MyModal } from "../myModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShieldHeart, faAt, faAddressBook, faIdCard } from "@fortawesome/free-solid-svg-icons";

export const TicketeaProtectModal = (props: Props) => {
    const bodyComponents = () => {
        return  <Box>
                    <Box textAlign={"center"}>
                        <Text fontSize={"20px"}>Es un sistema integrado que valida la identificación del vendedor con diferentes metodos</Text>
                    </Box>
                    <VStack gap={4} margin={"20px"}>
                        <HStack gap={5}>
                            <FontAwesomeIcon color="#959595" style={{marginTop: "-5px"}} icon={faIdCard} size="2x"/>
                            <Box>
                                <Text>Validación del DNI físico con RENIEC</Text>
                                <Text fontSize={15} color={"white.half"}>Se escanea el DNI físico y se valida con el sistema de la RENIEC para verificar la veracidad de los datos ingresados</Text>  
                            </Box>
                        </HStack>
                        <HStack gap={5}>
                            <FontAwesomeIcon color="#959595" style={{marginTop: "-5px"}} icon={faAddressBook} size="2x"/>
                            <Box>
                                <Text>Validación de cada uno de sus datos</Text>
                                <Text fontSize={15} color={"white.half"}>Se requiere cada uno de sus datos como nombres completos, fecha de nacimiento y direccion del domicilio</Text>  
                            </Box>
                        </HStack>
                        <HStack gap={5}>
                            <FontAwesomeIcon color="#959595" style={{marginTop: "-5px"}} icon={faAt} size="2x"/>
                            <Box>
                                <Text>Validación del número celular y correo electrónico (no spams)</Text>
                                <Text fontSize={15} color={"white.half"}>Se confirma que el numero celular y correo electronico sean los correctos y los pertenecientes al vendedor</Text>  
                            </Box>
                        </HStack>
                    </VStack>
            </Box>;
    }

    const titleComponents = () => {
        return <Box>
                    <Text marginBottom={"20px"} fontSize={"22px"}>¿Qué es <Text display={"inline-block"} fontFamily={"montserratBold"}>TicketeaProtect</Text>?</Text>
                    <Box position='relative' padding='10'>
                        <Divider borderColor={"green.default"}/>
                        <AbsoluteCenter borderRadius={"0.625rem"} bg='#4CAF50' px='2' padding={2}>
                            <FontAwesomeIcon icon={faShieldHeart} size="3x"/>
                        </AbsoluteCenter>
                    </Box>
                </Box>;
    }

    return (
        <MyModal 
            size="xl"
            maxWidth={"var(--chakra-sizes-xl)"}
            closeButton={true}
            onClose={props.onClose} 
            closeOnOverlay={true}
            titleComponent={titleComponents()}
            bodyComponent={bodyComponents()}/>
    );
};

type Props = {
    onClose: () => void,
    onSave: () => void,
    onCancel: () => void,
};