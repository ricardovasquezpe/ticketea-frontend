import { Center, Text, VStack } from "@chakra-ui/react";
import { MyModal } from "../myModal";
import { FileUploader } from "../../fileUploader/fileUploader";
import { MyButton } from "../../myButton/myButton";

export const ValidatePersonalDocModal = (props: Props) => {
    const bodyComponents = () => {
        return  <VStack justifyContent={"stretch"} alignItems={"start"} gap={3} marginBottom={"10px"}>
                    <Center width={"100%"}>
                        <FileUploader backgroundColor="primary.moreLight" description="Selecciona o arrastra aquí el archivo"/>
                    </Center>
                    <Text color={"white.half"} fontSize={"14px"}>*Te llegará un correo con un código que debes ingresar</Text>
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
            titleComponent={<Text textAlign={"left"} fontSize={"18px"}>Verificar Documento de Identificacion</Text>}
            bodyComponent={bodyComponents()}/>
    );
};

type Props = {
    onClose: () => void,
    onSave: () => void,
    onCancel: () => void,
};