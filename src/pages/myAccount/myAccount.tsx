import { Avatar, Box, Grid, GridItem, HStack, Input, Select, Text, VStack } from "@chakra-ui/react";
import { SectionTitle } from "../../components/sectionTitle/sectionTitle";
import { MyContainer } from "../../components/myContainer/myContainer";
import { MyButton } from "../../components/myButton/myButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { useModal } from "../../config/modal/use-modal";
import { Modals } from "../../config/modal/modal-config";
import { useToast } from '@chakra-ui/react'
import { useEffect, useState } from "react";
import { getMyUserData } from "../../services/user.service";
import { User } from "../../services/models/user.model";

export const MyAccount = () => {
    const toast = useToast();
    const loadingModal = useModal<any>(Modals.LoadingModal);
    const [user, setUser] = useState({} as User);

    useEffect(() => {
        loadingModal.open({title: "Cargando los tickets"});
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
        onLoadData();
    }, []);

    const onLoadData = async() => {
        var res = await getMyUserData();
        setUser(res.data);
        loadingModal.close();
    }

    const changeProfilePhotoModal = useModal<any>(Modals.ChangeProfilePhotoModal);
    const changeProfilePhoto = () => {
        changeProfilePhotoModal.open({
            onSave: async () => {
                var res = await getMyUserData();
                setUser(res.data);
                changeProfilePhotoModal.close();
            },
            onClose: () => {
                console.log("onClose");
                changeProfilePhotoModal.close();
            },
            onCancel: () => {
                console.log("onCancel");
                changeProfilePhotoModal.close();
            },
        });
    }

    const validatePhoneModal = useModal<any>(Modals.ValidatePhoneModal);
    const validatePhone = () => {
        validatePhoneModal.open({
          onSave: () => {
            console.log("OnSave");
          },
          onClose: () => {
            console.log("onClose");
            validatePhoneModal.close();
          },
          onCancel: () => {
            console.log("onCancel");
            validatePhoneModal.close();
          },
        });
    }

    const validateEmailModal = useModal<any>(Modals.ValidateEmailModal);
    const validateEmail = () => {
        validateEmailModal.open({
          onSave: () => {
            console.log("OnSave");
          },
          onClose: () => {
            console.log("onClose");
            validateEmailModal.close();
          },
          onCancel: () => {
            console.log("onCancel");
            validateEmailModal.close();
          },
        });
    }

    const validatePersonalDocModal = useModal<any>(Modals.ValidatePersonalDocModal);
    const validatePersonalDoc = () => {
        validatePersonalDocModal.open({
          onSave: () => {
            console.log("OnSave");
          },
          onClose: () => {
            console.log("onClose");
            validatePersonalDocModal.close();
          },
          onCancel: () => {
            console.log("onCancel");
            validatePersonalDocModal.close();
          },
        });
    }

    const saveUserData = () => {
        toast({
            title: 'Información guardada correctamente',
            description: "",
            status: 'success',
            containerStyle: {
                fontSize: "16px"
            },
            duration: 9000,
            isClosable: true,
        })
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
                                        size="xs"></MyButton>
                                </VStack>
                            </Box>
                            <Box width={"100%"}>
                                <Grid templateColumns="repeat(4, 1fr)" gap={3}> 
                                    <GridItem colSpan={{base: 5, sm: 5, md: 2}}>
                                        <Input placeholder="Nombres"></Input>
                                    </GridItem>
                                    <GridItem colSpan={{base: 5, sm: 5, md: 2}}>
                                        <Input placeholder="Apellidos"></Input>
                                    </GridItem>
                                    <GridItem colSpan={{base: 5, sm: 5, md: 2}}>
                                        <Input placeholder="Fecha de nacimiento" type="date" lang="fr-CA"/>
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
                                            onClick={saveUserData}></MyButton>
                            </Box>
                        </VStack>
                    </MyContainer>
                    <SectionTitle title="Verificación para vender"/>
                    <Box>
                        <VStack gap={2}>
                            <MyContainer>
                            <HStack justifyContent={"space-between"}>
                                <Text fontSize={"16px"}>Celular</Text>
                                <MyButton textColor="white" 
                                            backgroundColor="secondary.default" 
                                            backgroundColorHover="secondary.dark" 
                                            title={"Verificar"}
                                            fontSize="14px"
                                            padding="5px 10px"
                                            size="xs"
                                            onClick={validatePhone}></MyButton>
                            </HStack>
                        </MyContainer>
                        <MyContainer>
                            <HStack justifyContent={"space-between"}>
                                <Text fontSize={"16px"}>Correo Electronico</Text>
                                <MyButton textColor="white" 
                                            backgroundColor="secondary.default" 
                                            backgroundColorHover="secondary.dark" 
                                            title={"Verificar"}
                                            fontSize="14px"
                                            padding="5px 10px"
                                            size="xs"
                                            onClick={validateEmail}></MyButton>
                                <FontAwesomeIcon color={"var(--chakra-colors-green-default)"} icon={faCircleCheck} size="1x"/>
                            </HStack>
                        </MyContainer>
                        <MyContainer>
                            <HStack justifyContent={"space-between"}>
                                <Text fontSize={"16px"}>Documento de identificación</Text>
                                <MyButton textColor="white" 
                                            backgroundColor="secondary.default" 
                                            backgroundColorHover="secondary.dark" 
                                            title={"Verificar"}
                                            fontSize="14px"
                                            padding="5px 10px"
                                            size="xs"
                                            onClick={validatePersonalDoc}></MyButton>
                            </HStack>
                        </MyContainer>
                        </VStack>
                    </Box>
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
                                    padding="14px"
                                    onClick={saveUserData}></MyButton>
                        </VStack>
                    </MyContainer>
                </VStack>  
            </Box>
        </>
    );
};