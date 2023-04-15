import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { NavLink, useLocation } from 'react-router-dom';
import { Container, Image, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { BoxArrowRight, PersonFill, PersonPlusFill } from 'react-bootstrap-icons';

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
        <Navbar.Toggle aria-controls="basic-navbar-nav">
          <svg className="hamburger" width={35} height={30} viewBox="0 0 35 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect className="hamburger-1" x={0} y={0} width={35} height={4} fill="white" rx={2} />
            <rect className="hamburger-2" x={0} y={13} width={35} height={4} fill="white" rx={2} />
            <rect className="hamburger-3" x={0} y={26} width={35} height={4} fill="white" rx={2} />
          </svg>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <ProtectedRender>
              <Nav.Link
                as={NavLink}
                to="/dashboard"
              >
                Dashboard
              </Nav.Link>
              <ProtectedRender allowedRoles={['company']}>
                <Nav.Link
                  as={NavLink}
                  to="/company-listing"
                >
                  Manage Listings
                </Nav.Link>
                <Nav.Link
                  as={NavLink}
                  to="/manage-events"
                >
                  Manage Events
                </Nav.Link>
              </ProtectedRender>
              <ProtectedRender allowedRoles={['student']}>
                <Nav.Link
                  as={NavLink}
                  to="/company-listing"
                >
                  Job Listings
                </Nav.Link>
                <Nav.Link
                  as={NavLink}
                  to="/events"
                >
                  Events Board
                </Nav.Link>
                <ProtectedRender allowedRoles={['admin']}>
                  <Nav.Link
                    as={NavLink}
                    to="/"
                  >
                    TO DO
                  </Nav.Link>
                </ProtectedRender>
              </ProtectedRender>

              <ProtectedRender allowedRoles={['admin']}>
                <Nav.Link
                  as={NavLink}
                  to="/admin"
                >
                  Admin
                </Nav.Link>
              </ProtectedRender>
            </ProtectedRender>
            {(currentUser === '') ? (
              <NavDropdown align="end" title="Login">
                <NavDropdown.Item as={NavLink} to="/signin">
                  <PersonFill />
                  Sign in
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/signup">
                  <PersonPlusFill />
                  Sign up
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown
                align="end"
                title={(
                  <Image
                    src="/images/sample-pfp.png"
                    alt="pfp"
                    width={36}
                  />
                )}
              >
                <NavDropdown.Item
                  id="my-profile-nav"
                  as={NavLink}
                  to="/my-profile"
                >
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/signout">
                  <BoxArrowRight /> Sign out
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
