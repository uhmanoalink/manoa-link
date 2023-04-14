import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, TextField, LongTextField, SubmitField, SelectField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Events } from '../../api/event/Event';
import { Companys } from '../../api/company/Company';
// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  eventName: String,
  image: String,
  address: String,
  description: String,
  tag: {
    type: String,
    allowedValues: ['Computer Science', 'Cyber security', 'Web Development', 'Data Science', 'Business Administration',
      'Marketing', 'Accounting', 'Finance', 'Entrepreneurship', 'Biology', 'Chemistry',
      'Physics', 'Environmental Science', 'Geology', 'Psychology', 'Sociology', 'Political Science',
      'Economics', 'Anthropology', 'English', 'History', 'Philosophy', 'Religious Studies', 'Classics',
      'Fine Arts', 'Music', 'Theater', 'Film', 'Creative Writing', 'Nursing', 'Pre-Med', 'Public Health',
      'Health Sciences', 'Physical Therapy', 'Linguistics', 'Journalism', 'Advertising', 'Public Relations',
      'Communication Studies', 'Law', 'Criminal Justice', 'Paralegal Studies', 'Political Science', 'Sociology',
      'International Relations', 'Global Studies', 'Foreign Languages', 'Engineering'].sort(),
    defaultValue: 'Accounting',
  },
  companyId: {
    type: String,
    defaultValue: Companys.companyPublicationName,
  },
  createdAt: {
    type: Date,
    defaultValue: new Date(),
  },
});

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the AddStuff page for adding a document. */
const AddEvent = () => {

  // On submit, insert the data.
  const submit = (data, formRef) => {
    const { eventName, address, description, tag, companyId, createdAt } = data;
    const owner = Meteor.user().username;
    const file = formRef.getModel().image;

    if (file) {
      const image = file.name;
      Events.collection.insert(
        { eventName, image, address, description, tag, companyId, createdAt, owner },
        (error) => {
          if (error) {
            swal('Error', error.message, 'error');
          } else {
            swal('Success', 'Item added successfully', 'success');
            formRef.reset();
          }
        },
      );
    }
  };

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  let fRef = null;
  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={10}>
          <Col className="text-center"><h2>Add Event</h2></Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <Row>
                  <Col><TextField name="eventName" /></Col>
                  <SelectField name="tag" />
                </Row>
                <Row>
                  <Col><TextField name="address" /></Col>
                  <Col><TextField name="image" /></Col>
                </Row>
                <LongTextField name="description" />
                <ErrorsField />
                <SubmitField />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  );
};

export default AddEvent;
