import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import { MyModal } from "../myModal";
import { MyContainer } from "../../myContainer/myContainer";
import { StarIcon } from "@chakra-ui/icons";

export const RatingDetailModal = (props: Props) => {
    const bodyComponents = () => {
        return <Box textAlign={"center"} overflowY={"scroll"} maxHeight={300}>
                <VStack gap={2}>
                    <MyContainer>
                        <HStack gap={1}>
                            <HStack>
                                <Text>5</Text>
                                <StarIcon color={"gold.default"}/>
                            </HStack>
                            <Text style={{width: "100%", wordBreak: "break-all"}}>
                                El vendedor fue muy amable y me ayudo a nominar mi entrada
                            </Text>
                        </HStack>
                    </MyContainer>

                    <MyContainer>
                        <HStack gap={1}>
                            <HStack>
                                <Text>4</Text>
                                <StarIcon color={"gold.default"}/>
                            </HStack>
                            <Text style={{width: "100%", wordBreak: "break-all"}}>
                                El vendedor me guio en todo momento para poder nominar mi entrada de manera segura
                            </Text>
                        </HStack>
                    </MyContainer>

                    <MyContainer>
                        <HStack gap={1}>
                            <HStack>
                                <Text>3</Text>
                                <StarIcon color={"gold.default"}/>
                            </HStack>
                            <Text style={{width: "100%", wordBreak: "break-all"}}>
                                Hubo algunos retrasos pero llegue a tener la entrada de manera segura
                            </Text>
                        </HStack>
                    </MyContainer>

                    <MyContainer>
                        <HStack gap={1}>
                            <HStack>
                                <Text>5</Text>
                                <StarIcon color={"gold.default"}/>
                            </HStack>
                            <Text style={{width: "100%", wordBreak: "break-all"}}>
                                En todo momento estuve en comunicacion con el vendedor para resolver mis preguntas
                            </Text>
                        </HStack>
                    </MyContainer>

                    <MyContainer>
                        <HStack gap={1}>
                            <HStack>
                                <Text>4</Text>
                                <StarIcon color={"gold.default"}/>
                            </HStack>
                            <Text style={{width: "100%", wordBreak: "break-all"}}>
                                Todo muy bien con la compra!
                            </Text>
                        </HStack>
                    </MyContainer>
                </VStack>
            </Box>;
    }

    return (
        <MyModal 
            size="sm"
            maxWidth={"var(--chakra-sizes-sm)"}
            closeButton={true} 
            onClose={props.onClose} 
            closeOnOverlay={true}
            titleComponent={<Text fontSize={20}>Valoraciones</Text>}
            bodyComponent={bodyComponents()}/>
    );
};

type Props = {
    onClose: () => void,
    onSave: () => void,
    onCancel: () => void,
};