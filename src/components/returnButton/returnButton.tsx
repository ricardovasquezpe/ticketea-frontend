import { ArrowBackIcon } from "@chakra-ui/icons";
import { HStack, Text } from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';
import styles from "./returnButton.module.css";

export const ReturnButton = (props: Props) => {
    const navigate = useNavigate();
    const click = () => {
        navigate(-1);
    }

    return (
        <HStack onClick={click} className={styles.container}>
            <ArrowBackIcon></ArrowBackIcon>
            <Text>Regresar</Text>
        </HStack>
    );
};

type Props = {
    route: string
};