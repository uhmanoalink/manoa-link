import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Roles } from 'meteor/alanning:roles';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Footer from '../components/Footer';
import Landing from '../pages/Landing';
import AddEvent from '../pages/AddEvent';
import ListEvents from '../pages/ListEvents';
import ListCompanies from '../pages/ListCompanies';
import JobListings from '../pages/JobListings';
import NotFound from '../pages/NotFound';
import SignUp from '../pages/SignUp';
import SignOut from '../pages/SignOut';
import NavBar from '../components/NavBar';
import SignIn from '../pages/SignIn';
import NotAuthorized from '../pages/NotAuthorized';
import ProtectedRoute from './ProtectedRoute';
import EditEvent from '../pages/EditEvent';
import Dashboard from '../pages/Dashboard';
import MainEventsList from '../pages/MainEventsList';
import EventPage from '../pages/EventPage';
import CompanyProtectedRoute from './CompanyProtectedRoute';
import StudentProtectedRoute from './StudentProtectedRoute';
import Profile from '../pages/Profile';
import ManageListings from '../pages/ManageListings';
import CompanyManageEvents from '../pages/CompanyManageEvents';

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
          <Route path="/my-profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/event/:_id" element={<ProtectedRoute><EventPage /></ProtectedRoute>} />
          <Route path="/add-event" element={<CompanyProtectedRoute ready={ready}><AddEvent /></CompanyProtectedRoute>} />
          <Route path="/list-events" element={<ProtectedRoute><ListEvents /></ProtectedRoute>} />
          <Route path="/events" element={<ProtectedRoute><MainEventsList /></ProtectedRoute>} />
          <Route path="/companies" element={<StudentProtectedRoute ready={ready}><ListCompanies /></StudentProtectedRoute>} />
          <Route path="/manage-listings" element={<CompanyProtectedRoute ready={ready}><ManageListings /></CompanyProtectedRoute>} />
          <Route path="/job-listings" element={<StudentProtectedRoute ready={ready}><JobListings /></StudentProtectedRoute>} />
          <Route path="/manage-events" element={<CompanyProtectedRoute ready={ready}><CompanyManageEvents /></CompanyProtectedRoute>} />
          <Route path="/edit-event/:_id" element={<CompanyProtectedRoute ready={ready}><EditEvent /></CompanyProtectedRoute>} />
          <Route path="/notauthorized" element={<NotAuthorized />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
