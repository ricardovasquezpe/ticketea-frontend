import { Center, Checkbox, Text, VStack, useToast } from "@chakra-ui/react";
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
    const [alreadyTried, setAlreadyTried] = useState(false);
    const [acceptValidation, setAcceptValidation] = useState(false);
    const toast = useToast();

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
        if(acceptValidation) formData.append("acceptValidation", "true");

        var response = await validateMyPersonalDocument(formData);
        if(response.data.errorType == ErrorType.ValidationError){
            setErrorMessage("Falta llenar algunos campos");
            setLoading(false);
            return;
        }

        if(response.data.errorType  == ErrorType.Info){
            setAlreadyTried(true);
            setErrorMessage(response.data.message);
            setLoading(false);
            return;
        }

        if(acceptValidation){
            toast({
                title: 'Sus documentos seran revisados y validados en un plazo no mayor a 1 dia',
                description: "",
                status: 'success',
                containerStyle: {
                    fontSize: "16px"
                },
                duration: 9000,
                isClosable: true,
            });
        } else {
            toast({
                title: 'Documento de idenfiticación validado correctamente',
                description: "",
                status: 'success',
                containerStyle: {
                    fontSize: "16px"
                },
                duration: 9000,
                isClosable: true,
            });
        }

        props.onSave();
    }

    const bodyComponents = () => {
        return  <VStack justifyContent={"stretch"} alignItems={"start"} gap={3} marginBottom={"10px"}>
                    <Text color={"white.half"} fontSize={"14px"}>Compararemos los datos de tu documento de identidad con tus datos básicos y con el servicio de RENIEC</Text>
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
                    {(alreadyTried == true) ? <Checkbox isChecked={acceptValidation} onChange={(e) => setAcceptValidation(e.target.checked)}><Text fontSize={"15px"}>El sistema no pudo confirmar mis datos, así que YO doy mi consentimiento que los documentos que estoy subiendo son válidos y serán revisados en un plazo no mayor de 1 día</Text></Checkbox> : <></>}
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