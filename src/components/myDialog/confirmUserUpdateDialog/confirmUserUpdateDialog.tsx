import { Text, VStack } from "@chakra-ui/react";
import { MyDialog } from "../myDialog";

export const ConfirmUserUpdateDialog = (props: Props) => {
    return (
        <MyDialog description={<VStack>
                                <Text>¿Estas seguro de actualizar tu información?</Text> 
                                <Text fontSize={"16px"} color={"white.half"}>* Recuerda que solo podrás cambiar tu información 2 vecez máximo</Text>
                                </VStack>}
                  title="Actualizar tu información"
                  onAcceptButtonText="Guardar"
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