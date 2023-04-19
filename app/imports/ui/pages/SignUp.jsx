import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Navigate } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import { Alert, Card, Col, Container, Row } from 'react-bootstrap';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, ErrorsField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { Roles } from 'meteor/alanning:roles';

/**
 * SignUp component is similar to signin component, but we create a new user instead.
 */

const SignUp = ({ location }) => {

  const [error, setError] = useState('');
  const [redirectToReferer, setRedirectToRef] = useState(false);

  const schema = new SimpleSchema({
    email: String,
    password: String,
    role: {
      type: String,
      allowedValues: ['company', 'student'],
      defaultValue: 'student',
    },
  });
  const bridge = new SimpleSchema2Bridge(schema);

  /* Handle SignUp submission. Create user account and a profile entry, then redirect to the home page. */
  const submit = (doc) => {
    const { email, password, role } = doc;

    const userID = Accounts.createUser({ email, username: email, password }, (err) => {
      if (err) {
        setError(err.reason);
      } else {
        setError('');
        setRedirectToRef(true);
      }
    });
    if (!error) {
      // Does not work, strangely. Needs to be fixed!!
      // Fortunately, it does add the user, but fails to add any roles.
      Roles.createRole(role, { unlessExists: true });
      Roles.addUsersToRoles(userID, role);
    }
  };

  /* Display the signup form. Redirect to add page after successful registration and login. */
  const { from } = location?.state || { from: { pathname: '/dashboard' } };
  // if correct authentication, redirect to from: page instead of signup screen
  if (redirectToReferer) {
    return <Navigate to={from} />;
  }
  return (
    <Container id="signup-page" className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center">
            <h2 id="signup-title">Register Your Account</h2>
          </Col>
          <AutoForm schema={bridge} onSubmit={data => submit(data)}>
            <Card>
              <Card.Body>
                <TextField name="email" placeholder="E-mail address" />
                <TextField name="password" placeholder="Password" type="password" />
                <SelectField name="role" />
                <ErrorsField />
                <SubmitField />
              </Card.Body>
            </Card>
          </AutoForm>
          <Alert variant="light">
            Already have an account? Login
            {' '}
            <Link to="/signin">here</Link>
          </Alert>
          {error === '' ? (
            ''
          ) : (
            <Alert variant="danger">
              <Alert.Heading>Registration was not successful</Alert.Heading>
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
