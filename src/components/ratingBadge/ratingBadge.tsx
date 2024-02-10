import { StarIcon } from "@chakra-ui/icons";
import { Badge, HStack, Text } from "@chakra-ui/react";

export const RatingBadge = (props: Props) => {
    const getBadgeColor = () => {
        if(props.rating <= 1){
            return "grey";
        } else if(props.rating <= 3){
            return "orange";
        } else {
            return "gold";
        }
    }

    return (
        <Badge id={props.id} variant={getBadgeColor()} cursor={"pointer"} onClick={(props.rating != 0) ? props.onClick : ()=>{}}>
            <HStack spacing={1}>
                {(props.rating != 0) ? 
                <>
                    <Text>{props.rating}</Text> 
                    <StarIcon color={"#323232"}/> 
                    <Text>Valoración</Text>
                </> : <>
                    Nuevo vendedor
                </>}
            </HStack>
        </Badge>
    );
};

type Props = {
    rating: number,
    onClick?: () => void,
    id?: string
};