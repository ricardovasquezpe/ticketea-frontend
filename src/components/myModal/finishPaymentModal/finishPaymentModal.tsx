import { Box, Text } from "@chakra-ui/react";
import { MyModal } from "../myModal";
import { MyButton } from "../../myButton/myButton";

export const FinishPaymentModal = (props: Props) => {
    const bodyComponents = () => {
        return <Box textAlign={"center"}>
                <Text>Estamos validando tu pago, cuando se haya confirmado te enviaremos un email con los datos del comprador para que te puedas poner en contacto con el</Text>
            </Box>;
    }

    const click = () => {
        props.onClose();
    }

    const footerComponents = () => {
        return <Box>
            <MyButton textColor="white" 
                                backgroundColor="secondary.default" 
                                backgroundColorHover="secondary.dark" 
                                title={"Volver a buscar mas entradas"}
                                fontSize="18px"
                                padding="14px"
                                onClick={click}></MyButton>
        </Box>
    }

    return (
        <MyModal 
            size="sm"
            maxWidth={"var(--chakra-sizes-sm)"}
            closeButton={false}
            onClose={props.onClose} 
            closeOnOverlay={false}
            titleComponent={<Text fontSize={20}>Gracias por tu compra!</Text>}
            bodyComponent={bodyComponents()}
            footerComponent={footerComponents()}/>
    );
};

type Props = {
    onClose: () => void,
    onSave: () => void,
    onCancel: () => void,
};