import React from 'react';
import PropTypes from 'prop-types';
import LoadingSpinner from './LoadingSpinner';

const Sidebar = ({ children }) => (
  <div id="sidebar">
    {children}
  </div>
);

// Require a component and location to be passed to each AdminProtectedRoute.
Sidebar.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

Sidebar.defaultProps = {
  children: <LoadingSpinner />,
};

export default Sidebar;
