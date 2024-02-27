import { Button } from "@chakra-ui/react";

export const MyButton = (props: Props) => {
    return (
        <>
            <Button bg={props.backgroundColor} 
                    color={props.textColor} 
                    fontWeight={"normal"} 
                    borderRadius={"custom"} 
                    _hover={{bg: props.backgroundColorHover, transition: "background 0.3s ease-in-out"}}
                    fontSize={props.fontSize}
                    padding={props.padding}
                    className={props.className}
                    onClick={props.onClick}
                    isDisabled={props.isDisabled}
                    border={props.border}
                    size={props.size}
                    width={props.width}
                    isLoading={props.isLoading}
                    whiteSpace={"normal"}>
                {props.title}
            </Button>
        </>
    );
};

type Props = {
    title: string,
    backgroundColor: string,
    backgroundColorHover: string,
    textColor: string,
    fontSize: string,
    padding: string,
    className? : string | undefined,
    onClick?: () => void,
    isDisabled?: boolean,
    border?: string,
    size?: string,
    width?: string,
    isLoading?: boolean
};
