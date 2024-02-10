import { Box, Text, Textarea } from "@chakra-ui/react";
import { MyModal } from "../myModal";
import { MyButton } from "../../myButton/myButton";

export const RequestRefundModal = (props: Props) => {
    const bodyComponents = () => {
        return <Box>
                    <Text fontSize={"14px"} color={"white.half"}>Cuentanos porque estas pidiendo una devolución</Text>
                    <Textarea marginTop={"10px"} bg={"primary.moreLight"} borderColor={"primary.moreLight"} placeholder='Dejanos tu comentario sobre tu compra' />
                </Box>;
    }

    const footerComponents = () => {
        return <Box>
                    <MyButton textColor="white" 
                        backgroundColor="secondary.default" 
                        backgroundColorHover="secondary.dark" 
                        title={"Confirmar"}
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
            titleComponent={<Text fontSize={"18px"} textAlign={"left"}>Devolución Ticket</Text>}
            bodyComponent={bodyComponents()}
            footerComponent={footerComponents()}/>
    );
};

type Props = {
    onClose: () => void,
    onSave: () => void,
    onCancel: () => void,
};