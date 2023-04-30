import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, ErrorsField, SelectField, TextField } from 'uniforms-bootstrap5';

const RegisterUserForm = ({ onSubmit }) => {

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

  const submit = (data) => {
    onSubmit(data);
  };

  return (
    <AutoForm schema={bridge} onSubmit={data => submit(data)}>
      <h2 className="text-center" id="signup-title">
        Register Your Account
      </h2>
      <Card>
        <Card.Body>
          <TextField name="email" placeholder="E-mail address" />
          <TextField name="password" placeholder="Password" type="password" />
          <div id="role-field"><SelectField name="role" label="You are a" /></div>
          <ErrorsField />
          <Button className="w-100" variant="success" type="submit">Next</Button>
        </Card.Body>
      </Card>
    </AutoForm>
  );
};

RegisterUserForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default RegisterUserForm;
