import { Box, Input, InputGroup, InputLeftAddon, Text, VStack } from "@chakra-ui/react";
import { MyModal } from "../myModal";
import { MyButton } from "../../myButton/myButton";
import Utils from "../../../utils/utils";
import { updateTicketPrice } from "../../../services/ticket.service";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorType } from "../../../utils/enums/errorType.enum";

export const EditTicketPriceModal = (props: Props) => {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("" as any);
    const { register: editPrice, trigger: editPriceTrigger, getValues: editPriceGetValues, formState: { errors }, setValue: editPriceSetValue } = useForm();

    const handlePrecioChange = (e: any) => {
        let input = e.target.value;
        input = input.replace(/[^0-9.]/g, "");
        if (input.split(".").length > 2) {
            input = input.slice(0, -1);
        }

        editPriceSetValue("price", input);
    }

    const bodyComponents = () => {
        return <Box>
                    <Text fontSize={"14px"} marginBottom={"5px"} color={"white.half"}>Precio actual S/{Utils.currencyFormat(props.actualPrice)}</Text>
                    <InputGroup>
                        <InputLeftAddon bg={"#0a272e"}>
                            S/.
                        </InputLeftAddon>
                        <Input placeholder='Nuevo precio'
                               {...editPrice("price",{
                                required: "El precio es requerido",
                                onChange: (e) => { handlePrecioChange(e) },
                                min: 1
                            })} 
                           isInvalid={(errors?.price?.message != null) ? true : false}/>
                    </InputGroup>
                </Box>;
    }

    const footerComponents = () => {
        return <VStack gap={3}>
                    <MyButton textColor="white" 
                        backgroundColor="secondary.default" 
                        backgroundColorHover="secondary.dark" 
                        title={"Guardar"}
                        fontSize="18px"
                        padding="14px 28px"
                        onClick={onEdit}
                        isLoading={loading}></MyButton>
                    <Text color={"red.default"} textAlign={"center"} fontSize={"14px"}>{errorMessage}</Text>
                </VStack>
    }

    const onEdit = async () => {
        const isValid = await editPriceTrigger(["price"], { shouldFocus: true });
        if(!isValid){
            setErrorMessage(Object.values(errors)[0]?.message);
            return;
        }

        setLoading(true);
        var response = await updateTicketPrice(props.ticketId, editPriceGetValues());
        if(response.data.errorType == ErrorType.ValidationError){
            setErrorMessage("Falta llenar algunos campos");
            setLoading(false);
            return;
        }

        if(response.data.errorType  == ErrorType.Info){
            setLoading(false);
            setErrorMessage(response.data.message);
            return;
        }

        props.onSave();
    }

    return (
        <MyModal 
            size="xs"
            maxWidth={"var(--chakra-sizes-xs)"}
            closeButton={true}
            onClose={props.onClose} 
            closeOnOverlay={true}
            titleComponent={<Text fontSize={"18px"} textAlign={"left"}>Editar precio</Text>}
            bodyComponent={bodyComponents()}
            footerComponent={footerComponents()}/>
    );
};

type Props = {
    onClose: () => void,
    onSave: () => void,
    onCancel: () => void,
    ticketId: string,
    actualPrice: number
};