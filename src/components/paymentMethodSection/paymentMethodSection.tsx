import { Box, Center, HStack, Image, Input, Radio, RadioGroup, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { MyContainer } from "../myContainer/myContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuildingColumns } from "@fortawesome/free-solid-svg-icons";
import { faCcAmex, faCcDinersClub, faCcMastercard, faCcVisa } from "@fortawesome/free-brands-svg-icons";
import { FileUploader } from "../fileUploader/fileUploader";
import { useState } from "react";
import { PAYMENT_METHOD_BANK_ACCOUNT, PAYMENT_METHOD_CREDIT_CARD, PAYMENT_METHOD_PLIN, PAYMENT_METHOD_YAPE } from "../../utils/constants";

export const PaymentMethodSection = (props: Props) => {
    const [methodSelected, setMethodSelected] = useState(PAYMENT_METHOD_BANK_ACCOUNT);

    const onMethodSelect = (value: any) => {
        setMethodSelected(value);
        props.onChange(value);
    }

    return (
        <>
            <VStack gap={3}>
                <RadioGroup width={"100%"} onChange={(e) => onMethodSelect(e)} value={methodSelected}>
                    <VStack gap={1.5}>
                        <MyContainer>
                            <HStack justifyContent={"space-between"} onClick={()=>onMethodSelect(PAYMENT_METHOD_BANK_ACCOUNT)} cursor={"pointer"}>
                                <HStack gap={3}>
                                    <FontAwesomeIcon color="#959595" icon={faBuildingColumns} size="2x"/>
                                    <Text fontFamily={"robotoBold"} fontSize={22}>Cuenta bancaria</Text>
                                </HStack>
                                <Radio size='lg' value={PAYMENT_METHOD_BANK_ACCOUNT}></Radio>
                            </HStack>
                        </MyContainer>
                        <MyContainer>
                            <HStack justifyContent={"space-between"} onClick={()=>onMethodSelect(PAYMENT_METHOD_CREDIT_CARD)} cursor={"pointer"}>
                                <HStack gap={3}>
                                    <VStack gap={0.5}>
                                        <HStack gap={1}>
                                            <FontAwesomeIcon color="#959595" icon={faCcVisa} size="1x"/>
                                            <FontAwesomeIcon color="#959595" icon={faCcMastercard} size="1x"/>
                                        </HStack>
                                        <HStack gap={1}>
                                            <FontAwesomeIcon color="#959595" icon={faCcAmex} size="1x"/>
                                            <FontAwesomeIcon color="#959595" icon={faCcDinersClub} size="1x"/>
                                        </HStack>
                                    </VStack>
                                    <Text fontFamily={"robotoBold"} fontSize={22}>Tarjeta de credito/debito</Text>
                                </HStack>
                                <Radio size='lg' value={PAYMENT_METHOD_CREDIT_CARD}></Radio>
                            </HStack>
                        </MyContainer>
                        <MyContainer>
                            <HStack justifyContent={"space-between"} onClick={()=>onMethodSelect(PAYMENT_METHOD_YAPE)} cursor={"pointer"}>
                                <HStack gap={3}>
                                    <Image src="/images/yape_logo.png" width={10}/>
                                    <Text fontFamily={"robotoBold"} fontSize={22}>Yape</Text>
                                </HStack>
                                <Radio size='lg' value={PAYMENT_METHOD_YAPE}></Radio>
                            </HStack>
                        </MyContainer>
                        <MyContainer>
                            <HStack justifyContent={"space-between"} onClick={()=>onMethodSelect(PAYMENT_METHOD_PLIN)} cursor={"pointer"}>
                                <HStack gap={3}>
                                    <Image src="/images/plin_logo.png" width={10}/>
                                    <Text fontFamily={"robotoBold"} fontSize={22}>Plin</Text>
                                </HStack>
                                <Radio size='lg' value={PAYMENT_METHOD_PLIN}></Radio>
                            </HStack>
                        </MyContainer>
                    </VStack>
                </RadioGroup>
                {(methodSelected == PAYMENT_METHOD_BANK_ACCOUNT) ? <VStack width={"100%"} gap={3} alignItems={"start"}>
                    <MyContainer>
                        <Box textAlign={"center"}>
                            <Text fontSize={20}>Cuenta bancaria a depositar</Text>
                        </Box>
                        <Box marginTop={3}></Box>
                        <Text fontSize={20} fontFamily={"robotoBold"}>N° de cuenta: 23423523523623634234</Text>
                        <Text fontSize={20} fontFamily={"robotoBold"}>Nombre de la cuenta: Ticketea S.A</Text>
                    </MyContainer>
                    <MyContainer>
                        <Text fontSize={16} marginBottom={"15px"} color={"white.half"}>Deberá subir el comprobante del pago para validar que el abono se haya realizado correctamente</Text>
                        <FileUploader description="Selecciona o arrastra aquí el archivo del comprobante de pago"/>
                    </MyContainer>
                </VStack> : <></>}
                {(methodSelected == PAYMENT_METHOD_CREDIT_CARD) ? <MyContainer>
                    <Text fontSize={16} marginBottom={"15px"} color={"white.half"}>No te preocupes, no se guardará tu información</Text>
                    <VStack gap={2}>
                        <Input type="text" placeholder="Número de la tarjeta" />
                        <SimpleGrid columns={2} spacing={2} width={"100%"}>
                            <Input type="text" placeholder="Fecha de caducidad" />
                            <Input type="text" placeholder="CCV" />
                        </SimpleGrid>
                        <Input type="text" placeholder="Nombre titular de la tarjeta" />
                    </VStack>
                </MyContainer> : <></>}
                {(methodSelected == PAYMENT_METHOD_YAPE) ? <VStack width={"100%"} gap={3} alignItems={"start"}>
                <MyContainer>
                    <Center>
                        <VStack>
                            <Image src="/images/yape_qr.png" width={"150px"}></Image>
                            <Text>Yape</Text>
                            <Text>Nombre: Ticketea S.A</Text>
                        </VStack>
                    </Center>
                </MyContainer>
                <MyContainer>
                        <Text fontSize={16} marginBottom={"15px"} color={"white.half"}>Deberá subir el comprobante del pago para validar que el abono se haya realizado correctamente</Text>
                        <FileUploader description="Selecciona o arrastra aquí el archivo del comprobante de pago"/>
                    </MyContainer>
                </VStack> : <></>}
                {(methodSelected == PAYMENT_METHOD_PLIN) ? <VStack width={"100%"} gap={3} alignItems={"start"}>
                    <MyContainer>
                    <Center>
                        <VStack>
                            <Image src="/images/yape_qr.png" width={"150px"}></Image>
                            <Text>Plin</Text>
                            <Text>Nombre: Ticketea S.A</Text>
                        </VStack>
                    </Center>
                </MyContainer>
                <MyContainer>
                        <Text fontSize={16} marginBottom={"15px"} color={"white.half"}>Deberá subir el comprobante del pago para validar que el abono se haya realizado correctamente</Text>
                        <FileUploader description="Selecciona o arrastra aquí el archivo del comprobante de pago"/>
                    </MyContainer>
                </VStack> : <></>}
            </VStack>
        </>
    );
};

type Props = {
    onChange: (method: string) => void
};