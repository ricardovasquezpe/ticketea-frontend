import { Box, Text } from "@chakra-ui/react";
import { MyDialog } from "../myDialog";
import { deleteTicket } from "../../../services/ticket.service";

export const DeleteTicketDialog = (props: Props) => {

    const onDelete = async () => {
        await deleteTicket(props.ticketId);
        props.onSave();
    }

    return (
        <MyDialog description={<Box><Text>¿Estas seguro de eliminar el ticket?</Text> <Text fontSize={"16px"} color={"white.half"}>Al eliminar el ticket ya no aparecerá en la busqueda</Text></Box>}
                  title="Eliminar ticket"
                  onAcceptButtonText="Eliminar"
                  onCancelButtonText="Cerrar"
                  onClose={props.onClose}
                  onAccept={onDelete}/>
    );
};

type Props = {
    onClose: () => void,
    onSave: () => void,
    onCancel: () => void,
    ticketId: string
};