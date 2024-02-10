import { Center, HStack, PinInput, PinInputField, Text, VStack } from "@chakra-ui/react";
import { MyModal } from "../myModal";
import { MyButton } from "../../myButton/myButton";

export const ValidateEmailModal = (props: Props) => {
    const bodyComponents = () => {
        return  <VStack justifyContent={"stretch"} alignItems={"start"} gap={3} marginBottom={"10px"}>
                    <Center width={"100%"}>
                        <MyButton textColor="white" 
                                    backgroundColor="secondary.default" 
                                    backgroundColorHover="secondary.dark" 
                                    title={"Enviar Código a mi correo"}
                                    fontSize="16px"
                                    padding="18px"></MyButton>
                    </Center>
                    <Text color={"white.half"} fontSize={"14px"}>*Te llegará un correo con un código que debes ingresar</Text>
                    <Text fontSize={"16px"}>Ingresar Código</Text>
                    <HStack>
                        <PinInput>
                            <PinInputField bg={"primary.moreLight"} borderColor={"primary.moreLight"}/>
                            <PinInputField bg={"primary.moreLight"} borderColor={"primary.moreLight"}/>
                            <PinInputField bg={"primary.moreLight"} borderColor={"primary.moreLight"}/>
                            <PinInputField bg={"primary.moreLight"} borderColor={"primary.moreLight"}/>
                        </PinInput>
                    </HStack>
                    <Center width={"100%"}>
                        <MyButton textColor="white" 
                                    backgroundColor="secondary.default" 
                                    backgroundColorHover="secondary.dark" 
                                    title={"Confirmar"}
                                    fontSize="18px"
                                    padding="14px"></MyButton>
                    </Center>
                </VStack>;
    }

    return (
        <MyModal 
            size="md"
            maxWidth={"var(--chakra-sizes-md)"}
            closeButton={true}
            onClose={props.onClose} 
            closeOnOverlay={true}
            titleComponent={<Text textAlign={"left"} fontSize={"18px"}>Verificar Correo Electronico</Text>}
            bodyComponent={bodyComponents()}/>
    );
};

type Props = {
    onClose: () => void,
    onSave: () => void,
    onCancel: () => void,
};