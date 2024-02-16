import { Center, HStack, Input, InputGroup, InputLeftAddon, PinInput, PinInputField, Text, VStack } from "@chakra-ui/react";
import { MyModal } from "../myModal";
import { MyButton } from "../../myButton/myButton";
import { sendMyPhoneValidation, validateMyPhone } from "../../../services/validate.service";
import { useForm } from "react-hook-form";
import { useState } from "react";

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
        await sendMyPhoneValidation(phoneValidationGetValues());
        setLoadingSendPhoneValidation(false);

        setDisableSendPhoneValidation(true);
        setTimeout(function(){
            setDisableSendPhoneValidation(false);
        }, 30000);
    }

    const validatePhone = async () => {
        if(pin.length != 4) return;
        setLoadingValidatePhone(true);
        setErrorMessage("");
        var res = await validateMyPhone({"otp": pin});
        if(res.data.message != null){
            setErrorMessage(res.data.message);
            setLoadingValidatePhone(false);
            return;
        }

        props.onSave();
    }

    const bodyComponents = () => {
        return  <VStack justifyContent={"stretch"} alignItems={"start"} gap={3} marginBottom={"10px"}>
                    <Text color={"white.half"} fontSize={"14px"}>Podrás enviar un nuevo sms cada 30 segundos</Text>
                    <HStack width={"100%"}>
                        <InputGroup>
                            <InputLeftAddon bg={"#0a272e"}>
                            +51
                            </InputLeftAddon>
                            <Input type='tel' 
                                    placeholder='phone number' 
                                    {...phoneValidation("phone", {required: "El numero celular es obligatorio", 
                                                                  pattern: { value: /^\d{9}$/, message: "El numero telefonico debe tener 9 digitos" }
                                                                  })} 
                                                        isInvalid={(errors?.name?.message != null) ? true : false}/>
                        </InputGroup>
                        <MyButton textColor="white" 
                                    backgroundColor="secondary.default" 
                                    backgroundColorHover="secondary.dark" 
                                    title={"Enviar SMS"}
                                    fontSize="16px"
                                    padding="18px"
                                    isLoading={loadingSendPhoneValidation}
                                    isDisabled={disableSendPhoneValidation}
                                    onClick={sendPhoneValidation}></MyButton>
                    </HStack>
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
                    <VStack width={"100%"}>
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
            closeOnOverlay={true}
            titleComponent={<Text textAlign={"left"} fontSize={"18px"}>Verificar Celular</Text>}
            bodyComponent={bodyComponents()}/>
    );
};

type Props = {
    onClose: () => void,
    onSave: () => void,
    onCancel: () => void,
};