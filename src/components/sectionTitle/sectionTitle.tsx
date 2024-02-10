import { Text } from "@chakra-ui/react";

export const SectionTitle = (props: Props) => {
    return (
        <Text fontSize={"22px"}>{props.title}</Text>
    );
};

type Props = {
    title: string
};