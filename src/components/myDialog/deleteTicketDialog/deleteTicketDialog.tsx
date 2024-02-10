import { Box, Text } from "@chakra-ui/react";
import { MyDialog } from "../myDialog";

export const DeleteTicketDialog = (props: Props) => {
    return (
        <MyDialog description={<Box><Text>¿Estas seguro de eliminar el ticket?</Text> <Text fontSize={"16px"} color={"white.half"}>Al eliminar el ticket ya no aparecerá en la busqueda</Text></Box>}
                  title="Eliminar ticket"
                  onAcceptButtonText="Eliminar"
                  onCancelButtonText="Cerrar"
                  onClose={props.onClose}
                  onAccept={props.onSave}/>
    );
};

type Props = {
    onClose: () => void,
    onSave: () => void,
    onCancel: () => void,
};