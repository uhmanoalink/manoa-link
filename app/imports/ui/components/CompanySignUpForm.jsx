import React from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonToolbar, Card } from 'react-bootstrap';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, ErrorsField, LongTextField, TextField } from 'uniforms-bootstrap5';

const CompanySignUpForm = ({ onBack, onSubmit }) => {

  const schema = new SimpleSchema({
    companyName: String,
    website: String,
    address: String,
    description: {
      type: String,
      optional: true,
    },
  });
  const bridge = new SimpleSchema2Bridge(schema);

  const submit = (data) => {
    onSubmit(data);
  };

  return (
    <AutoForm schema={bridge} onSubmit={submit}>
      <h2 className="text-center" id="signup-title">
        Company Registration
      </h2>
      <Card>
        <Card.Body>
          <TextField name="companyName" />
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
  );
};

CompanySignUpForm.propTypes = {
  onBack: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default CompanySignUpForm;
