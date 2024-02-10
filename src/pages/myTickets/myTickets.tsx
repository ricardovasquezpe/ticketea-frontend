import { Box, HStack, Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs, VStack } from "@chakra-ui/react";
import { EventTicketCard } from "../../components/eventTicketCard/eventTicketCard";
import { MyButton } from "../../components/myButton/myButton";
import { useModal } from "../../config/modal/use-modal";
import { Modals } from "../../config/modal/modal-config";

export const MyTickets = () => {
    const confirmTicketModal = useModal<any>(Modals.ConfirmTicketModal);
    const confirmTicket = () => {
        confirmTicketModal.open({
          onSave: () => {
            console.log("OnSave");
          },
          onClose: () => {
            console.log("onClose");
            confirmTicketModal.close();
          },
          onCancel: () => {
            console.log("onCancel");
            confirmTicketModal.close();
          },
        });
    }

    const deleteTicketDialog = useModal<any>(Modals.DeleteTicketDialog);
    const deleteTicket = () => {
        deleteTicketDialog.open({
          onSave: () => {
            console.log("OnSave");
          },
          onClose: () => {
            console.log("onClose");
            deleteTicketDialog.close();
          },
          onCancel: () => {
            console.log("onCancel");
            deleteTicketDialog.close();
          },
        });
    }

    const requestRefundModal = useModal<any>(Modals.RequestRefundModal);
    const requestRefund = () => {
        requestRefundModal.open({
          onSave: () => {
            console.log("OnSave");
          },
          onClose: () => {
            console.log("onClose");
            requestRefundModal.close();
          },
          onCancel: () => {
            console.log("onCancel");
            requestRefundModal.close();
          },
        });
    }

    const editTicketPriceModal = useModal<any>(Modals.EditTicketPriceModal);
    const editTicketPrice = () => {
      editTicketPriceModal.open({
          onSave: () => {
            console.log("OnSave");
          },
          onClose: () => {
            console.log("onClose");
            editTicketPriceModal.close();
          },
          onCancel: () => {
            console.log("onCancel");
            editTicketPriceModal.close();
          },
        });
    }

    return (
        <>
            <Box padding={{"base": "40px 1.5rem", "sm": "40px 1.5rem", "customMd": "40px 250px", "customLg": "40px 350px", "customXl": "40px 450px"}}>
                <Tabs variant="unstyled">
                    <TabList>
                        <Tab>Mis entradas vendidas</Tab>
                        <Tab>Mis entradas compradas</Tab>
                    </TabList>
                    <TabIndicator
                        mt="-1.5px"
                        height="2px"
                        bg="blue.500"
                        borderRadius="1px"/>
                    <TabPanels>
                        <TabPanel>
                            <VStack justifyContent={"stretch"}>
                                <HStack width={"100%"}>
                                    <EventTicketCard eventImage={"https://cdn.teleticket.com.pe/especiales/badbunny2022-fecha2/images/ICS012_rs.jpg"}
                                            eventName={"World Hottest Tour"}
                                            artistName={"Bad Bunny"}
                                            eventDate={"19 feb 2024"}
                                            ticketZone="Zona Playa"
                                            ticketPrice={200}
                                            seat="45D"></EventTicketCard>
                                    <VStack alignItems={"start"}>
                                        <MyButton textColor="white" 
                                                backgroundColor="red.default" 
                                                backgroundColorHover="red.dark" 
                                                title={"Eliminar"}
                                                fontSize="14px"
                                                padding="0px 5px"
                                                onClick={deleteTicket}
                                                width="100%"></MyButton>
                                        <MyButton textColor="white" 
                                                backgroundColor="secondary.default" 
                                                backgroundColorHover="secondary.dark" 
                                                title={"Editar Precio"}
                                                fontSize="14px"
                                                padding="0px 5px"
                                                onClick={editTicketPrice}
                                                width="100%"></MyButton>
                                    </VStack>
                                </HStack>
                                <HStack width={"100%"}>
                                    <EventTicketCard eventImage={"https://cdn.teleticket.com.pe/especiales/badbunny2022-fecha2/images/ICS012_rs.jpg"}
                                            eventName={"World Hottest Tour"}
                                            artistName={"Bad Bunny"}
                                            eventDate={"19 feb 2024"}
                                            ticketZone="Zona Playa"
                                            ticketPrice={200}
                                            seat="45D"></EventTicketCard>
                                    <VStack alignItems={"start"}>
                                        <MyButton textColor="white" 
                                                backgroundColor="grey.default" 
                                                backgroundColorHover="grey.dark" 
                                                title={"Vendido"}
                                                fontSize="14px"
                                                padding="19px"
                                                isDisabled={true}></MyButton>
                                    </VStack>
                                </HStack>
                                <HStack width={"100%"}>
                                    <EventTicketCard eventImage={"https://cdn.teleticket.com.pe/especiales/badbunny2022-fecha2/images/ICS012_rs.jpg"}
                                            eventName={"World Hottest Tour"}
                                            artistName={"Bad Bunny"}
                                            eventDate={"19 feb 2024"}
                                            ticketZone="Zona Playa"
                                            ticketPrice={200}
                                            seat="45D"></EventTicketCard>
                                    <VStack alignItems={"start"}>
                                        <MyButton textColor="white" 
                                                backgroundColor="grey.default" 
                                                backgroundColorHover="grey.dark" 
                                                title={"Confirmando"}
                                                fontSize="14px"
                                                padding="4px"
                                                border="2px var(--chakra-colors-orange-default) solid"></MyButton>
                                    </VStack>
                                </HStack>
                            </VStack>
                        </TabPanel>
                        <TabPanel>
                        <VStack justifyContent={"stretch"}>
                                <HStack width={"100%"}>
                                    <EventTicketCard eventImage={"https://cdn.teleticket.com.pe/especiales/badbunny2022-fecha2/images/ICS012_rs.jpg"}
                                            eventName={"World Hottest Tour"}
                                            artistName={"Bad Bunny"}
                                            eventDate={"19 feb 2024"}
                                            ticketZone="Zona Playa"
                                            ticketPrice={200}
                                            ratingNumber={5}
                                            sellerImage={"https://bit.ly/kent-c-dodds"}
                                            sellerName={"Carlos Alberto"}
                                            seat="45D"></EventTicketCard>
                                    <VStack alignItems={"start"}>
                                        <MyButton textColor="white" 
                                                backgroundColor="secondary.default" 
                                                backgroundColorHover="secondary.dark" 
                                                title={"Confirmar"}
                                                fontSize="14px"
                                                padding="0px 5px"
                                                onClick={confirmTicket}
                                                width="100%"></MyButton>
                                        <MyButton textColor="white" 
                                                backgroundColor="orange.default" 
                                                backgroundColorHover="orange.dark" 
                                                title={"Reembolso"}
                                                fontSize="14px"
                                                padding="0px 5px"
                                                onClick={requestRefund}></MyButton>
                                    </VStack>
                                </HStack>
                                <HStack width={"100%"}>
                                    <EventTicketCard eventImage={"https://cdn.teleticket.com.pe/especiales/badbunny2022-fecha2/images/ICS012_rs.jpg"}
                                            eventName={"World Hottest Tour"}
                                            artistName={"Bad Bunny"}
                                            eventDate={"19 feb 2024"}
                                            ticketZone="Zona Playa"
                                            ticketPrice={200}
                                            ratingNumber={5}
                                            sellerImage={"https://bit.ly/kent-c-dodds"}
                                            sellerName={"Carlos Alberto"}
                                            seat="45D"></EventTicketCard>
                                </HStack>
                            </VStack>
                        </TabPanel>
                    </TabPanels>
                </Tabs>         
            </Box>
        </>
    );
};