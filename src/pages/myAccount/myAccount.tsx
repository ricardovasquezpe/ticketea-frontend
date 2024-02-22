import { Avatar, Box, Grid, GridItem, HStack, Input, Text, VStack } from "@chakra-ui/react";
import { SectionTitle } from "../../components/sectionTitle/sectionTitle";
import { MyContainer } from "../../components/myContainer/myContainer";
import { MyButton } from "../../components/myButton/myButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { useModal } from "../../config/modal/use-modal";
import { Modals } from "../../config/modal/modal-config";
import { useToast } from '@chakra-ui/react'
import { useEffect, useState } from "react";
import { getMyUserData, updateMyUserData } from "../../services/user.service";
import { User } from "../../services/models/user.model";
import { useForm } from "react-hook-form";
import moment from 'moment/min/moment-with-locales';
import { UserValidationType } from "../../utils/enums/userValidationType.enum";
import { ErrorType } from "../../utils/enums/errorType.enum";

export const MyAccount = () => {
    const toast = useToast();
    const loadingModal = useModal<any>(Modals.LoadingModal);
    const [user, setUser] = useState({} as User);
    const { register: userData, trigger: userDataTrigger, getValues: userDataGetValues, formState: { errors }, reset } = useForm();
    const [errorMessage, setErrorMessage] = useState("" as any);
    const [loadingUserUpdate, setLoadingUserUpdate] = useState(false);

    useEffect(() => {
        loadingModal.open({title: "Cargando tu información"});
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
        onLoadData();
    }, []);

    const onLoadData = async() => {
        var res = await getMyUserData();
        setUser(res.data);
        reset({
            "name": res.data.name,
            "lastNameFather": res.data.last_name_father,
            "lastNameMother": res.data.last_name_mother,
            "birthDate": moment(res.data.birth_date, "DD/MM/YYYY").toISOString().substr(0, 10),
            "personalDocument": res.data.personal_document
        });
        loadingModal.close();
    }

    const changeProfilePhotoModal = useModal<any>(Modals.ChangeProfilePhotoModal);
    const changeProfilePhoto = () => {
        changeProfilePhotoModal.open({
            onSave: async () => {
                var res = await getMyUserData();
                setUser(res.data);
                changeProfilePhotoModal.close();
                toast({
                    title: 'Foto guardada correctamente',
                    description: "",
                    status: 'success',
                    containerStyle: {
                        fontSize: "16px"
                    },
                    duration: 9000,
                    isClosable: true,
                });
            },
            onClose: () => {
                changeProfilePhotoModal.close();
            },
            onCancel: () => {
                changeProfilePhotoModal.close();
            },
        });
    }

    const validatePhoneModal = useModal<any>(Modals.ValidatePhoneModal);
    const validatePhone = () => {
        validatePhoneModal.open({
          onSave: async () => {
            var res = await getMyUserData();
            setUser(res.data);
            validatePhoneModal.close();
            toast({
                title: 'Celular validado correctamente',
                description: "",
                status: 'success',
                containerStyle: {
                    fontSize: "16px"
                },
                duration: 9000,
                isClosable: true,
            });
          },
          onClose: () => {
            validatePhoneModal.close();
          },
          onCancel: () => {
            validatePhoneModal.close();
          },
        });
    }

    const validateEmailModal = useModal<any>(Modals.ValidateEmailModal);
    const validateEmail = () => {
        validateEmailModal.open({
          onSave: async () => {
            var res = await getMyUserData();
            setUser(res.data);
            validateEmailModal.close();
            toast({
                title: 'Correo Electronico validado correctamente',
                description: "",
                status: 'success',
                containerStyle: {
                    fontSize: "16px"
                },
                duration: 9000,
                isClosable: true,
            });
          },
          onClose: () => {
            validateEmailModal.close();
          },
          onCancel: () => {
            validateEmailModal.close();
          },
        });
    }

    const validatePersonalDocModal = useModal<any>(Modals.ValidatePersonalDocModal);
    const validatePersonalDoc = () => {
        validatePersonalDocModal.open({
          onSave: async () => {
            var res = await getMyUserData();
            setUser(res.data);
            validatePersonalDocModal.close();
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
          },
          onClose: () => {
            validatePersonalDocModal.close();
          },
          onCancel: () => {
            validatePersonalDocModal.close();
          },
        });
    }

    const confirmUserUpdateDailog = useModal<any>(Modals.ConfirmUserUpdateDailog);
    const confirmUserUpdate = async () => {
        const isValid = await userDataTrigger(["name", "lastNameFather", "lastNameMother", "birthDate", "personalDocument"], { shouldFocus: true });
        if(!isValid){
            setErrorMessage(Object.values(errors)[0]?.message);
            return;
        }

        var birthDateMoment = moment(userDataGetValues().birthDate, 'YYYY-MM-DD');
        var birthDate = birthDateMoment.toDate();
        birthDate.setFullYear(birthDate.getFullYear() + 18);
        if(birthDate > new Date()){
            setErrorMessage("Debes ser mayor de edad");
            return;
        }

        setErrorMessage("");
        confirmUserUpdateDailog.open({
            onSave: async () => {
                confirmUserUpdateDailog.close();
                setLoadingUserUpdate(true);

                var payload = {...userDataGetValues(), birthDate: birthDateMoment.format("DD/MM/YYYY")}
                var response = await updateMyUserData(payload);
                if(response.data.errorType == ErrorType.Validation){
                    setLoadingUserUpdate(false);
                    setErrorMessage("Falta llenar algunos campos");
                    return;
                }

                if(response.data.errorType  == ErrorType.Simple){
                    setLoadingUserUpdate(false);
                    setErrorMessage(response.data.message);
                    return;
                }
                
                var res = await getMyUserData();
                setUser(res.data);
                setLoadingUserUpdate(false);

                toast({
                    title: 'Información guardada correctamente',
                    description: "",
                    status: 'success',
                    containerStyle: {
                        fontSize: "16px"
                    },
                    duration: 9000,
                    isClosable: true,
                });
            },
            onClose: () => {
                confirmUserUpdateDailog.close();
            },
            onCancel: () => {
                confirmUserUpdateDailog.close();
            },
        });
    }

    return (
        <>
            <Box padding={{"base": "40px 1.5rem", "sm": "40px 1.5rem", "customMd": "40px 250px", "customLg": "40px 350px", "customXl": "40px 450px"}}>
                <VStack align='stretch' gap={4}>
                    <SectionTitle title="Tu cuenta"/>
                    <MyContainer>
                        <VStack justifyContent={"stretch"} gap={5}>
                            <Box>
                                <VStack>
                                    <Avatar size='xl' name={user.fullName} src={user.profile_photo_url} />
                                    <MyButton textColor="white" 
                                        backgroundColor="secondary.default" 
                                        backgroundColorHover="secondary.dark" 
                                        title={"Cambiar foto"}
                                        onClick={changeProfilePhoto}
                                        fontSize="14px"
                                        padding="5px 10px"
                                        size="xs"
                                        isDisabled={(user.userValidations?.find((val) => val.type == UserValidationType.PhotoVerified && val.count == 2)?true:false)}></MyButton>
                                </VStack>
                            </Box>
                            <Box width={"100%"}>
                                <Grid templateColumns="repeat(4, 1fr)" gap={3}> 
                                    <GridItem colSpan={{base: 5, sm: 5, md: 2}}>
                                        <Input placeholder="Nombres" {...userData("name", {required: "Los Nombres es obligatorio", maxLength: {value: 100, message: "Los Nombres no debe ser tener de 100 caracteres"}})} isInvalid={(errors?.name?.message != null) ? true : false}></Input>
                                    </GridItem>
                                    <GridItem colSpan={{base: 5, sm: 5, md: 2}}>
                                        <Input placeholder="Apellido Paterno" {...userData("lastNameFather", {required: "El apellido paterno es obligatorio", maxLength: {value: 100, message: "El apellido paterno no debe tener mas de 100 caracteres"}})} isInvalid={(errors?.lastNameFather?.message != null) ? true : false}></Input>
                                    </GridItem>
                                    <GridItem colSpan={{base: 5, sm: 5, md: 2}}>
                                        <Input placeholder="Apellido Materno" {...userData("lastNameMother", {required: "El apellido materno es obligatorio", maxLength: {value: 100, message: "El apellido materno no debe tener mas de 100 caracteres"}})} isInvalid={(errors?.lastNameMother?.message != null) ? true : false}></Input>
                                    </GridItem>
                                    <GridItem colSpan={{base: 5, sm: 5, md: 2}}>
                                        <Input placeholder="Fecha de nacimiento" type="date" {...userData("birthDate", {required: "La Fecha de nacimiento es obligatorio"})} isInvalid={(errors?.birthDate?.message != null) ? true : false}/>
                                    </GridItem>
                                    <GridItem colSpan={{base: 5, sm: 5, md: 2}}>
                                        <Input placeholder="DNI" {...userData("personalDocument", {required: "El DNI es obligatorio", maxLength: {value: 8, message: "El apellido materno no debe tener mas de 8 caracteres"}})} isInvalid={(errors?.personalDocument?.message != null) ? true : false}></Input>
                                    </GridItem>
                                </Grid>
                                <Text marginTop={"10px"} color={"white.half"} fontSize={"14px"}>* Recuerda que solo podras editar tus datos 1 sola vez</Text>
                            </Box>
                            <Box width={"100%"}>
                                <MyButton textColor="white" 
                                            backgroundColor="secondary.default" 
                                            backgroundColorHover="secondary.dark" 
                                            title={"Guardar"}
                                            fontSize="18px"
                                            padding="14px"
                                            onClick={confirmUserUpdate}
                                            isLoading={loadingUserUpdate}
                                            isDisabled={(user.userValidations?.find((val) => val.type == UserValidationType.ProfileUpdated && val.count == 2)?true:false)}></MyButton>
                                <Text color={"red.default"} marginTop={"15px"} textAlign={"left"} fontSize={"14px"}>{errorMessage}</Text>
                            </Box>
                        </VStack>
                    </MyContainer>
                    <SectionTitle title="Verificación para vender"/>
                    <Box>
                        <VStack gap={2}>
                            <MyContainer>
                                <HStack justifyContent={"space-between"}>
                                    <HStack>
                                        <Text fontSize={"16px"}>Celular</Text>
                                        {(user.userValidations?.find((val) => val.type == UserValidationType.PhoneVerified && val.validated)) ? 
                                            <FontAwesomeIcon color={"var(--chakra-colors-green-default)"} icon={faCircleCheck} size="1x"/> :
                                            <></>}
                                    </HStack>
                                    <MyButton textColor="white" 
                                                backgroundColor="secondary.default" 
                                                backgroundColorHover="secondary.dark" 
                                                title={"Verificar"}
                                                fontSize="14px"
                                                padding="5px 10px"
                                                size="xs"
                                                onClick={validatePhone}
                                                isDisabled={(user.userValidations?.find((val) => val.type == UserValidationType.PhoneVerified && val.count == 2)?true:false)}></MyButton>
                                </HStack>
                            </MyContainer>
                            <MyContainer>
                                <HStack justifyContent={"space-between"}>
                                    <HStack>
                                        <Text fontSize={"16px"}>Correo Electronico</Text>
                                        {(user.userValidations?.find((val) => val.type == UserValidationType.EmailVerified && val.validated)) ? 
                                            <FontAwesomeIcon color={"var(--chakra-colors-green-default)"} icon={faCircleCheck} size="1x"/> :
                                            <></>}
                                    </HStack>
                                    <MyButton textColor="white" 
                                                backgroundColor="secondary.default" 
                                                backgroundColorHover="secondary.dark" 
                                                title={"Verificar"}
                                                fontSize="14px"
                                                padding="5px 10px"
                                                size="xs"
                                                onClick={validateEmail}
                                                isDisabled={(user.userValidations?.find((val) => val.type == UserValidationType.EmailVerified && val.count == 2)?true:false)}></MyButton>
                                </HStack>
                            </MyContainer>
                            <MyContainer>
                                <HStack justifyContent={"space-between"}>
                                    <HStack>
                                        <Text fontSize={"16px"}>Documento de identificación</Text>
                                        {(user.userValidations?.find((val) => val.type == UserValidationType.PersonalDocumentVerified && val.validated)) ? 
                                            <FontAwesomeIcon color={"var(--chakra-colors-green-default)"} icon={faCircleCheck} size="1x"/> :
                                            <></>}
                                    </HStack>
                                    <MyButton textColor="white" 
                                                backgroundColor="secondary.default" 
                                                backgroundColorHover="secondary.dark" 
                                                title={"Verificar"}
                                                fontSize="14px"
                                                padding="5px 10px"
                                                size="xs"
                                                onClick={validatePersonalDoc}
                                                isDisabled={(user.userValidations?.find((val) => val.type == UserValidationType.PersonalDocumentVerified && val.count == 2)?true:false)}></MyButton>
                                </HStack>
                            </MyContainer>
                        </VStack>
                    </Box>
                    {
                        /* 
                            <SectionTitle title="Cuenta bancaria"/>
                            <MyContainer>
                                <Text marginTop={"10px"} marginBottom={"10px"} color={"white.half"} fontSize={"16px"}>Tu cuenta bancaria es importante para saber donde depositarte el monto de las ventas de tus entradas</Text>
                                <VStack alignItems={"start"}>
                                    <Select placeholder='Seleccione el banco'>
                                        <option value='option1'>BCP</option>
                                        <option value='option1'>Interbank</option>
                                        <option value='option1'>BBVA</option>
                                    </Select>
                                    <Input placeholder="Ingresar N° cuenta bancaria"></Input>
                                    <Input placeholder="Ingresar N° CCI"></Input>
                                    <MyButton textColor="white" 
                                            backgroundColor="secondary.default" 
                                            backgroundColorHover="secondary.dark" 
                                            title={"Guardar"}
                                            fontSize="18px"
                                            padding="14px"></MyButton>
                                </VStack>
                            </MyContainer>
                        */
                    }
                </VStack>  
            </Box>
        </>
    );
};