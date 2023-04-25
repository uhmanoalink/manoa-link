import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Alert, Card } from 'react-bootstrap';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import {
  AutoForm,
  ErrorsField,
  SubmitField,
  TextField,
} from 'uniforms-bootstrap5';

/**
 * ## SignIn component
 *
 * The `SignIn` component provides a form for users to sign in with their email and password.
 * The actual login is handled by `Meteor.loginWithPassword`
 *
 * ### Props
 *
 * - `title` (optional, default = 'Welcome Back!'):
 * A string used to set a custom title.
 *
 * - `width` (optional, default = 350):
 * A number used to set a custom width.
 *
 * ---
 *
 * @type { React.FC<{ title: string, width: number } &  { title: 'Welcome Back!', width: 350 }> }
 */
const SignIn = ({ title, width }) => {
  const [error, setError] = useState('');
  const schema = new SimpleSchema({
    email: String,
    password: String,
  });
  const bridge = new SimpleSchema2Bridge(schema);
  const navigate = useNavigate();

  const submit = (doc) => {
    const { email, password } = doc;
    Meteor.loginWithPassword(email, password, (err) => {
      if (err) {
        setError(err.reason);
      } else {
        navigate('/dashboard');
      }
    });
  };

  return (
    <div className="signin-container" style={{ width: `clamp(200px, 85vw, ${width}px)` }}>
      <h2>{title}</h2>
      <div className="signin">
        <AutoForm schema={bridge} onSubmit={(data) => submit(data)}>
          <Card>
            <Card.Body>
              <TextField
                className="signin-form-email"
                name="email"
                placeholder="Email"
              />
              <TextField
                className="signin-form-password"
                name="password"
                placeholder="Password"
                type="password"
              />
              <ErrorsField />
              <SubmitField className="signin-form-submit" value="Login" />
            </Card.Body>
          </Card>
        </AutoForm>
        <Alert variant="light">
          <span>
            Don&apos;t have an account?{' '}
            <Link className="font-accent" to="/signup">
              Sign Up!
            </Link>
          </span>
        </Alert>
        {error !== '' ? (
          <Alert variant="danger">
            <Alert.Heading>Login was not successful</Alert.Heading>
            {error}
          </Alert>
        ) : undefined}
      </div>
    </div>
  );
};

SignIn.propTypes = {
  title: PropTypes.string,
  width: PropTypes.number,
};

SignIn.defaultProps = {
  title: 'Welcome Back!',
  width: 350,
};

export default SignIn;
