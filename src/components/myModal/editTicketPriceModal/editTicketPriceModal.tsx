import { Box, Input, InputGroup, InputLeftAddon, Text } from "@chakra-ui/react";
import { MyModal } from "../myModal";
import { MyButton } from "../../myButton/myButton";

export const EditTicketPriceModal = (props: Props) => {
    const bodyComponents = () => {
        return <Box>
                    <Text fontSize={"14px"} marginBottom={"5px"} color={"white.half"}>Precio actual S/200</Text>
                    <InputGroup>
                        <InputLeftAddon bg={"#0a272e"}>
                            S/.
                        </InputLeftAddon>
                        <Input placeholder='Nuevo precio'/>
                    </InputGroup>
                </Box>;
    }

    const footerComponents = () => {
        return <Box>
                    <MyButton textColor="white" 
                        backgroundColor="secondary.default" 
                        backgroundColorHover="secondary.dark" 
                        title={"Guardar"}
                        fontSize="18px"
                        padding="14px 28px"></MyButton>
                </Box>
    }

    return (
        <MyModal 
            size="xs"
            maxWidth={"var(--chakra-sizes-xs)"}
            closeButton={true}
            onClose={props.onClose} 
            closeOnOverlay={true}
            titleComponent={<Text fontSize={"18px"} textAlign={"left"}>Editar precio</Text>}
            bodyComponent={bodyComponents()}
            footerComponent={footerComponents()}/>
    );
};

type Props = {
    onClose: () => void,
    onSave: () => void,
    onCancel: () => void,
};