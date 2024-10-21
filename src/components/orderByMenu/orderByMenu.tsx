import { Text } from "@chakra-ui/react";
import styles from "./orderByMenu.module.css";
import { useState } from "react";

export const OrderByMenu = (props: Props) => {
    const [active, setActive] = useState(props.default);
    const [order, setOrder] = useState("Menor a mayor");

    const click = () => {
        setActive(!active);
        props.onChange(!active);
        if(!active){
            setOrder("Menor a mayor");
        } else {
            setOrder("Mayor a Menor");
        }
    }

    return (
        <Text className={styles.headerActive} onClick={click}>
            {props.text} - {order}
        </Text>
    );
};

type Props = {
    text: string,
    onChange: (active: boolean) => void,
    default: boolean
};