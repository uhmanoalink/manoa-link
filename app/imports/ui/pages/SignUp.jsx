import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Navigate } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Alert, Col, Container, Row } from 'react-bootstrap';

import StudentSignUpForm from '../components/StudentSignUpForm';
import CompanySignUpForm from '../components/CompanySignUpForm';
import RegisterUserForm from '../components/RegisterUserForm';
import { Students } from '../../api/student/Student';
import { Companies } from '../../api/company/Company';

const SignUp = ({ location }) => {
  const [page, setPage] = useState('newUser');
  const [errorAlert, setErrorAlert] = useState('');
  const [redirectToReferer, setRedirectToRef] = useState(false);
  const [info, setInfo] = useState({});

  const createStudentUser = (userId, name, email, onSuccess) => {
    Students.collection.insert(
      { userId, name, email, profileImage: 'None', followedCompanies: [], savedEvents: [], savedListings: [] },
      (error) => {
        if (error) {
          setErrorAlert(error.message);
        } else {
          onSuccess();
        }
      },
    );
  };

  const createCompanyUser = (userId, name, website, address, description, onSuccess) => {
    Companies.collection.insert(
      { userId, name, image: 'None', website, address, description },
      (error) => {
        if (error) {
          setErrorAlert(error.message);
        } else {
          onSuccess();
        }
      },
    );
  };

  const submit = (doc) => {
    setErrorAlert('');
    setInfo({ ...info, ...doc });
    console.log(doc);

    if (page === 'newUser') {
      const { email, youAreA: role } = doc;
      // Check if the user exists already
      Meteor.call('findUserByUsername', email, (err, result) => {
        if (result) {
          setErrorAlert('That email is already taken!');
        } else {
          setPage(role);
        }
      });
    } else {
      const { email, password, youAreA: role } = info;
      Accounts.createUser({ email, username: email, password }, (createUserError) => {
        let errorMsg = '';
        if (createUserError) {
          errorMsg = createUserError.reason;
        } else {
          const userId = Meteor.userId();
          Meteor.call('initUser', userId, role, (initUserError) => {
            if (initUserError) {
              errorMsg = 'There was a problem creating the user';
              Meteor.call('deleteUser', userId, (deleteUserError) => {
                if (deleteUserError) {
                  errorMsg += ", but it couldn't be removed!";
                }
              });
              return;
            }
            // User successfully created
            if (page === 'student') {
              console.log(doc);
              const { firstName, lastName } = doc;
              createStudentUser(userId, { firstName, lastName }, email, () => setRedirectToRef(true));
            } else if (page === 'company') {
              console.log(doc);
              const { companyName, website, address, description } = doc;
              createCompanyUser(userId, companyName, website, address, description, () => setRedirectToRef(true));
            } else {
              setErrorAlert('Something went wrong! 😢');
            }

          });
        }
        setErrorAlert(errorMsg);
      });
    }
  };

  const back = () => {
    setErrorAlert('');
    setPage('newUser');
  };

  /* Display the signup form. Redirect to add page after successful registration and login. */
  const { from } = location?.state || { from: { pathname: '/dashboard' } };
  // if correct authentication, redirect to from: page instead of signup screen
  if (redirectToReferer) {
    return <Navigate to={from} />;
  }

  const renderFormPage = (pageNumber) => {
    if (pageNumber === 'newUser') {
      return <RegisterUserForm onSubmit={submit} />;
    } if (pageNumber === 'student') {
      return <StudentSignUpForm onBack={back} onSubmit={submit} />;
    } if (pageNumber === 'company') {
      return <CompanySignUpForm onBack={back} onSubmit={submit} />;
    }
    setErrorAlert('Something went wrong! 😢');
    setPage('newUser');
    return null;
  };

  return (
    <Container id="signup-page" className="py-3">
      <Row className="justify-content-center">
        <Col xs={7} lg={5}>
          {renderFormPage(page)}
          <Alert variant="light">
            Already have an account? Login
            {' '}
            <Link to="/signin">here</Link>
          </Alert>
          {errorAlert === '' ? (
            ''
          ) : (
            <Alert variant="danger">
              <Alert.Heading>Registration Error</Alert.Heading>
              {errorAlert}
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

/* Ensure that the React Router location object is available in case we need to redirect. */
SignUp.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.string,
  }),
};

SignUp.defaultProps = {
  location: { state: '' },
};

export default SignUp;
