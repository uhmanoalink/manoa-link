import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Alert, Card } from 'react-bootstrap';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-bootstrap5';

/**
 * Signin page overrides the form’s submit event and call Meteor’s loginWithPassword().
 * Authentication errors modify the component’s state to be displayed
 */
const SignIn = () => {
  const [error, setError] = useState('');
  const schema = new SimpleSchema({
    email: String,
    password: String,
  });
  const bridge = new SimpleSchema2Bridge(schema);
  const navigate = useNavigate();

  // Handle Signin submission using Meteor's account mechanism.
  const submit = (doc) => {
    // console.log('submit', doc, redirect);
    const { email, password } = doc;
    Meteor.loginWithPassword(email, password, (err) => {
      if (err) {
        setError(err.reason);
      } else {
        navigate('/');
      }
    });
    // console.log('submit2', email, password, error, redirect);
  };

  // Render the signin form.
  // console.log('render', error, redirect);
  // if correct authentication, redirect to page instead of login screen
  // Otherwise return the Login form.
  return (
    <div style={{ maxWidth: '350px' }}>
      <AutoForm schema={bridge} onSubmit={(data) => submit(data)}>
        <Card>
          <Card.Body>
            <TextField id="signin-form-email" name="email" placeholder="Email" />
            <TextField id="signin-form-password" name="password" placeholder="Password" type="password" />
            <ErrorsField />
            <SubmitField id="signin-form-submit" value="Login" />
          </Card.Body>
        </Card>
      </AutoForm>
      <Alert variant="light">
        <Link to="/signup">Click here to Register</Link>
      </Alert>
      {error !== '' ? (
        <Alert variant="danger">
          <Alert.Heading>Login was not successful</Alert.Heading>
          {error}
        </Alert>
      ) : undefined}
    </div>
  );
};

export default SignIn;
