import { Spinner, VStack } from "@chakra-ui/react";

export const Loading = ({ height100vh = false }: Props) => {
    return (
        <VStack gap={5} align='stretch' alignItems={"center"} justifyContent={"center"} height={(height100vh) ? "100vh" : "100%"}>
            <Spinner size='xl' thickness='5px' color='secondary.default' />
        </VStack>
    );
}

type Props = {
    height100vh?: boolean;
};