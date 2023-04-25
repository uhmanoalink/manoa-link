import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import SignInComponent from '../components/SignIn';

/**
 * Signin page overrides the form’s submit event and call Meteor’s loginWithPassword().
 * Authentication errors modify the component’s state to be displayed
 */
const SignIn = () => {
  const navigate = useNavigate();
  if (Meteor.userId() !== null) {
    navigate('/dashboard');
  }
  return (
    <div id="signin-page" className="py-5 d-flex align-items-center justify-content-center">
      <SignInComponent title="Sign In" width={500} />
    </div>
  );
};

export default SignIn;
