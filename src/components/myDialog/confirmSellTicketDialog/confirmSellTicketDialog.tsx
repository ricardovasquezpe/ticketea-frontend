import { Box, Text } from "@chakra-ui/react";
import { MyDialog } from "../myDialog";
import { sellTicket } from "../../../services/ticket.service";

export const ConfirmSellTicketDialog = (props: Props) => {
    const onSell = async () => {
        await sellTicket(props.ticketId);
        props.onSave();
    }

    return (
        <MyDialog description={<Box><Text>Muchas gracias por utilizar Ticketea!</Text> <Text fontSize={"16px"} color={"white.half"}>Al confirmar que has vendido la entrada, ya no aparecerá en la busqueda</Text></Box>}
                  title="¿Pudiste vender tu entrada?"
                  onAcceptButtonText="Confirmar"
                  onCancelButtonText="Cerrar"
                  onClose={props.onClose}
                  onAccept={onSell}/>
    );
};

type Props = {
    onClose: () => void,
    onSave: () => void,
    onCancel: () => void,
    ticketId: string
};