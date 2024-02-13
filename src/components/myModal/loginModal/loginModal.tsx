import { Input, InputGroup, InputRightElement, Text, VStack } from "@chakra-ui/react";
import { MyModal } from "../myModal";
import { MyButton } from "../../myButton/myButton";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { onLogin } from "../../../store/auth/authAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export const LoginModal = (props: Props) => {
    const { register: login, trigger: loginTrigger, getValues: loginGetValues, formState: { errors } } = useForm();
    const [errorMessage, setErrorMessage] = useState("" as any);
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const clickShowPassword = () => setShowPassword(!showPassword)

    const bodyComponents = () => {
        return <VStack gap={3}>
                    <Input placeholder='Correo Electronico' {...login("email", {required: "El Correo electronico es obligatorio", pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "El correo electronico debe ser un email valido" }})} isInvalid={(errors?.email?.message != null) ? true : false}/>
                    <InputGroup size='md'>
                        <Input
                            pr='4.5rem'
                            type={showPassword ? 'text' : 'password'}
                            placeholder='Contraseña'
                            {...login("password", {required: "La Contraseña es obligatorio"})} isInvalid={(errors?.password?.message != null) ? true : false}/>
                        <InputRightElement width='3rem'>
                            <FontAwesomeIcon color={"var(--chakra-colors-grey-default)"} cursor={"pointer"} onClick={clickShowPassword} icon={(showPassword ? faEyeSlash : faEye)} size="1x"/>
                        </InputRightElement>
                    </InputGroup>
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
                                    onClick={loginAction}></MyButton>
                <Text color={"red.default"} textAlign={"center"} fontSize={"14px"}>{errorMessage}</Text>
            </VStack>
    }

    const loginAction = async () => {
        const isValid = await loginTrigger(["email", "password"], { shouldFocus: true });
        if(!isValid){
            setErrorMessage(Object.values(errors)[0]?.message);
            return;
        }
        
        dispatch(onLogin());
        
        setErrorMessage("");
        props.onClose();
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