import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, ErrorsField, SelectField, TextField } from 'uniforms-bootstrap5';

const RegisterUserForm = ({ onSubmit }) => {

  const schema = new SimpleSchema({
    email: String,
    password: String,
    youAreA: {
      type: String,
      allowedValues: ['company', 'student'],
      defaultValue: 'student',
    },
  });
  const bridge = new SimpleSchema2Bridge(schema);

  const submit = (data) => {
    onSubmit(data);
  };

  return (
    <>
      <h2 className="text-center" id="signup-title">Register Your Account</h2>
      <AutoForm schema={bridge} onSubmit={data => submit(data)}>
        <Card>
          <Card.Body>
            <TextField name="email" placeholder="E-mail address" />
            <TextField name="password" placeholder="Password" type="password" />
            <div id="role-field"><SelectField name="youAreA" /></div>
            <ErrorsField />
            <Button className="w-100" variant="success" type="submit">Next</Button>
          </Card.Body>
        </Card>
      </AutoForm>
    </>
  );
};

RegisterUserForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default RegisterUserForm;
