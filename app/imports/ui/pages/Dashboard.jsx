import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Navigate } from 'react-router';
import { Container } from 'react-bootstrap';
import CompanyDashboard from './CompanyDashboard';
import StudentDashboard from './StudentDashboard';

const Dashboard = () => {
  const isLogged = Meteor.userId() !== null;
  if (!isLogged) {
    return <Navigate to="/signin" />;
  }
  const userRoles = Roles.getRolesForUser(Meteor.userId());
  console.log(userRoles);
  const isStudent = Roles.userIsInRole(Meteor.userId(), 'student');
  if (isStudent) {
    console.log('yep, he a student');
    return <StudentDashboard />;
  }
  const isCompany = Roles.userIsInRole(Meteor.userId(), 'company');
  if (isCompany) {
    console.log('yep, he a company');
    return <CompanyDashboard />;
  }
  const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');
  if (isAdmin) {
    return (
      <Container>
        <StudentDashboard />
        <CompanyDashboard />
      </Container>
    );
  }
  return <Container />;
};

export default Dashboard;
