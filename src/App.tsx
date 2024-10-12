import { Footer } from "./components/footer/footer"
import { Header } from "./components/header/header"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ModalRenderer } from "./config/modal/modal-renderer"
import { AuthGuard } from "./utils/authGuard"
import { lazy, Suspense } from "react"
import { Loading } from "./components/loading/loading"

const SearchEventComp = lazy(() => import('./pages/searchEvent/searchEvent'));
const ListTicketsComp = lazy(() => import('./pages/listTickets/listTickets'));
const TicketDetailComp = lazy(() => import('./pages/ticketDetail/ticketDetail'));
const CheckoutComp = lazy(() => import('./pages/checkout/checkout'));
const TermsConditionsComp = lazy(() => import('./pages/termsConditions/termsConditions'));
const ResetPasswordComp = lazy(() => import('./pages/resetPassword/resetPassword'));
const HowItWorksComp = lazy(() => import('./pages/howItWorks/howItWorks'));
const AboutUsComp = lazy(() => import('./pages/aboutUs/aboutUs'));
const SellTicketComp = lazy(() => import('./pages/sellTicket/sellTicket'));
const MyTicketsComp = lazy(() => import('./pages/myTickets/myTickets'));
const MyAccountComp = lazy(() => import('./pages/myAccount/myAccount'));

function App() {
  return (
    <>
      <BrowserRouter>
        <ModalRenderer />
        <Header></Header>
        <Suspense fallback={<Loading height100vh={true} />}>
          <Routes>
            <Route path='/' element={<SearchEventComp/>}></Route>
            <Route path='/tickets/:eventDateId' element={<ListTicketsComp/>}></Route>
            <Route path='/ticket-detail/:ticketId' element={<TicketDetailComp/>}></Route>
            <Route path='/ticket-buy/:ticketId' element={<CheckoutComp/>}></Route>
            <Route path='/terms-conditions' element={<TermsConditionsComp/>}></Route>
            <Route path='/reset-password/:code' element={<ResetPasswordComp/>}></Route>
            <Route path='/how-works' element={<HowItWorksComp/>}></Route>
            <Route path='/about-us' element={<AboutUsComp/>}></Route>
            <Route path="/sell-ticket" element={<AuthGuard><SellTicketComp/></AuthGuard>} />
            <Route path="/my-tickets" element={<AuthGuard><MyTicketsComp/></AuthGuard>} />
            <Route path="/my-account" element={<AuthGuard><MyAccountComp/></AuthGuard>} />
          </Routes>
        </Suspense>
        <Footer></Footer>
      </BrowserRouter>
    </>
  )
}

export default App
