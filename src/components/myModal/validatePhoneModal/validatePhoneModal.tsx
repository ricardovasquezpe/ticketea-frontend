import { Grid, GridItem, HStack, Input, InputGroup, InputLeftAddon, PinInput, PinInputField, Text, VStack } from "@chakra-ui/react";
import { MyModal } from "../myModal";
import { MyButton } from "../../myButton/myButton";
import { sendMyPhoneValidation, validateMyPhone } from "../../../services/validate.service";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { ErrorType } from "../../../utils/enums/errorType.enum";

export const ValidatePhoneModal = (props: Props) => {
    const { register: phoneValidation, trigger: phoneValidationTrigger, getValues: phoneValidationGetValues, formState: { errors } } = useForm();
    const [loadingSendPhoneValidation, setLoadingSendPhoneValidation] = useState(false);
    const [loadingValidatePhone, setLoadingValidatePhone] = useState(false);
    const [disableSendPhoneValidation, setDisableSendPhoneValidation] = useState(false);
    const [errorMessage, setErrorMessage] = useState("" as any);
    const [pin, setPin] = useState('');

    const sendPhoneValidation = async () => {
        const isValid = await phoneValidationTrigger(["phone"], { shouldFocus: true });
        if(!isValid){
            return;
        }

        setLoadingSendPhoneValidation(true);
        var response = await sendMyPhoneValidation(phoneValidationGetValues());
        if(response.data.errorType == ErrorType.ValidationError){
            setLoadingSendPhoneValidation(false);
            setErrorMessage("Falta llenar algunos campos");
            return;
        }

        if(response.data.errorType  == ErrorType.Info){
            setLoadingSendPhoneValidation(false);
            setErrorMessage(response.data.message);
            return;
        }

        setLoadingSendPhoneValidation(false);
        setDisableSendPhoneValidation(true);
        setTimeout(function(){
            setDisableSendPhoneValidation(false);
        }, 30000);
    }

    const validatePhone = async () => {
        if(pin.length != 4){
            setErrorMessage("Ingrese el código para validar su celular")
            return;
        }
        setLoadingValidatePhone(true);
        setErrorMessage("");
        var response = await validateMyPhone({"otp": pin});
        if(response.data.errorType == ErrorType.ValidationError){
            setErrorMessage("Falta llenar algunos campos");
            setLoadingValidatePhone(false);
            return;
        }

        if(response.data.errorType  == ErrorType.Info){
            setErrorMessage(response.data.message);
            setLoadingValidatePhone(false);
            return;
        }

        props.onSave();
    }

    const bodyComponents = () => {
        return  <VStack justifyContent={"stretch"} alignItems={"start"} gap={3} marginBottom={"10px"}>
                    <Text color={"white.half"} fontSize={"14px"}>Podrás enviar un nuevo código cada 30 segundos</Text>
                    <Grid templateColumns='repeat(4, 1fr)' gap={3} width={"100%"}>
                        <GridItem colSpan={{base: 4, sm: 3}}>
                            <InputGroup>
                                <InputLeftAddon bg={"#0a272e"}>
                                +51
                                </InputLeftAddon>
                                <Input type='tel' 
                                        placeholder='Número Celular' 
                                        {...phoneValidation("phone", {required: "El número celular es obligatorio", 
                                                                      pattern: { value: /^\d{9}$/, message: "El número de celular debe tener 9 dígitos" }
                                                                    })} 
                                                            isInvalid={(errors?.phone?.message != null) ? true : false}/>
                            </InputGroup>
                        </GridItem>
                        <GridItem colSpan={{base: 4, sm: 1}} textAlign={"center"}>
                            <MyButton textColor="white" 
                                        backgroundColor="secondary.default" 
                                        backgroundColorHover="secondary.dark" 
                                        title={"Enviar SMS"}
                                        fontSize="16px"
                                        padding="18px"
                                        isLoading={loadingSendPhoneValidation}
                                        isDisabled={disableSendPhoneValidation}
                                        onClick={sendPhoneValidation}></MyButton>
                        </GridItem>
                    </Grid>
                    <Text color={"white.half"} fontSize={"14px"}>*Te llegará un sms con un código que debes ingresar</Text>
                    <Text fontSize={"16px"}>Ingresar Código</Text>
                    <HStack>
                        <PinInput onComplete={(e)=>{setPin(e)}}>
                            <PinInputField bg={"primary.moreLight"} borderColor={"primary.moreLight"}/>
                            <PinInputField bg={"primary.moreLight"} borderColor={"primary.moreLight"}/>
                            <PinInputField bg={"primary.moreLight"} borderColor={"primary.moreLight"}/>
                            <PinInputField bg={"primary.moreLight"} borderColor={"primary.moreLight"}/>
                        </PinInput>
                    </HStack>
                    <VStack width={"100%"} marginTop={"10px"}>
                        <MyButton textColor="white" 
                                    backgroundColor="secondary.default" 
                                    backgroundColorHover="secondary.dark" 
                                    title={"Confirmar"}
                                    fontSize="18px"
                                    padding="14px"
                                    onClick={validatePhone}
                                    isLoading={loadingValidatePhone}></MyButton>
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
            closeOnOverlay={false}
            titleComponent={<Text textAlign={"left"} fontSize={"18px"}>Verificar Celular</Text>}
            bodyComponent={bodyComponents()}/>
    );
};

type Props = {
    onClose: () => void,
    onSave: () => void,
    onCancel: () => void,
};