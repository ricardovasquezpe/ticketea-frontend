import { Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, Flex, Text } from "@chakra-ui/react";

export const MyDrawer = (props: any) =>  {
      return (
        <Flex w={props.width}>
          <Drawer
            isOpen={props.isOpen}
            placement={props.placement}
            onClose={props.onClose}
            finalFocusRef={props.btnRef}
            size={"xs"}>
            <DrawerOverlay />
            <DrawerContent alignItems="center">
              <DrawerCloseButton alignSelf="end"/>
              <DrawerHeader>
                <Text as="p"> {props.title} </Text>
              </DrawerHeader>
              <DrawerBody>{props.children}</DrawerBody>
              <DrawerFooter>{props.footer}</DrawerFooter>
            </DrawerContent>
          </Drawer>
        </Flex>
      );
    }