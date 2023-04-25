import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Navigate } from 'react-router';
import StudentProfile from './StudentProfile';
import CompanyProfile from './CompanyProfile';

const Profile = () => {
  const isLogged = Meteor.userId() !== null;
  if (!isLogged) {
    return <Navigate to="/signin" />;
  }
  const isStudent = Roles.userIsInRole(Meteor.userId(), 'student');
  if (isStudent) {
    return <StudentProfile />;
  }
  const isCompany = Roles.userIsInRole(Meteor.userId(), 'company');
  if (isCompany) {
    return <CompanyProfile />;
  }
  const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');
  if (isAdmin) {
    return <Navigate to="/dashboard" />;
  }
  return null;
};

export default Profile;
