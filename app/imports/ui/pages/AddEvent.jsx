import React, { useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, AutoField, ErrorsField, TextField, LongTextField, SubmitField, DateField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import Select from 'react-select';
import { Events } from '../../api/event/Event';
import { Companies } from '../../api/company/Company';
import HelpButton from '../components/HelpButton';
import FileUpload from '../components/FileUpload';

const formSchema = new SimpleSchema({
  eventName: String,
  address: String,
  description: String,
  imageId: {
    type: String,
    optional: true,
  },
  tags: {
    type: Array,
    defaultValue: [],
    optional: true,
  },
  'tags.$': {
    type: String,
  },
  startDateTime: Date,
  endDateTime: Date,
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
  const [uploadedFileId, setUploadedFileId] = useState();
  const submit = (data, formRef) => {
    const { eventName, address, description, createdAt = new Date(), startDateTime, endDateTime } = data;
    const tags = selectedTags.map(tag => tag.value);
    const companyId = Meteor.userId();
    const imageId = uploadedFileId;
    Events.collection.insert(
      { eventName, companyId, address, description, imageId, tags, createdAt, startDateTime, endDateTime },
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

  const handleUpload = (fileDoc) => {
    setUploadedFileId(fileDoc._id);
  };
  let fRef = null;

  return (
    <Container className="py-3 add-event">
      <Row className="justify-content-center">
        <Col xs={12} lg={10}>
          <Col className="text-center mb-4"><h2>Add Event</h2></Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card className="event-card">
              <Card.Body>
                <Row>
                  <Col><TextField className="mb-3" name="eventName" placeholder="Event Name" /></Col>
                  <Col>
                    Tags
                    <Select
                      className="mb-3"
                      isMulti
                      options={tagOptions}
                      value={selectedTags}
                      onChange={(selected) => setSelectedTags(selected)}
                      name="tags"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col><TextField className="mb-3" name="address" placeholder="Address" /></Col>
                  <FileUpload onUpload={handleUpload} name="imageId" />
                </Row>
                <LongTextField className="mb-3" name="description" placeholder="Description" />
                <DateField className="mb-3" name="startDateTime" placeholder="Time to start the event" />
                <DateField className="mb-3" name="endDateTime" placeholder="Time to end the event" />
                <SubmitField className="submit-btn" value="Add Event" />
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
