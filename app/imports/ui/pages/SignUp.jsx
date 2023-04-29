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

const SignUp = ({ location }) => {
  const [page, setPage] = useState('newUser');
  const [error, setError] = useState('');
  const [redirectToReferer, setRedirectToRef] = useState(false);
  const [info, setInfo] = useState({});

  const submit = (doc) => {
    setInfo({ ...info, doc });

    if (page === 'newUser') {
      const { email, password, youAreA: role } = doc;
      // Check if the user exists already
      Meteor.call('findUserByUsername', email, (err, result) => {
        if (result) {
          setError('That email is already taken!');
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
            } else {
              setRedirectToRef(true);
            }
          });
        }
        setError(errorMsg);
      });
      if (page === 'student') {
        Students.collection.insert(
          { eventName, image, address, description, tags, companyId, createdAt, eventAt, eventDoneAt, owner },
          (error) => {
            if (error) {
              swal('Error', error.message, 'error');
            } else {
              swal('Success', 'Item added successfully', 'success');
              formRef.reset();
              setSelectedTags([]);
            }
          },
        );
      } else if (page === 'company') {

      } else {
        setError('Something went wrong! 😢');
      }
    }
  };

  const back = (doc) => {
    console.log(doc);
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
    setError('Something went wrong! 😢');
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
          {error === '' ? (
            ''
          ) : (
            <Alert variant="danger">
              <Alert.Heading>Registration Error</Alert.Heading>
              {error}
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
