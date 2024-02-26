import { Checkbox, Input, Link, Text, VStack } from "@chakra-ui/react";
import { MyModal } from "../myModal";
import { MyButton } from "../../myButton/myButton";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { registerUser } from "../../../services/auth.service";
import moment from 'moment/min/moment-with-locales';
import Session from "../../../utils/session";
import { useDispatch } from "react-redux";
import { onLogin } from "../../../store/auth/authAction";
import { ErrorType } from "../../../utils/enums/errorType.enum";
import { useModal } from "../../../config/modal/use-modal";
import { Modals } from "../../../config/modal/modal-config";

export const RegisterModal = (props: Props) => {
    const { register, trigger: registerTrigger, getValues: registerGetValues, formState: { errors }, clearErrors } = useForm();
    const [errorMessage, setErrorMessage] = useState("" as any);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    //const dateRef = useRef<any>();

    const loginModal = useModal<any>(Modals.LoginModal);
    const openLogin = () => {
        loginModal.open({
            onSave: () => {
                loginModal.close();
            },
            onClose: () => {
                loginModal.close();
            }
        });
    }

    const bodyComponents = () => {
        //validate: (value) =>  value.setFullYear(value.getFullYear() + 18)<=new Date() || "Debes ser mayor de edad"
        return  <VStack gap={3} alignItems={"start"}>
                    <Input placeholder='Nombres' {...register("name", {required: "Los Nombres es obligatorio", validate: (value) => { return !!value.trim()}, maxLength: {value: 100, message: "Los Nombres no debe ser tener de 100 caracteres"}, setValueAs: value => value.trim()})} isInvalid={(errors?.name?.message != null) ? true : false}/>
                    <Input placeholder='Apellido Paterno' {...register("lastNameFather", {required: "El apellido paterno es obligatorio", validate: (value) => { return !!value.trim()}, maxLength: {value: 100, message: "El apellido paterno no debe tener mas de 100 caracteres"}, setValueAs: value => value.trim()})} isInvalid={(errors?.lastNameFather?.message != null) ? true : false}/>
                    <Input placeholder='Apellido Materno' {...register("lastNameMother", {required: "El apellido materno es obligatorio", validate: (value) => { return !!value.trim()}, maxLength: {value: 100, message: "El apellido materno no debe tener mas de 100 caracteres"}, setValueAs: value => value.trim()})} isInvalid={(errors?.lastNameMother?.message != null) ? true : false}/>
                    <Input placeholder='Fecha de nacimiento' type="date" {...register("birthDate", {required: "La Fecha de nacimiento es obligatorio", validate: (value) => { return !!value.trim()}, setValueAs: value => value.trim()})} isInvalid={(errors?.birthDate?.message != null) ? true : false}/>
                    <Input placeholder='Correo Electrónico' {...register("email", {required: "El Correo electrónico es obligatorio", validate: (value) => { return !!value.trim()}, pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "El correo electrónico debe ser un email valido" }, maxLength: {value: 150, message: "El Correo electrónico no debe tener mas de 150 caracteres"}, setValueAs: value => value.trim()})} isInvalid={(errors?.email?.message != null) ? true : false}/>
                    <Input placeholder='Contraseña' type="password" {...register("password", {required: "La Contraseña es obligatorio", validate: (value) => { return !!value.trim()}, minLength: {value: 8, message: "La Contraseña debe tener minimo 8 caracteres"}, maxLength: {value: 50, message: "La Contraseña debe tener maximo 30 caracteres"}, setValueAs: value => value.trim()})} isInvalid={(errors?.password?.message != null) ? true : false}/>
                    <Input placeholder='Confirmar Contraseña' type="password" {...register("confirmPassword", {required: "El Confirmar contraseña es obligatorio", validate: (value) => { return !!value.trim()}, setValueAs: value => value.trim()})} isInvalid={(errors?.confirmPassword?.message != null) ? true : false}/>
                    <Checkbox {...register("termsConditionsAccept", {required: "Aceptar los términos y condiciones es obligatorio"})}><Link href="/terms-conditions" fontSize={"16px"} isExternal>Acepta los términos y condiciones</Link></Checkbox>
                    <VStack textAlign={"center"} gap={1} width={"100%"}>
                        <Text fontSize={"15px"}>¿Ya tienes una cuenta? <strong onClick={openLogin} style={{cursor: "pointer"}}>Ingresa aquí</strong></Text>
                    </VStack>
                </VStack>;
    }

    /*const onChangeDate = (e: any) => {
        if(e.currentTarget.value.length != 0){
            var birthDateMoment = moment(e.currentTarget.value, 'DD/MM/YYYY').format("YYYY-MM-DD");
            if(birthDateMoment != "Fecha inválida"){
                e.currentTarget.value = birthDateMoment;
            }
        }
        e.target.type = "date";
        dateRef.current.showPicker();
    }

    const onBlurDate = (e: any) => {
        e.target.type = "text";
        var birthDateMoment = moment(e.currentTarget.value, 'YYYY-MM-DD').format("DD/MM/YYYY");
        e.currentTarget.value = birthDateMoment;
    }*/

    const footerComponents = () => {
        return <VStack gap={3}>
                <MyButton textColor="white" 
                            backgroundColor="secondary.default" 
                            backgroundColorHover="secondary.dark" 
                            title={"Registrarme"}
                            fontSize="18px"
                            padding="14px 28px"
                            onClick={onRegister}
                            isLoading={loading}></MyButton>
                <Text color={"red.default"} textAlign={"center"} fontSize={"14px"}>
                    {errorMessage && errorMessage}
                    {(Object.values(errors).length != 0) && <p>{Object.values(errors)[0]?.message + ""}</p>}
                </Text>
            </VStack>
    }

    const onRegister = async () => {
        setErrorMessage("");
        const isValid = await registerTrigger(["name", "lastNameFather", "lastNameMother", "birthDate", "email", "password", "confirmPassword", "termsConditionsAccept"], { shouldFocus: true });
        if(!isValid){
            return;
        }
        
        if(registerGetValues().password != registerGetValues().confirmPassword){
            setErrorMessage("La contraseña deben ser igual a confirmar contraseña");
            return;
        }

        var birthDateMoment = moment(registerGetValues().birthDate, 'YYYY-MM-DD');
        var birthDate = birthDateMoment.toDate();
        birthDate.setFullYear(birthDate.getFullYear() + 18);
        if(birthDate > new Date()){
            setErrorMessage("Debes ser mayor de edad");
            return;
        }

        clearErrors();
        setErrorMessage("");
        setLoading(true);
        var payload = {...registerGetValues(), birthDate: birthDateMoment.format("DD/MM/YYYY")}
        var response = await registerUser(payload);
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
            titleComponent={<Text fontSize={22}>Únete a Ticketea</Text>}
            bodyComponent={bodyComponents()}
            footerComponent={footerComponents()}/>
    );
};

type Props = {
    onClose: () => void,
    onSave: () => void,
    onCancel: () => void,
};