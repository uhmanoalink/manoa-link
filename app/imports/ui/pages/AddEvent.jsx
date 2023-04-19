import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, TextField, LongTextField, SubmitField, FormGroup, FormLabel } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import Select from 'react-select';
import { Events } from '../../api/event/Event';
import { Companies } from '../../api/company/Company';
import HelpButton from '../components/HelpButton';

const formSchema = new SimpleSchema({
  eventName: String,
  image: String,
  address: String,
  description: String,
  tags: {
    type: Array,
    defaultValue: [],
  },
  'tags.$': {
    type: String,
  },
  companyId: {
    type: String,
    defaultValue: Companies.companyPublicationName,
  },
  createdAt: {
    type: Date,
    defaultValue: new Date(),
  },
});

const bridge = new SimpleSchema2Bridge(formSchema);

const tagOptions = [
  'Computer Science', 'Cyber security', 'Web Development', 'Data Science', 'Business Administration',
  'Marketing', 'Accounting', 'Finance', 'Entrepreneurship', 'Biology', 'Chemistry',
  'Physics', 'Environmental Science', 'Geology', 'Psychology', 'Sociology', 'Political Science',
  'Economics', 'Anthropology', 'English', 'History', 'Philosophy', 'Religious Studies', 'Classics',
  'Fine Arts', 'Music', 'Theater', 'Film', 'Creative Writing', 'Nursing', 'Pre-Med', 'Public Health',
  'Health Sciences', 'Physical Therapy', 'Linguistics', 'Journalism', 'Advertising', 'Public Relations',
  'Communication Studies', 'Law', 'Criminal Justice', 'Paralegal Studies', 'Political Science', 'Sociology',
  'International Relations', 'Global Studies', 'Foreign Languages', 'Engineering',
].sort().map(tag => ({ label: tag, value: tag }));

const AddEvent = () => {
  const [selectedTags, setSelectedTags] = React.useState([]);

  const submit = (data, formRef) => {
    const { eventName, address, image, description, companyId = Companies.companyPublicationName, createdAt = new Date() } = data;
    const tags = selectedTags.map(tag => tag.value);
    const owner = Meteor.user().username;
    Events.collection.insert(
      { eventName, image, address, description, tags, companyId, createdAt, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item added successfully', 'success');
          formRef.reset();
          setSelectedTags([]);
        }
      },
    );
  };

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
                  <Col>
                    Tags
                    <Select
                      isMulti
                      options={tagOptions}
                      value={selectedTags}
                      onChange={setSelectedTags}
                    />
                  </Col>
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
      <HelpButton />
    </Container>
  );
};

export default AddEvent;
