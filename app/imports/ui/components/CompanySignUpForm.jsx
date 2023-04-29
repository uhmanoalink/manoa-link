import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Navigate } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import { Alert, Button, ButtonToolbar, Card, Col, Container, Row } from 'react-bootstrap';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, ErrorsField, LongTextField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { Meteor } from 'meteor/meteor';

const CompanySignUpForm = ({ onBack, onSubmit }) => {
  const [name, setName] = useState('');

  const schema = new SimpleSchema({
    companyName: String,
    website: String,
    address: String,
    description: String,
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
              name="companyName"
            />
            <TextField name="website" />
            <TextField name="address" />
            <LongTextField
              name="description"
              placeholder="If you want, you can write a description here. You can always change it later."
            />
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

CompanySignUpForm.propTypes = {
  onBack: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default CompanySignUpForm;
