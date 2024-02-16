import { HStack, Input, PinInput, PinInputField, Text, VStack } from "@chakra-ui/react";
import { MyModal } from "../myModal";
import { MyButton } from "../../myButton/myButton";
import { useForm } from "react-hook-form";
import { sendMyEmailValidation, validateMyEmail } from "../../../services/validate.service";
import { useState } from "react";

export const ValidateEmailModal = (props: Props) => {
    const { register: emailValidation, trigger: emailValidationTrigger, getValues: emailValidationGetValues, formState: { errors } } = useForm();
    const [loadingSendEmailValidation, setLoadingSendEmailValidation] = useState(false);
    const [disableSendEmailValidation, setDisableSendEmailValidation] = useState(false);
    const [errorMessage, setErrorMessage] = useState("" as any);
    const [loadingValidateEmail, setLoadingValidateEmail] = useState(false);
    const [pin, setPin] = useState('');

    const sendEmailValidation = async () => {
        const isValid = await emailValidationTrigger(["email"], { shouldFocus: true });
        if(!isValid){
            return;
        }

        setLoadingSendEmailValidation(true);
        await sendMyEmailValidation(emailValidationGetValues());
        setLoadingSendEmailValidation(false);

        setDisableSendEmailValidation(true);
        setTimeout(function(){
            setDisableSendEmailValidation(false);
        }, 30000);
    }

    const validateEmail = async () => {
        if(pin.length != 4) return;
        setLoadingValidateEmail(true);
        setErrorMessage("");

        var res = await validateMyEmail({"otp": pin});
        if(res.data.message != null){
            setErrorMessage(res.data.message);
            setLoadingValidateEmail(false);
            return;
        }

        props.onSave();
    }

    const bodyComponents = () => {
        return  <VStack justifyContent={"stretch"} alignItems={"start"} gap={3} marginBottom={"10px"}>
                    <Text color={"white.half"} fontSize={"14px"}>Podrás enviar un nuevo codigo cada 30 segundos</Text>
                    <HStack width={"100%"}>
                        <Input type='tel' 
                                placeholder='Correo Electronico'
                                {...emailValidation("email", {required: "El Correo electronico es obligatorio", pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "El correo electronico debe ser un email valido" }, maxLength: {value: 150, message: "El Correo electronico no debe tener mas de 150 caracteres"}})} isInvalid={(errors?.email?.message != null) ? true : false}/>
                        <MyButton textColor="white" 
                                    backgroundColor="secondary.default" 
                                    backgroundColorHover="secondary.dark" 
                                    title={"Enviar Codigo"}
                                    fontSize="16px"
                                    padding="18px"
                                    onClick={sendEmailValidation}
                                    isLoading={loadingSendEmailValidation}
                                    isDisabled={disableSendEmailValidation}></MyButton>
                    </HStack>
                    <Text color={"white.half"} fontSize={"14px"}>*Te llegará un email con un código que debes ingresar</Text>
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
                                    isLoading={loadingValidateEmail}
                                    onClick={validateEmail}></MyButton>
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
            titleComponent={<Text textAlign={"left"} fontSize={"18px"}>Verificar Correo Electronico</Text>}
            bodyComponent={bodyComponents()}/>
    );
};

type Props = {
    onClose: () => void,
    onSave: () => void,
    onCancel: () => void,
};