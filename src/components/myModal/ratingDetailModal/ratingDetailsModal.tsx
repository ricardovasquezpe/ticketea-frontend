import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import { MyModal } from "../myModal";
import { MyContainer } from "../../myContainer/myContainer";
import { StarIcon } from "@chakra-ui/icons";
import { Rating } from "../../../services/models/rating.model";

export const RatingDetailModal = (props: Props) => {
    const bodyComponents = () => {
        return <Box textAlign={"center"} overflowY={"scroll"} maxHeight={300}>
                    <VStack gap={2}>
                        {
                            props.ratings.map((rating: Rating, index: any) =>(
                                <MyContainer key={index}>
                                    <HStack gap={1}>
                                        <HStack>
                                            <Text>{rating.rating}</Text>
                                            <StarIcon color={"gold.default"}/>
                                        </HStack>
                                        <Text style={{width: "100%", wordBreak: "break-all"}}>
                                            {rating.comment}
                                        </Text>
                                    </HStack>
                                </MyContainer>
                            ))
                        }
                    </VStack>
                </Box>;
    }

    return (
        <MyModal 
            size="sm"
            maxWidth={"var(--chakra-sizes-sm)"}
            closeButton={true} 
            onClose={props.onClose} 
            closeOnOverlay={true}
            titleComponent={<Text fontSize={20}>Valoraciones</Text>}
            bodyComponent={bodyComponents()}/>
    );
};

type Props = {
    onClose: () => void,
    onSave: () => void,
    onCancel: () => void,
    ratings: Rating[]
};