import React, { useMemo, useState } from 'react';
import { PropTypes } from 'prop-types';
import { Link, Navigate } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import { Alert, Button, ButtonGroup, ButtonToolbar, Card, Col, Container, Row } from 'react-bootstrap';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, ErrorsField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { Meteor } from 'meteor/meteor';

const StudentSignUpForm = ({ onBack, onSubmit }) => {
  const [name, setName] = useState('');

  const schema = new SimpleSchema({
    firstName: String,
    lastName: String,
  });
  const bridge = new SimpleSchema2Bridge(schema);

  const greeting = useMemo(() => {
    const generateGreeting = () => {
      const greetings = ['Hi there', 'Welcome', 'Hello', 'Great to have you here'];
      return greetings[Math.floor(Math.random() * greetings.length)];
    };
    return generateGreeting();
  }, []);

  const submit = (data) => {
    onSubmit(data);
  };

  return (
    <>
      <h2 className="text-center" id="signup-title">
        {greeting + (name ? `, ${name}!` : '')}
      </h2>
      <AutoForm schema={bridge} onSubmit={submit}>
        <Card>
          <Card.Body>
            <TextField
              value={name}
              onChange={(value) => setName(value)}
              name="firstName"
            />
            <TextField name="lastName" />
            <ErrorsField />
            <ButtonToolbar>
              <Button onClick={onBack} variant="success" type="button">Back</Button>
              <Button variant="success" type="submit">Register</Button>
            </ButtonToolbar>
          </Card.Body>
        </Card>
      </AutoForm>
    </>
  );
};

StudentSignUpForm.propTypes = {
  onBack: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default StudentSignUpForm;
