import { Route } from "react-router-dom";
import CollegeLayout from "../../layouts/CollegeLayout";
import Dashboard from "./pages/Dashboard"; 
import CreateEvent from "./pages/CreateEvent"; 
import CollegeProfile from "./pages/CollegeProfile";
import EventDetails from "./pages/EventDetails";
import MyEvents from "./pages/MyEvents";
import PaymentPage from "./pages/PaymentPage";

const CollegeRoutes = (
  <Route element={<CollegeLayout />}>
    <Route path="/college/dashboard" element={<Dashboard/>} />
    <Route path="/college/create-event" element={<CreateEvent />} />
    <Route path="/college/profile" element={<CollegeProfile />} />
    <Route path="/college/event/:id" element={<EventDetails />} />
    <Route path="/college/events" element={<MyEvents/>} />
    <Route path="/college/payment/:id" element={<PaymentPage/>} />
  </Route>
);

export default CollegeRoutes;