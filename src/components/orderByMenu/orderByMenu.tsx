import { Text } from "@chakra-ui/react";
import styles from "./orderByMenu.module.css";
import { useState } from "react";

export const OrderByMenu = (props: Props) => {
    const [active, setActive] = useState(false);

    const click = () => {
        setActive(!active);
        props.onChange(!active);
    }

    return (
        <Text className={(active) ? styles.headerActive : styles.header} onClick={click}>
            {props.text}
        </Text>
    );
};

type Props = {
    text: string,
    onChange: (active: boolean) => void
};