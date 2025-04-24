import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import HomePage from "./pages/HomePage";
import ProducerDashboard from "./pages/ProducerDashboard";
// import UserDashboard from "./pages/UserDashboard";
import AddProducer from "./components/AddProducer";
import ProducerEventsList from "./components/ProducerEventsList";
import { ProducerDetails } from "./components/ProducerDetails";
import { EventDetailsForProducer } from "./components/EventDetailsForProducer";
import {AddEvent} from "./components/AddEvent";
import { EventDetails } from "./components/EventDetails";
import { ProducerDetailsForClient } from "./components/ProducerDetailsForClient";
import { EventListForUsers } from "./components/EventListForUsers";
// import { EventDetailsForUser } from "./components/EventDetailsForUser";
import React from "react";
import { AppNavigationProvider } from "./contexts/AppNavigationContext";
function App() {

  return (
    <>
      <Router>
      <AppNavigationProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/ProducerDashboard" element={<ProducerDashboard />} />
          {/* <Route path="/UserDashboard" element={<UserDashboard />} /> */}
          <Route path="/AddProducer" element={<AddProducer />} />
          <Route path="/ProducerEventsList" element={<ProducerEventsList email="example@example.com" />} />
          <Route path="/ProducerDetails" element={<ProducerDetails />} />
          <Route path="/EventDetailsForProducer" element={<EventDetailsForProducer />} />
          <Route path="/AddEvent" element={<AddEvent />} />
          <Route path="/event/:id" element={<EventDetails />} />

          <Route path="/EventListForUsers" element={<EventListForUsers />} />
          <Route path="/ProducerDetailsForClient" element={<ProducerDetailsForClient />} />

        </Routes>
        </AppNavigationProvider>
      </Router>
    </>
  )
}

export default App








