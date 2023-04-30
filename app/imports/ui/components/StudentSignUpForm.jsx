import React from 'react';
import { PropTypes } from 'prop-types';
import { Button, ButtonToolbar, Card } from 'react-bootstrap';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, ErrorsField, TextField } from 'uniforms-bootstrap5';

const StudentSignUpForm = ({ onBack, onSubmit }) => {

  const schema = new SimpleSchema({
    firstName: String,
    lastName: String,
  });
  const bridge = new SimpleSchema2Bridge(schema);

  const submit = (data) => {
    onSubmit(data);
  };

  return (
    <AutoForm schema={bridge} onSubmit={submit}>
      <h2 className="text-center" id="signup-title">
        Student Registration
      </h2>
      <Card>
        <Card.Body>
          <TextField name="firstName" />
          <TextField name="lastName" />
          <ErrorsField />
          <ButtonToolbar>
            <Button onClick={onBack} variant="success" type="button">Back</Button>
            <Button variant="success" type="submit">Register</Button>
          </ButtonToolbar>
        </Card.Body>
      </Card>
    </AutoForm>
  );
};

StudentSignUpForm.propTypes = {
  onBack: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default StudentSignUpForm;
