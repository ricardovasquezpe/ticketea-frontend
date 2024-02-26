import { Input, Text, VStack, useToast } from "@chakra-ui/react";
import { MyModal } from "../myModal";
import { MyButton } from "../../myButton/myButton";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { ErrorType } from "../../../utils/enums/errorType.enum";
import { sendResetPassword } from "../../../services/auth.service";

export const ResetPasswordModal = (props: Props) => {
    const { register: resetPassword, trigger: resetPasswordTrigger, getValues: resetPasswordGetValues, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("" as any);
    const toast = useToast();

    const ResetPassword = async () => {
        setErrorMessage("");
        const isValid = await resetPasswordTrigger(["email"], { shouldFocus: true });
        if(!isValid){
            return;
        }

        setLoading(true);
        var response = await sendResetPassword(resetPasswordGetValues());
        if(response.data.errorType == ErrorType.Validation){
            setLoading(false);
            setErrorMessage("Falta llenar algunos campos");
            return;
        }

        if(response.data.errorType  == ErrorType.Simple){
            setLoading(false);
            setErrorMessage(response.data.message);
            return;
        }

        toast({
            title: 'Le llegará un correo electrónico con un link para restablecer su contraseña',
            description: "",
            status: 'success',
            containerStyle: {
                fontSize: "16px"
            },
            duration: 9000,
            isClosable: true,
        })

        props.onSave();
    }

    const bodyComponents = () => {
        return  <VStack justifyContent={"stretch"} alignItems={"start"} gap={3} marginBottom={"10px"}>
                    <Input type='text' 
                            placeholder='Correo Electrónico'
                            {...resetPassword("email", {required: "El Correo electrónico es obligatorio", pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "El correo electrónico debe ser un email valido" }, maxLength: {value: 150, message: "El Correo electrónico no debe tener mas de 150 caracteres"}})} isInvalid={(errors?.email?.message != null) ? true : false}/>
                    <Text color={"white.half"} fontSize={"14px"}>* Te llegará un correo electrónico con una link para restablecer tu contraseña</Text>
                    <VStack width={"100%"} marginTop={"10px"}>
                        <MyButton textColor="white" 
                                    backgroundColor="secondary.default" 
                                    backgroundColorHover="secondary.dark" 
                                    title={"Restablecer contraseña"}
                                    fontSize="18px"
                                    padding="14px"
                                    onClick={ResetPassword}
                                    isLoading={loading}></MyButton>
                        <Text color={"red.default"} textAlign={"center"} fontSize={"14px"}>
                            {errorMessage && errorMessage}
                            {(Object.values(errors).length != 0) && <p>{Object.values(errors)[0]?.message + ""}</p>}
                        </Text>
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
            titleComponent={<Text textAlign={"left"} fontSize={"18px"}>Restablecer Contraseña</Text>}
            bodyComponent={bodyComponents()}/>
    );
};

type Props = {
    onClose: () => void,
    onSave: () => void,
    onCancel: () => void,
};