import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Navigate } from 'react-router';
import CompanyDashboard from './CompanyDashboard';
import StudentDashboard from './StudentDashboard';

const Dashboard = () => {
  const isStudent = Roles.userIsInRole(Meteor.userId(), 'student');
  if (isStudent) {
    return <StudentDashboard />;
  }
  const isCompany = Roles.userIsInRole(Meteor.userId(), 'company');
  if (isCompany) {
    return <CompanyDashboard />;
  }
  return <Navigate to="/notauthorized" />;
};

export default Dashboard;
