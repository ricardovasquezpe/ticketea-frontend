import { Text, VStack } from "@chakra-ui/react";
import { MyDialog } from "../myDialog";

export const ConfirmUserUpdateDialog = (props: Props) => {
    return (
        <MyDialog description={<VStack>
                                <Text>- Tendrás que volver a hacer la validacion de tu documento de identificación</Text>
                                <Text>- Tus entradas que esten a la venta estarán en pausa hasta que termines de hacer la validacion nuevamente</Text>
                                <Text fontSize={"16px"} color={"white.half"} marginTop={"20px"}>* Recuerda que solo podrás cambiar tu información 2 vecez máximo</Text>
                                </VStack>}
                  title="¿Estas seguro de actualizar tu información?"
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