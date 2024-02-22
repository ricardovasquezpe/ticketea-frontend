import { Box, Grid, GridItem, HStack, Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs, VStack } from "@chakra-ui/react";
import { EventTicketCard } from "../../components/eventTicketCard/eventTicketCard";
import { MyButton } from "../../components/myButton/myButton";
import { useModal } from "../../config/modal/use-modal";
import { Modals } from "../../config/modal/modal-config";
import { useEffect, useState } from "react";
import { getMySoldTickets } from "../../services/ticket.service";
import { Ticket } from "../../services/models/ticket.model";

export const MyTickets = () => {
    const loadingModal = useModal<any>(Modals.LoadingModal);
    const [tickets, setTickets] = useState([] as Ticket[]);

    useEffect(() => {
      loadingModal.open({title: "Cargando tus entradas"});
      window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
      onLoadData();
    }, []);

    const onLoadData = async () => {
      var res = await getMySoldTickets();
      setTickets(res.data);
      loadingModal.close();
    }

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
    const deleteTicket = (ticketId: string) => {
        deleteTicketDialog.open({
          ticketId: ticketId,
          onSave: async () => {
            var res = await getMySoldTickets();
            setTickets(res.data);
            deleteTicketDialog.close();
          },
          onClose: () => {
            deleteTicketDialog.close();
          },
          onCancel: () => {
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
    const editTicketPrice = (ticketId: string, actualPrice: number) => {
      editTicketPriceModal.open({
          ticketId: ticketId,
          actualPrice: actualPrice,
          onSave: async () => {
            var res = await getMySoldTickets();
            setTickets(res.data);
            editTicketPriceModal.close();
          },
          onClose: () => {
            editTicketPriceModal.close();
          },
          onCancel: () => {
            editTicketPriceModal.close();
          },
        });
    }

    return (
        <>
            <Box padding={{"base": "40px 1.5rem", "sm": "40px 1.5rem", "customMd": "40px 250px", "customLg": "40px 350px", "customXl": "40px 450px"}}>
                <Tabs variant="unstyled">
                    <TabList>
                        <Tab>Mis entradas anunciadas</Tab>
                        {/* <Tab>Mis entradas compradas</Tab> */}
                    </TabList>
                    <TabIndicator
                        mt="-1.5px"
                        height="2px"
                        bg="blue.500"
                        borderRadius="1px"/>
                    <TabPanels>
                        <TabPanel>
                            <VStack justifyContent={"stretch"}>
                                {
                                  tickets.map((ticket: Ticket, index: number) => {
                                    return (<Grid key={index} templateColumns='repeat(7, 1fr)' gap={2} width={"100%"}>
                                                <GridItem colSpan={{base: 7, sm:7, customMd: 6}}>
                                                  <EventTicketCard eventImage={ticket.eventDate?.event.image_url!}
                                                          eventName={ticket.eventDate?.event.title!}
                                                          artistName={ticket.eventDate?.event.artist.name!}
                                                          eventDate={ticket.eventDate?.date!}
                                                          ticketZone={ticket.zone.name}
                                                          ticketPrice={ticket.price}
                                                          seat={ticket.seat}
                                                          state={ticket.state}></EventTicketCard>
                                                </GridItem>
                                                <GridItem colSpan={{base: 7, sm: 7, customMd: 1}} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                                  <Grid key={index} templateColumns='repeat(2, 1fr)' gap={2} width={"100%"}>
                                                      <GridItem colSpan={{base: 1, sm: 1, customMd: 2}}>
                                                        <MyButton textColor="white" 
                                                                backgroundColor="red.default" 
                                                                backgroundColorHover="red.dark" 
                                                                title={"Eliminar"}
                                                                fontSize="14px"
                                                                padding="0px 5px"
                                                                onClick={()=>deleteTicket(ticket.encId)}
                                                                width="100%"></MyButton>
                                                      </GridItem>
                                                      <GridItem colSpan={{base: 1, sm: 1, customMd: 2}}>
                                                        <MyButton textColor="white" 
                                                                backgroundColor="secondary.default" 
                                                                backgroundColorHover="secondary.dark" 
                                                                title={"Editar"}
                                                                fontSize="14px"
                                                                padding="0px 5px"
                                                                onClick={()=>editTicketPrice(ticket.encId, ticket.price)}
                                                                width="100%"></MyButton>
                                                      </GridItem>
                                                  </Grid>
                                                </GridItem>
                                            </Grid>);
                                  })
                                }

                                {/* <HStack width={"100%"}>
                                    <EventTicketCard eventImage={"https://cdn.teleticket.com.pe/especiales/badbunny2022-fecha2/images/ICS012_rs.jpg"}
                                            eventName={"World Hottest Tour"}
                                            artistName={"Bad Bunny"}
                                            eventDate={1234}
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
                                            eventDate={123}
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
                                            eventDate={123}
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
                                </HStack>*/}
                            </VStack>
                        </TabPanel>
                        <TabPanel>
                        <VStack justifyContent={"stretch"}>
                                <HStack width={"100%"}>
                                    <EventTicketCard eventImage={"https://cdn.teleticket.com.pe/especiales/badbunny2022-fecha2/images/ICS012_rs.jpg"}
                                            eventName={"World Hottest Tour"}
                                            artistName={"Bad Bunny"}
                                            eventDate={123}
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
                                            eventDate={123}
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