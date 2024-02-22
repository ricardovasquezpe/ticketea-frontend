import { Center, Text, VStack } from "@chakra-ui/react";
import { MyModal } from "../myModal";
import { FileUploader } from "../../fileUploader/fileUploader";
import { MyButton } from "../../myButton/myButton";
import { useState } from "react";
import Utils from "../../../utils/utils";
import { validateMyPersonalDocument } from "../../../services/validate.service";
import { ErrorType } from "../../../utils/enums/errorType.enum";

export const ValidatePersonalDocModal = (props: Props) => {
    const [frontFile, setFrontFile] = useState([] as File[]);
    const [backFile, setBackFile] = useState([] as File[]);
    const [errorMessage, setErrorMessage] = useState("" as any);
    const [loading, setLoading] = useState(false);

    const documentVerification = async () => {
        setLoading(true);
        setErrorMessage("");
        if(frontFile.length == 0 || backFile.length == 0){
            setErrorMessage("Debe ingresar ambas imagenes");
            setLoading(false);
            return;
        }

        if(!Utils.validateImageFileType(frontFile[0].type) || !Utils.validateImageFileType(backFile[0].type)){
            setErrorMessage("Los archivos deben ser imagenes");
            setLoading(false);
            return;
        }

        var formData = new FormData();
        formData.append("front", frontFile[0]);
        formData.append("back", backFile[0]);
        var response = await validateMyPersonalDocument(formData);

        if(response.data.errorType == ErrorType.Validation){
            setErrorMessage("Falta llenar algunos campos");
            setLoading(false);
            return;
        }

        if(response.data.errorType  == ErrorType.Simple){
            setErrorMessage(response.data.message);
            setLoading(false);
            return;
        }

        props.onSave();
    }

    const bodyComponents = () => {
        return  <VStack justifyContent={"stretch"} alignItems={"start"} gap={3} marginBottom={"10px"}>
                    <Center width={"100%"}>
                        <VStack gap={3} width={"100%"}>
                            <Text color={"white"} fontSize={"16px"}>Parte frontal</Text>
                            <FileUploader 
                                backgroundColor="primary.moreLight" 
                                description="Selecciona o arrastra aquí la imagen de la parte frontal de tu documento de identidad"
                                acceptFiles={{"image/png": [".png", ".jpeg", ".jpg"]}}
                                maxFiles={1}
                                onChange={(files) => {setFrontFile(files)}}/>
                            <Text color={"white"} fontSize={"16px"}>Parte posterior</Text>
                            <FileUploader 
                                backgroundColor="primary.moreLight" 
                                description="Selecciona o arrastra aquí la imagen de la parte posterior de tu documento de identidad"
                                acceptFiles={{"image/png": [".png", ".jpeg", ".jpg"]}}
                                maxFiles={1}
                                onChange={(files) => {setBackFile(files)}}/>
                        </VStack>
                    </Center>
                    <Text color={"white.half"} fontSize={"14px"}>* Compararemos los datos de tu documento de identidad con tus datos basicos y con el servicio de RENIEC</Text>
                    <VStack width={"100%"}>
                        <MyButton textColor="white" 
                                    backgroundColor="secondary.default" 
                                    backgroundColorHover="secondary.dark" 
                                    title={"Subir"}
                                    fontSize="18px"
                                    padding="14px"
                                    onClick={documentVerification}
                                    isLoading={loading}></MyButton>
                        <Text color={"red.default"} textAlign={"center"} fontSize={"14px"}>{errorMessage}</Text>
                    </VStack>
                </VStack>;
    }

    return (
        <MyModal 
            size="md"
            maxWidth={"var(--chakra-sizes-md)"}
            closeButton={true}
            onClose={props.onClose} 
            closeOnOverlay={true}
            titleComponent={<Text textAlign={"left"} fontSize={"18px"}>Verificar Documento de Identidad</Text>}
            bodyComponent={bodyComponents()}/>
    );
};

type Props = {
    onClose: () => void,
    onSave: () => void,
    onCancel: () => void,
};