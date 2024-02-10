import { Input, Text, VStack } from "@chakra-ui/react";
import { MyModal } from "../myModal";
import { MyButton } from "../../myButton/myButton";
import { useForm } from "react-hook-form";
import { useState } from "react";

export const RegisterModal = (props: Props) => {
    const { register, trigger: registerTrigger, getValues: registerGetValues, formState: { errors } } = useForm();
    const [errorMessage, setErrorMessage] = useState("" as any);

    const bodyComponents = () => {
        return  <VStack gap={3}>
                    <Input placeholder='Nombres' {...register("name", {required: "Los Nombres es obligatorio", maxLength: {value: 50, message: "Los Nombres no debe ser tener de 50 caracteres"}})} isInvalid={(errors?.name?.message != null) ? true : false}/>
                    <Input placeholder='Apellidos' {...register("lastName", {required: "Los Apellidos es obligatorio", maxLength: {value: 50, message: "Los Apellidos no debe tener mas de 50 caracteres"}})} isInvalid={(errors?.lastName?.message != null) ? true : false}/>
                    <Input placeholder='Fecha de nacimiento' {...register("birthDate", {required: "La Fecha de nacimiento es obligatorio"})} isInvalid={(errors?.birthDate?.message != null) ? true : false}/>
                    <Input placeholder='Correo Electronico' {...register("email", {required: "El Correo electronico es obligatorio", pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "El correo electronico debe ser un email valido" }, maxLength: {value: 50, message: "El Correo electronico no debe tener mas de 50 caracteres"}})} isInvalid={(errors?.email?.message != null) ? true : false}/>
                    <Input placeholder='Contraseña' type="password" {...register("password", {required: "La Contraseña es obligatorio", minLength: {value: 8, message: "La Contraseña debe tener minimo 8 caracteres"}, maxLength: {value: 30, message: "La Contraseña debe tener maximo 30 caracteres"}})} isInvalid={(errors?.password?.message != null) ? true : false}/>
                    <Input placeholder='Confirmar Contraseña' type="password" {...register("confirmPassword", {required: "El Confirmar contraseña es obligatorio"})} isInvalid={(errors?.confirmPassword?.message != null) ? true : false}/>
                </VStack>;
    }

    const footerComponents = () => {
        return <VStack gap={3}>
                <MyButton textColor="white" 
                                    backgroundColor="secondary.default" 
                                    backgroundColorHover="secondary.dark" 
                                    title={"Registrarme"}
                                    fontSize="18px"
                                    padding="14px 28px"
                                    onClick={onRegister}></MyButton>
                <Text color={"red.default"} textAlign={"center"} fontSize={"14px"}>{errorMessage}</Text>
            </VStack>
    }

    const onRegister = async () => {
        const isValid = await registerTrigger(["name", "lastName", "birthDate", "email", "password", "confirmPassword"], { shouldFocus: true });
        if(!isValid){
            setErrorMessage(Object.values(errors)[0]?.message);
            return;
        }
        
        if(registerGetValues().password != registerGetValues().confirmPassword){
            setErrorMessage("La contraseña deben ser igual a confirmar contraseña");
            return;
        }

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
            titleComponent={<Text fontSize={22}>Registrate</Text>}
            bodyComponent={bodyComponents()}
            footerComponent={footerComponents()}/>
    );
};

type Props = {
    onClose: () => void,
    onSave: () => void,
    onCancel: () => void,
};