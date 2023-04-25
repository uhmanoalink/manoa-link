import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Navigate } from 'react-router';
import { Container } from 'react-bootstrap';
import CompanyDashboard from './CompanyDashboard';
import StudentDashboard from './StudentDashboard';
import AdminDashboard from './AdminDashboard';

const Dashboard = () => {
  const isLogged = Meteor.userId() !== null;
  if (!isLogged) {
    return <Navigate to="/signin" />;
  }
  const isStudent = Roles.userIsInRole(Meteor.userId(), 'student');
  if (isStudent) {
    return <StudentDashboard />;
  }
  const isCompany = Roles.userIsInRole(Meteor.userId(), 'company');
  if (isCompany) {
    return <CompanyDashboard />;
  }
  const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');
  if (isAdmin) {
    return <AdminDashboard />;
  }
  return <Container />;
};

export default Dashboard;
