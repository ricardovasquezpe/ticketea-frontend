import { Box, Spinner, Text } from "@chakra-ui/react";
import { MyModal } from "../myModal";

export const LoadingModal = (props: Props) => {
    const bodyComponents = () => {
        return <Box textAlign={"center"}>
                <Spinner size='lg'/>
            </Box>;
    }

    return (
        <MyModal 
            size="sm"
            maxWidth={"200"}
            closeButton={false} 
            onClose={props.onClose} 
            closeOnOverlay={false}
            titleComponent={<Text fontSize={20}>{props.title}</Text>}
            bodyComponent={bodyComponents()}/>
    );
};

type Props = {
    onClose: () => void,
    onSave: () => void,
    onCancel: () => void,
    title: string
};