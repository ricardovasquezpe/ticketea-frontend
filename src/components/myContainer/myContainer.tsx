import { Box } from "@chakra-ui/react";
import styles from "./myContainer.module.css";

export const MyContainer = (props: Props) => {
    return (
        <Box className={styles.parent}>
            {props.children}
        </Box>
    );
};

type Props = {
    children?: any
};