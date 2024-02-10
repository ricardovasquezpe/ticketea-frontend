import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import styles from "./myModal.module.css";

export const MyModal = (props: Props) => {
    return (
        <>
            <Modal isOpen={true} 
                   onClose={props.onClose} 
                   size={props.size}
                   closeOnOverlayClick={props.closeOnOverlay}  
                   isCentered>
                <ModalOverlay backdropFilter='blur(5px)'/>
                <ModalContent className={styles.content} bg={"primary.default"} maxW={props.maxWidth}>
                    {(props.titleComponent) && <ModalHeader className={styles.header}>{props.titleComponent}</ModalHeader>}
                    {(props.closeButton) && <ModalCloseButton />}
                    <ModalBody>
                        {(props.bodyComponent) && props.bodyComponent}
                    </ModalBody>
                    {(props.footerComponent) && <ModalFooter justifyContent={"center"}>{props.footerComponent}</ModalFooter>}
                </ModalContent>
            </Modal>
        </>
    );
};

type Props = {
    onClose: () => void,
    closeButton : boolean,
    closeOnOverlay: boolean,
    titleComponent?: any,
    bodyComponent?: any,
    footerComponent?: any,
    size: string,
    maxHeigth?: string,
    maxWidth: string
};  