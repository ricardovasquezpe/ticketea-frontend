import { Input, InputGroup, InputRightElement, Text, VStack } from "@chakra-ui/react";
import { MyModal } from "../myModal";
import { MyButton } from "../../myButton/myButton";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { onLogin } from "../../../store/auth/authAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { loginUser } from "../../../services/auth.service";
import Session from "../../../utils/session";
import { ErrorType } from "../../../utils/enums/errorType.enum";
import { useModal } from "../../../config/modal/use-modal";
import { Modals } from "../../../config/modal/modal-config";

export const LoginModal = (props: Props) => {
    const { register: login, trigger: loginTrigger, getValues: loginGetValues, formState: { errors } } = useForm();
    const [errorMessage, setErrorMessage] = useState("" as any);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const clickShowPassword = () => setShowPassword(!showPassword);

    const registerModal = useModal<any>(Modals.RegisterModal);
    const openRegister = () => {
        registerModal.open({
            onSave: () => {
                registerModal.close();
            },
            onClose: () => {
                registerModal.close();
            }
        });
    }

    const resetPasswordModal = useModal<any>(Modals.ResetPasswordModal);
    const openResetPassword = () => {
        resetPasswordModal.open({
            onSave: () => {
                resetPasswordModal.close();
            },
            onClose: () => {
                resetPasswordModal.close();
            }
        });
    }

    const bodyComponents = () => {
        return <VStack gap={3}>
                    <Input placeholder='Correo Electronico' 
                            {...login("email", {required: "El Correo electronico es obligatorio", validate: (value) => { return !!value.trim()}, setValueAs: value => value.trim(), pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "El correo electronico debe ser un email valido" }})} 
                            isInvalid={(errors?.email?.message != null) ? true : false}/>
                    <InputGroup size='md'>
                        <Input
                            pr='4.5rem'
                            type={showPassword ? 'text' : 'password'}
                            placeholder='Contraseña'
                            {...login("password", {required: "La Contraseña es obligatorio", validate: (value) => { return !!value.trim()}, setValueAs: value => value.trim()})} 
                            isInvalid={(errors?.password?.message != null) ? true : false}/>
                        <InputRightElement width='3rem'>
                            <FontAwesomeIcon color={"var(--chakra-colors-grey-default)"} cursor={"pointer"} onClick={clickShowPassword} icon={(showPassword ? faEyeSlash : faEye)} size="1x"/>
                        </InputRightElement>
                    </InputGroup>
                    <VStack textAlign={"center"} gap={1}>
                        <Text fontSize={"15px"}>¿Aun no tienes una cuenta? <strong onClick={openRegister} style={{cursor: "pointer"}}>Registrate aquí</strong></Text>
                        <Text color={"white.half"} fontSize={"15px"} cursor={"pointer"} onClick={openResetPassword}>¿Olvidaste tu contraseña?</Text>
                    </VStack>
                </VStack>;
    }

    const footerComponents = () => {
        return <VStack gap={3}>
                <MyButton textColor="white" 
                                    backgroundColor="secondary.default" 
                                    backgroundColorHover="secondary.dark" 
                                    title={"Ingresar"}
                                    fontSize="18px"
                                    padding="14px 28px"
                                    onClick={loginAction}
                                    isLoading={loading}></MyButton>
                <Text color={"red.default"} textAlign={"center"} fontSize={"14px"}>
                    {errorMessage && errorMessage}
                    {(Object.values(errors).length != 0) && <p>{Object.values(errors)[0]?.message + ""}</p>}
                </Text>
            </VStack>
    }

    const loginAction = async () => {
        setErrorMessage("");
        const isValid = await loginTrigger(["email", "password"], { shouldFocus: true });
        if(!isValid){
            return;
        }

        setLoading(true);
        setErrorMessage("");
        
        var response = await loginUser(loginGetValues());
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
        
        Session.saveUserToken(response.data.token);
        dispatch(onLogin());
        props.onSave();
    }

    return (
        <MyModal 
            size="xs"
            maxWidth={"var(--chakra-sizes-xs)"}
            closeButton={true}
            onClose={props.onClose} 
            closeOnOverlay={true}
            titleComponent={<Text fontSize={22}>Iniciar Sesion</Text>}
            bodyComponent={bodyComponents()}
            footerComponent={footerComponents()}/>
    );
};

type Props = {
    onClose: () => void,
    onSave: () => void,
    onCancel: () => void,
};