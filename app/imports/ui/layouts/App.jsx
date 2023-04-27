import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Roles } from 'meteor/alanning:roles';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Footer from '../components/Footer';
import Landing from '../pages/Landing';
import ListStuff from '../pages/ListStuff';
import ListStuffAdmin from '../pages/ListStuffAdmin';
import AddStuff from '../pages/AddStuff';
import AddEvent from '../pages/AddEvent';
import ListEvents from '../pages/ListEvents';
import CompanyListing from '../pages/CompanyListing';
import NotFound from '../pages/NotFound';
import SignUp from '../pages/SignUp';
import SignOut from '../pages/SignOut';
import NavBar from '../components/NavBar';
import SignIn from '../pages/SignIn';
import NotAuthorized from '../pages/NotAuthorized';
import ProtectedRoute from './ProtectedRoute';
import AdminProtectedRoute from './AdminProtectedRoute';
import EditEvent from '../pages/EditEvent';
import Dashboard from '../pages/Dashboard';
import MainEventsList from '../pages/MainEventsList';
import EventPage from '../pages/EventPage';
import CompanyProtectedRoute from './CompanyProtectedRoute';
import Profile from '../pages/Profile';

/** Top-level layout component for this application. Called in imports/startup/client/startup.jsx. */
const App = () => {
  const { ready } = useTracker(() => {
    const rdy = Roles.subscription.ready();
    return {
      ready: rdy,
    };
  });
  return (
    <Router>
      <NavBar />
      <div className="full-screen-page">
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signout" element={<SignOut />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/list" element={<ProtectedRoute><ListStuff /></ProtectedRoute>} />
          <Route path="/add" element={<ProtectedRoute><AddStuff /></ProtectedRoute>} />
          <Route path="/my-profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/event/:_id" element={<ProtectedRoute><EventPage /></ProtectedRoute>} />
          <Route path="/add-event" element={<CompanyProtectedRoute ready={ready}><AddEvent /></CompanyProtectedRoute>} />
          <Route path="/list-events" element={<ProtectedRoute><ListEvents /></ProtectedRoute>} />
          <Route path="/events" element={<ProtectedRoute><MainEventsList /></ProtectedRoute>} />
          <Route path="/company-listing" element={<ProtectedRoute><CompanyListing /></ProtectedRoute>} />
          <Route path="/edit-event/:_id" element={<CompanyProtectedRoute ready={ready}><EditEvent /></CompanyProtectedRoute>} />
          <Route path="/admin" element={<AdminProtectedRoute ready={ready}><ListEvents /></AdminProtectedRoute>} />
          <Route path="/notauthorized" element={<NotAuthorized />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
