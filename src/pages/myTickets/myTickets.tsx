import { Box, Grid, GridItem, Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs, VStack } from "@chakra-ui/react";
import { EventTicketCard } from "../../components/eventTicketCard/eventTicketCard";
import { MyButton } from "../../components/myButton/myButton";
import { useModal } from "../../config/modal/use-modal";
import { Modals } from "../../config/modal/modal-config";
import { useEffect, useState } from "react";
import { getMyRequestsTicket, getMySoldTickets } from "../../services/ticket.service";
import { Ticket } from "../../services/models/ticket.model";
import { TicketState } from "../../utils/enums/ticketState.enum";
import { MySeo } from "../../components/mySeo/mySeo";

export const MyTickets = () => {
    const loadingModal = useModal<any>(Modals.LoadingModal);
    const [tickets, setTickets] = useState([] as Ticket[]);
    const [ticketRequests, setTicketRequests] = useState([]);

    useEffect(() => {
      loadingModal.open({title: "Cargando tus entradas"});
      window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
      onLoadData();
    }, []);

    const onLoadData = async () => {
      var res = await getMySoldTickets();
      setTickets(res.data);
      var resRequestTickets = await getMyRequestsTicket();
      setTicketRequests(resRequestTickets.data);
      loadingModal.close();
    }

    //const confirmTicketModal = useModal<any>(Modals.ConfirmTicketModal);
    /*const confirmTicket = () => {
        confirmTicketModal.open({
          onSave: () => {
            confirmTicketModal.close();
          },
          onClose: () => {
            confirmTicketModal.close();
          },
          onCancel: () => {
            confirmTicketModal.close();
          },
        });
    }*/

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

    //const requestRefundModal = useModal<any>(Modals.RequestRefundModal);
    /*const requestRefund = () => {
        requestRefundModal.open({
          onSave: () => {
            requestRefundModal.close();
          },
          onClose: () => {
            requestRefundModal.close();
          },
          onCancel: () => {
            requestRefundModal.close();
          },
        });
    }*/

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

    const sellTicketDialog = useModal<any>(Modals.ConfirmSellTicketDialog);
    const sellTicket = (ticketId: string) => {
      sellTicketDialog.open({
          ticketId: ticketId,
          onSave: async () => {
            var res = await getMySoldTickets();
            setTickets(res.data);
            sellTicketDialog.close();
          },
          onClose: () => {
            sellTicketDialog.close();
          },
          onCancel: () => {
            sellTicketDialog.close();
          },
        });
    }

    return (
        <>
          <MySeo title={`Mis entradas | Ticketea!`}
                   description={`Compra la entrada al evento que quieres asistir de manera segura con nuestros vendedores verificados rapido y facil`}
                   link={`https://ticketea.me/mis-tickets`}
                   image={"/images/logo.png"}/>
            <Box padding={{"base": "40px 1.5rem", "sm": "40px 1.5rem", "customMd": "40px 250px", "customLg": "40px 350px", "customXl": "40px 450px"}}>
                <Tabs variant="unstyled">
                    <TabList>
                        <Tab>Mis entradas anunciadas</Tab>
                        <Tab>Mis entradas favoritas</Tab>
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
                                                <GridItem colSpan={{base: 7, sm: 7, customMd: ticket.state == TicketState.Active ? 6 : 7}}>
                                                  <EventTicketCard eventImage={ticket.eventDate?.event.image_url!}
                                                          eventName={ticket.eventDate?.event.title!}
                                                          artistName={ticket.eventDate?.event.artist.name!}
                                                          eventDate={ticket.eventDate?.date!}
                                                          ticketZone={ticket.zone.name}
                                                          ticketPrice={ticket.price}
                                                          seat={ticket.seat}
                                                          state={ticket.state}
                                                          ticketId={ticket.encId}></EventTicketCard>
                                                </GridItem>
                                                {ticket.state == TicketState.Active ? <GridItem colSpan={{base: 7, sm: 7, customMd: 1}} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                                  <Grid key={index} templateColumns='repeat(3, 1fr)' gap={1} width={"100%"}>
                                                      <GridItem colSpan={{base: 1, sm: 1, customMd: 3}}>
                                                        <MyButton textColor="white" 
                                                                backgroundColor="red.default" 
                                                                backgroundColorHover="red.dark" 
                                                                title={"Eliminar"}
                                                                fontSize="14px"
                                                                padding="0px 5px"
                                                                onClick={()=>deleteTicket(ticket.encId)}
                                                                width="100%"
                                                                size="sm"></MyButton>
                                                      </GridItem>
                                                      <GridItem colSpan={{base: 1, sm: 1, customMd: 3}}>
                                                        <MyButton textColor="white" 
                                                                backgroundColor="secondary.default" 
                                                                backgroundColorHover="secondary.dark" 
                                                                title={"Editar Precio"}
                                                                fontSize="14px"
                                                                padding="0px 5px"
                                                                onClick={()=>editTicketPrice(ticket.encId, ticket.price)}
                                                                width="100%"
                                                                size="sm"></MyButton>
                                                      </GridItem>
                                                      <GridItem colSpan={{base: 1, sm: 1, customMd: 3}}>
                                                        <MyButton textColor="white" 
                                                                backgroundColor="orange.default" 
                                                                backgroundColorHover="orange.dark" 
                                                                title={"Vendido"}
                                                                fontSize="14px"
                                                                padding="0px 5px"
                                                                size="sm"
                                                                onClick={()=>sellTicket(ticket.encId)}
                                                                width="100%"></MyButton>
                                                      </GridItem>
                                                  </Grid>
                                                </GridItem> : <></>}
                                            </Grid>);
                                  })
                                }
                            </VStack>
                        </TabPanel>
                        <TabPanel>
                          <VStack justifyContent={"stretch"}>
                          {
                                  ticketRequests.map((ticket: any, index: number) => {
                                    return (<Grid key={index} templateColumns='repeat(7, 1fr)' gap={2} width={"100%"}>
                                                <GridItem colSpan={{base: 7, sm: 7, customMd: 7}}>
                                                  <EventTicketCard eventImage={ticket.ticket.eventDate?.event.image_url!}
                                                          eventName={ticket.ticket.eventDate?.event.title!}
                                                          artistName={ticket.ticket.eventDate?.event.artist.name!}
                                                          eventDate={ticket.ticket.eventDate?.date!}
                                                          ticketZone={ticket.ticket.zone.name}
                                                          ticketPrice={ticket.ticket.price}
                                                          seat={ticket.ticket.seat}
                                                          state={ticket.ticket.state}
                                                          ticketId={ticket.ticket.encId}></EventTicketCard>
                                                </GridItem>
                                            </Grid>);
                                  })
                                }
                          </VStack>
                        </TabPanel>
                        {
                          /*
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
                          */
                        }
                    </TabPanels>
                </Tabs>         
            </Box>
        </>
    );
};

export default MyTickets;