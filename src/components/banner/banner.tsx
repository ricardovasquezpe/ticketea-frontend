import { Box, CloseButton, Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useModal } from "../../config/modal/use-modal";
import { Modals } from "../../config/modal/modal-config";
import { useNavigate } from "react-router-dom";
import Session from "../../utils/session";

const Banner = () => {
    const [isVisible, setIsVisible] = useState(false);
    const registerModal = useModal<any>(Modals.RegisterModal);
    const navigate = useNavigate();

    useEffect(()=> {
        setIsVisible(Session.getBannerVisibility());
    }, []);

    const handleClose = () => {
        Session.saveBannerVisibility();
        setIsVisible(false);
    };

    const clickBanner = () => {
        registerModal.open({
            onSave: () => {
                registerModal.close();
                navigate("/vender-ticket");
            },
            onClose: () => {
                registerModal.close();
            },
            onCancel: () => {
                registerModal.close();
            },
          });
    }

    if (!isVisible) return null;

    return (
        <Box position="fixed"
            bottom="0"
            width="100%"
            textAlign="center"
            bg="gray.800"
        >
            <Box position="relative" width="100%" >
                <CloseButton 
                    position="absolute"
                    top="0"
                    right="0"
                    m={2}
                    onClick={handleClose}
                    color={"black"}
                />
                <Image width={"100%"} 
                       src={"/images/banner.png"} 
                       onClick={clickBanner} 
                       cursor={"pointer"}
                       display={{ base: "none", md: "block" }}/>
                <Image 
                    width={"100%"} 
                    src={"/images/banner_mobile.png"} 
                    onClick={clickBanner} 
                    cursor={"pointer"}
                    display={{ base: "block", md: "none" }} />
            </Box>
        </Box>
    );
}

export default Banner;