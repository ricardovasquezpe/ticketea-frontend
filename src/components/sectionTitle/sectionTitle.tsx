import { Text } from "@chakra-ui/react";

export const SectionTitle = (props: Props) => {
    return (
        <Text {...(props.asH1 == true ? {as:"h1"} : {})} fontSize={"22px"}>{props.title}</Text>
    );
};

type Props = {
    title: string,
    asH1?: boolean
};