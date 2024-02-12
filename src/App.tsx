import { Footer } from "./components/footer/footer"
import { Header } from "./components/header/header"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ModalRenderer } from "./config/modal/modal-renderer"
import { SearchEvent } from "./pages/searchEvent/searchEvent"
import { ListTickets } from "./pages/listTickets/listTickets"
import { TicketDetail } from "./pages/ticketDetail/ticketDetail"
import { Checkout } from "./pages/checkout/checkout"
import { SellTicket } from "./pages/sellTicket/sellTicket"
import { MyTickets } from "./pages/myTickets/myTickets"
import { MyAccount } from "./pages/myAccount/myAccount"

function App() {
  return (
    <>
      <BrowserRouter>
        <ModalRenderer/>
        <Header></Header>
        <Routes>
          <Route path='/' element={<SearchEvent></SearchEvent>}></Route>
          <Route path='/tickets/:eventId' element={<ListTickets></ListTickets>}></Route>
          <Route path='/ticket-detail/:ticketId' element={<TicketDetail></TicketDetail>}></Route>
          <Route path='/ticket-buy/:ticketId' element={<Checkout></Checkout>}></Route>
          <Route path='/sell-ticket' element={<SellTicket></SellTicket>}></Route>
          <Route path='/my-tickets' element={<MyTickets></MyTickets>}></Route>
          <Route path='/my-account' element={<MyAccount></MyAccount>}></Route>
        </Routes>
        <Footer></Footer>
      </BrowserRouter>
    </>
  )
}

export default App
