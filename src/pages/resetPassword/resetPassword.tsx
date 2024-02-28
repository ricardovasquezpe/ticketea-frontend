import { Box, Text, VStack, Grid, GridItem, Input, useToast } from "@chakra-ui/react";
import { SectionTitle } from "../../components/sectionTitle/sectionTitle";
import { MyContainer } from "../../components/myContainer/myContainer";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MyButton } from "../../components/myButton/myButton";
import { resetPassword } from "../../services/auth.service";
import { ErrorType } from "../../utils/enums/errorType.enum";
import { useNavigate, useParams } from "react-router-dom";
import { MySeo } from "../../components/mySeo/mySeo";

export const ResetPassword = () => {
    const { register: resetPasswordReg, trigger: resetPasswordTrigger, getValues: resetPasswordGetValues, formState: { errors }, clearErrors } = useForm();
    const [errorMessage, setErrorMessage] = useState("" as any);
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();
    const { code } = useParams();

    useEffect(() => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }, []);

    const resetPasswordAction = async () => {
        setErrorMessage("");
        const isValid = await resetPasswordTrigger(["password", "confirmPassword"], { shouldFocus: true });
        if(!isValid){
            return;
        }
        
        if(resetPasswordGetValues().password != resetPasswordGetValues().confirmPassword){
            setErrorMessage("La contraseña deben ser igual a confirmar contraseña");
            return;
        }

        setLoading(true);
        clearErrors();

        var response = await resetPassword({...resetPasswordGetValues(), code: code});
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
            title: 'Ya puedes ingresar a tu cuenta con tu nueva contraseña!',
            description: "",
            status: 'success',
            containerStyle: {
                fontSize: "16px"
            },
            duration: 9000,
            isClosable: true,
        });

        navigate("/");
    }
    
    return (
        <>
            <MySeo title={`Restablecer contraseña | Ticketea!`}
                   description={`Compra la entrada al evento que quieres asistir de manera segura con nuestros vendedores verificados rapido y facil`}
                   link={`https://ticketea.me/my-account`}
                   image={"/images/logo.png"}/>
            <Box padding={{"base": "40px 1.5rem", "sm": "40px 1.5rem", "customMd": "40px 250px", "customLg": "40px 350px", "customXl": "40px 450px"}}>
                <VStack align='stretch' gap={5}>
                    <SectionTitle title="Restablecer tu contraseña"/>
                    <MyContainer>
                        <Grid templateColumns="repeat(4, 1fr)" gap={3}> 
                            <GridItem colSpan={{base: 5, sm: 5, md: 2}}>
                                <Input placeholder='Contraseña' type="password" {...resetPasswordReg("password", {required: "La Contraseña es obligatorio", validate: (value) => { return !!value.trim()}, minLength: {value: 8, message: "La Contraseña debe tener minimo 8 caracteres"}, maxLength: {value: 50, message: "La Contraseña debe tener maximo 30 caracteres"}, setValueAs: value => value.trim()})} isInvalid={(errors?.password?.message != null) ? true : false}/>
                            </GridItem>
                            <GridItem colSpan={{base: 5, sm: 5, md: 2}}>
                                <Input placeholder='Confirmar Contraseña' type="password" {...resetPasswordReg("confirmPassword", {required: "El Confirmar contraseña es obligatorio", validate: (value) => { return !!value.trim()}, setValueAs: value => value.trim()})} isInvalid={(errors?.confirmPassword?.message != null) ? true : false}/>
                            </GridItem>
                        </Grid>
                        <VStack marginTop={"20px"}>
                            <MyButton textColor="white" 
                                    backgroundColor="secondary.default" 
                                    backgroundColorHover="secondary.dark" 
                                    title={"Restablecer contraseña"}
                                    fontSize="18px"
                                    padding="14px"
                                    onClick={resetPasswordAction}
                                    isLoading={loading}></MyButton>
                            <Text color={"red.default"} textAlign={"center"} fontSize={"14px"}>
                                {errorMessage && errorMessage}
                                {(Object.values(errors).length != 0) && <p>{Object.values(errors)[0]?.message + ""}</p>}
                            </Text>
                        </VStack>
                    </MyContainer>
                </VStack>
            </Box>
        </>
    );
};