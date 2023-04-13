import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Navigate } from 'react-router';

import Landing from '../pages/Landing';
import LoadingSpinner from '../components/LoadingSpinner';

/**
 * AdminProtectedRoute (see React Router v6 sample)
 * Checks for Meteor login and admin role before routing to the requested page, otherwise goes to signin page.
 *
 * @type { React.FC<{ ready: boolean, children: React.ReactNode }> }
 */
const CompanyProtectedRoute = ({ ready, children }) => {
  const isLogged = Meteor.userId() !== null;
  if (!isLogged) {
    return <Navigate to="/signin" />;
  }
  if (!ready) {
    return <LoadingSpinner />;
  }
  const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');
  const isCompany = Roles.userIsInRole(Meteor.userId(), 'company');
  return (isLogged && (isCompany || isAdmin)) ? children : <Navigate to="/notauthorized" />;
};

// Require a component and location to be passed to each AdminProtectedRoute.
CompanyProtectedRoute.propTypes = {
  ready: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

CompanyProtectedRoute.defaultProps = {
  ready: false,
  children: <Landing />,
};

export default CompanyProtectedRoute;
