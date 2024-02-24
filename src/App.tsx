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
import { AuthGuard } from "./utils/authGuard"
import { TermsConditions } from "./pages/termsConditions/termsConditions"
import { HowItWorks } from "./pages/howItWorks/howItWorks"
import { ResetPassword } from "./pages/resetPassword/resetPassword"

function App() {
  return (
    <>
      <BrowserRouter>
        <ModalRenderer/>
        <Header></Header>
        <Routes>
          <Route path='/' element={<SearchEvent></SearchEvent>}></Route>
          <Route path='/tickets/:eventDateId' element={<ListTickets></ListTickets>}></Route>
          <Route path='/ticket-detail/:ticketId' element={<TicketDetail></TicketDetail>}></Route>
          <Route path='/ticket-buy/:ticketId' element={<Checkout></Checkout>}></Route>
          <Route path='/terms-conditions' element={<TermsConditions></TermsConditions>}></Route>
          <Route path='/reset-password/:code' element={<ResetPassword></ResetPassword>}></Route>
          <Route path='/how-works' element={<HowItWorks></HowItWorks>}></Route>
          <Route path="/sell-ticket" element={<AuthGuard><SellTicket></SellTicket></AuthGuard>}/>
          <Route path="/my-tickets" element={<AuthGuard><MyTickets></MyTickets></AuthGuard>}/>
          <Route path="/my-account" element={<AuthGuard><MyAccount></MyAccount></AuthGuard>}/>
        </Routes>
        <Footer></Footer>
      </BrowserRouter>
    </>
  )
}

export default App
