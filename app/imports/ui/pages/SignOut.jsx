import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Navigate } from 'react-router';

/* After the user clicks the "SignOut" link in the NavBar, log them out and display this page. */
const SignOut = () => {
  Meteor.logout();
  return <Navigate to="/signin" />;
};

export default SignOut;
