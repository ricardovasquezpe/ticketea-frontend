import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, HStack } from "@chakra-ui/react";
import React from "react";
import styles from "./myDialog.module.css";
import { MyButton } from "../myButton/myButton";

export const MyDialog = (props: Props) => {
    const cancelRef = React.createRef<HTMLButtonElement>();

    return (
        <>
            <AlertDialog
                isOpen={true}
                onClose={props.onClose}
                leastDestructiveRef={cancelRef}>
                <AlertDialogOverlay>
                <AlertDialogContent bg={"primary.default"}>
                    <AlertDialogHeader className={styles.header} fontSize='lg' fontWeight='bold'>
                        {props.title}
                    </AlertDialogHeader>

                    <AlertDialogBody>
                        {props.description}
                    </AlertDialogBody>

                    <AlertDialogFooter>
                        <HStack>
                            <MyButton textColor="white" 
                                    backgroundColor="grey.default" 
                                    backgroundColorHover="grey.dark" 
                                    title={props.onCancelButtonText}
                                    fontSize="18px"
                                    onClick={props.onClose}
                                    padding="14px"></MyButton>
                            <MyButton textColor="white" 
                                    backgroundColor="secondary.default" 
                                    backgroundColorHover="secondary.dark" 
                                    title={props.onAcceptButtonText}
                                    fontSize="18px"
                                    onClick={props.onAccept}
                                    padding="14px"></MyButton>
                        </HStack>
                    </AlertDialogFooter>
                </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    );
};

type Props = {
    onClose: () => void,
    onAccept: () => void,
    onAcceptButtonText: string,
    onCancelButtonText: string,
    title: string;
    description: any
};