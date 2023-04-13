import React from 'react';
// import { Meteor } from 'meteor/meteor';
// import { Roles } from 'meteor/alanning:roles';
// import { Navigate } from 'react-router';
// import CompanyDashboard from './CompanyDashboard';
import StudentDashboard from './StudentDashboard';

const Dashboard = () => (
  // const isStudent = Roles.userIsInRole(Meteor.userId(), 'student');
  // const isCompany = Roles.userIsInRole(Meteor.userId(), 'company');
  <StudentDashboard />
  // return (isCompany) ? <CompanyDashboard /> : (isStudent) ? <StudentDashboard /> : <Navigate to="/notauthorized" />;
);

export default Dashboard;
