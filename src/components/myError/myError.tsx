import { Box, Code, HStack } from "@chakra-ui/react";

export const MyError = () => {
    return(
        <Box padding={5}>
            <HStack justifyContent={"center"}>
                <Code colorScheme='red' children="var ticketea = 'Tuvimos un problemita, pero lo resolveremos lo mas rápido posible!'" />
            </HStack>
        </Box>
    );
}