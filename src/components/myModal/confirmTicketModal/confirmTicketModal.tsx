import { Box, Text, Textarea } from "@chakra-ui/react";
import { MyModal } from "../myModal";
import { MyButton } from "../../myButton/myButton";
import { Rating } from "../../rating/rating";

export const ConfirmTicketModal = (props: Props) => {
    const handleRating = (rate: number) => {
        //console.log(rate);
    }

    const bodyComponents = () => {
        return <Box>
                    <Rating onClick={handleRating}/>
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
            titleComponent={<Text fontSize={"18px"} textAlign={"left"}>Confirmar Ticket</Text>}
            bodyComponent={bodyComponents()}
            footerComponent={footerComponents()}/>
    );
};

type Props = {
    onClose: () => void,
    onSave: () => void,
    onCancel: () => void,
};