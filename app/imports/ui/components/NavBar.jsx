import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { NavLink, useLocation } from 'react-router-dom';
import { Container, Image, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { BoxArrowRight, PersonCircle, PersonFill, PersonPlusFill } from 'react-bootstrap-icons';
import { Roles } from 'meteor/alanning:roles';

import ProtectedRender from './ProtectedRender';

const NavBar = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { currentUser } = useTracker(
    () => ({
      currentUser: Meteor.user() ? Meteor.user().username : '',
    }),
    [],
  );

  const location = useLocation();

  return location.pathname === '/' ? null : (
    <Navbar expand="md" id="navbar">
      <Container>
        <Navbar.Brand href="/">
          Manoa Link
          {/* <Image src="/images/logo.png" alt="Logo" width={85} /> */}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-collapse">
          <svg className="hamburger" width={35} height={30} viewBox="0 0 35 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect className="hamburger-1" x={0} y={0} width={35} height={4} fill="white" rx={2} />
            <rect className="hamburger-2" x={0} y={13} width={35} height={4} fill="white" rx={2} />
            <rect className="hamburger-3" x={0} y={26} width={35} height={4} fill="white" rx={2} />
          </svg>
        </Navbar.Toggle>
        <Navbar.Collapse id="navbar-collapse">
          <Nav className="ms-auto">
            <ProtectedRender>
              <Nav.Link as={NavLink} to="/dashboard">
                Dashboard
              </Nav.Link>
              <ProtectedRender allowedRoles={['company']}>
                <Nav.Link as={NavLink} to="/company-listing">
                  Manage Listings
                </Nav.Link>
                <Nav.Link as={NavLink} to="/manage-events">
                  Manage Events
                </Nav.Link>
              </ProtectedRender>
              <ProtectedRender allowedRoles={['student']}>
                <Nav.Link as={NavLink} to="/company-listing">
                  Job Listings
                </Nav.Link>
                <Nav.Link as={NavLink} to="/events">
                  Events Board
                </Nav.Link>
                <ProtectedRender allowedRoles={['admin']}>
                  <Nav.Link as={NavLink} to="/">
                    TO DO
                  </Nav.Link>
                </ProtectedRender>
              </ProtectedRender>
            </ProtectedRender>
            {(currentUser === '') ? (
              <NavDropdown
                id="navbar-dropdown"
                align="end"
                title="Login"
              >
                <NavDropdown.Item as={NavLink} to="/signin">
                  <div className="icon-button">
                    <PersonFill /> Sign in
                  </div>
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/signup">
                  <div className="icon-button">
                    <PersonPlusFill /> Sign up
                  </div>
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown
                id="navbar-dropdown"
                align="end"
                title={(
                  <Image
                    style={{ aspectRatio: '1 / 1' }}
                    src="/images/sample-pfp.png"
                    alt="pfp"
                    aria-details={currentUser}
                    width={36}
                  />
                )}
              >
                <ProtectedRender allowedRoles={['student']}>
                  <NavDropdown.Item as={NavLink} to="/my-profile">
                    <div className="icon-button">
                      <PersonCircle /> Profile
                    </div>
                  </NavDropdown.Item>
                </ProtectedRender>
                <NavDropdown.Item as={NavLink} to="/signout">
                  <div className="icon-button">
                    <BoxArrowRight /> Sign out
                  </div>
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>

      </Container>
    </Navbar>
  );
};

export default NavBar;
