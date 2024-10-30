import { Input, InputGroup, InputLeftAddon, Text, useToast, VStack } from "@chakra-ui/react";
import { MyModal } from "../myModal";
import { MyButton } from "../../myButton/myButton";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { ErrorType } from "../../../utils/enums/errorType.enum";
import { requestTicketInfo } from "../../../services/ticket.service";

export const RequestTicketModal = (props: Props) => {
    const { register: request,
        trigger: requestTrigger,
        getValues: requestGetValues,
        formState: { errors },
        clearErrors } = useForm();
    const [errorMessage, setErrorMessage] = useState("" as any);
    const [loading, setLoading] = useState(false);
    const toast = useToast();

    const bodyComponents = () => {
        return <VStack gap={3} alignItems={"start"}>
            <Text as={"label"} textAlign={"center"} color={"white.half"} fontSize={"14px"}>Enviaremos tu información al vendedor y el se pondrá en contacto contigo para acordar la compra y venta de la entrada!</Text>
            <Input placeholder='Nombre Completo' {...request("name", { required: "El Nombre completo es obligatorio", validate: (value) => { return !!value.trim() }, maxLength: { value: 100, message: "Los Nombres no debe ser tener de 100 caracteres" }, setValueAs: value => value.trim() })} isInvalid={(errors?.name?.message != null) ? true : false} />
            <Input placeholder='Correo Electrónico' {...request("email", { required: "El Correo electrónico es obligatorio", validate: (value) => { return !!value.trim() }, pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "El correo electrónico debe ser un email valido" }, maxLength: { value: 150, message: "El Correo electrónico no debe tener mas de 150 caracteres" }, setValueAs: value => value.trim() })} isInvalid={(errors?.email?.message != null) ? true : false} />
            <InputGroup>
                <InputLeftAddon bg={"#0a272e"}>
                    +51
                </InputLeftAddon>
                <Input type='text'
                    inputMode="numeric"
                    maxLength={9}
                    placeholder='Número Celular'
                    {...request("phone", {
                        required: "El número celular es obligatorio",
                        pattern: { value: /^\d{9}$/, message: "El número de celular debe tener 9 dígitos" }
                    })}
                    isInvalid={(errors?.phone?.message != null) ? true : false} />
            </InputGroup>
        </VStack>;
    }

    const footerComponents = () => {
        return <VStack gap={3}>
            <MyButton textColor="white"
                backgroundColor="secondary.default"
                backgroundColorHover="secondary.dark"
                title={"Enviar mi información"}
                fontSize="18px"
                padding="14px 28px"
                onClick={onRequest}
                isLoading={loading}></MyButton>
            <Text color={"red.default"} textAlign={"center"} fontSize={"14px"}>
                {errorMessage && errorMessage}
                {(Object.values(errors).length != 0) && <p>{Object.values(errors)[0]?.message + ""}</p>}
            </Text>
        </VStack>
    }

    const onRequest = async () => {
        setErrorMessage("");
        const isValid = await requestTrigger(["name", "email", "phone"], { shouldFocus: true });
        if (!isValid) {
            return;
        }

        clearErrors();
        setErrorMessage("");
        setLoading(true);
        var response = await requestTicketInfo(props.ticketId, requestGetValues());
        if (response.data.errorType == ErrorType.ValidationError) {
            setLoading(false);
            setErrorMessage("Falta llenar algunos campos");
            return;
        }

        if (response.data.errorType == ErrorType.Info) {
            setLoading(false);
            setErrorMessage(response.data.message);
            return;
        }

        toast({
            title: 'El vendedor se contactará contigo en unos momentos!',
            status: 'success',
            containerStyle: {
                fontSize: "16px"
            },
            duration: 9000,
            isClosable: true,
        });
        props.onSave();
    }

    return (
        <MyModal
            size="xs"
            maxWidth={"var(--chakra-sizes-xs)"}
            closeButton={true}
            onClose={props.onClose}
            closeOnOverlay={true}
            titleComponent={<Text fontSize={22}>Envia tu información al vendedor!</Text>}
            bodyComponent={bodyComponents()}
            footerComponent={footerComponents()} />
    );
};

type Props = {
    onClose: () => void,
    onSave: () => void,
    onCancel: () => void,
    ticketId: string,
};