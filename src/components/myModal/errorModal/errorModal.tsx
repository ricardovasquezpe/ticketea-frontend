import { Box, Text } from "@chakra-ui/react";
import { MyModal } from "../myModal";
import { MyButton } from "../../myButton/myButton";

export const ErrorModal = (props: Props) => {
    const bodyComponents = () => {
        return <Box textAlign={"center"}>
                <Text>Hubo un error con nuestros servidores, porfavor recargar la página e intentar nuevamente, gracias</Text>
            </Box>;
    }

    const click = () => {
        window.location.reload();
    }

    const footerComponents = () => {
        return <Box>
            <MyButton textColor="white" 
                                backgroundColor="secondary.default" 
                                backgroundColorHover="secondary.dark" 
                                title={"Recargar la página"}
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
            titleComponent={<Text fontSize={20}>Algo esta pasando</Text>}
            bodyComponent={bodyComponents()}
            footerComponent={footerComponents()}/>
    );
};

type Props = {
    onClose: () => void,
    onSave: () => void,
    onCancel: () => void,
};