import { Input, Text, VStack } from "@chakra-ui/react";
import { MyModal } from "../myModal";
import { MyButton } from "../../myButton/myButton";
import { ChangeEvent, useState } from "react";
import Utils from "../../../utils/utils";
import { updateMyUserPhoto } from "../../../services/user.service";
import { ErrorType } from "../../../utils/enums/errorType.enum";

export const changeProfilePhotoModal = (props: Props) => {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("" as any);
    const [file, setFile] = useState<File>();

    const onChangeInputFile = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    }

    const changeAction = async () => {
        if(file != null){
            setErrorMessage("");
            setLoading(true);

            if(!Utils.validateImageFileType(file.type)){
                setErrorMessage("El archivo debe ser una imagen");
                setLoading(false);
                return;
            }

            var formData = new FormData();
            formData.append("image", file);
            var response = await updateMyUserPhoto(formData);
            if(response.data.errorType == ErrorType.Validation){
                setLoading(false);
                setErrorMessage("Falta llenar algunos campos");
                return;
            }

            if(response.data.errorType  == ErrorType.Simple){
                setLoading(false);
                setErrorMessage(response.data.message);
                return;
            }

            props.onSave();
        }
    }

    const footerComponents = () => {
        return <VStack gap={3}>
                <MyButton textColor="white" 
                                    backgroundColor="secondary.default" 
                                    backgroundColorHover="secondary.dark" 
                                    title={"Guardar"}
                                    fontSize="18px"
                                    padding="14px 28px"
                                    onClick={changeAction}
                                    isLoading={loading}></MyButton>
                <Text color={"red.default"} textAlign={"center"} fontSize={"14px"}>{errorMessage}</Text>
            </VStack>
    }

    const bodyComponents = () => {
        return <VStack>
            <Input type="file" accept="image/png, image/jpeg" onChange={onChangeInputFile}/>
            <Text color={"white.half"} fontSize={"15px"}>* Recuerda que solo podrás cambiar tu foto de perfil 2 vecez máximo</Text>
        </VStack>
    }

    return (
        <MyModal 
            size="md"
            maxWidth={"var(--chakra-sizes-md)"}
            closeButton={true}
            onClose={props.onClose} 
            closeOnOverlay={true}
            titleComponent={<Text fontSize={22}>Cambiar foto de perfil</Text>}
            bodyComponent={bodyComponents()}
            footerComponent={footerComponents()}/>
    );
};

type Props = {
    onClose: () => void,
    onSave: () => void,
    onCancel: () => void
};