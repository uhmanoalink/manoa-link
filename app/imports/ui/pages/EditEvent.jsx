import React, { useEffect } from 'react';
import swal from 'sweetalert';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, DateField, ErrorsField, HiddenField, LongTextField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import Select from 'react-select';
import { useParams } from 'react-router';
import LoadingSpinner from '../components/LoadingSpinner';
import { Events } from '../../api/event/Event';
import { Companies } from '../../api/company/Company';

const bridge = new SimpleSchema2Bridge(Events.schema);

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

/* Renders the EditEvent page for editing a single document. */
const EditEvent = () => {
  const [selectedTags, setSelectedTags] = React.useState([]);
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const { _id } = useParams();
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { doc, ready } = useTracker(() => {
    // Get access to Contact documents.
    const subscription = Meteor.subscribe(Events.adminPublicationName);
    const subscription2 = Meteor.subscribe(Events.companyPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready() && subscription2.ready();
    // Get the document
    const event = Events.collection.findOne(_id);
    return {
      doc: event,
      ready: rdy,
    };
  }, [_id]);
  // This is the code for having default tags that event has have when you click edit
  useEffect(() => {
    if (doc && doc.tags) {
      const initialTags = doc.tags.map(tag => ({ label: tag, value: tag }));
      setSelectedTags(initialTags);
    }
  }, [doc]);

  // console.log('EditEvent', doc, ready);
  // On successful submit, insert the data.
  const submit = (data) => {
    const { eventName, address, imageId, description, createdAt = new Date(), startDateTime, endDateTime } = data;
    const tags = selectedTags.map(tag => tag.value);
    const companyId = Meteor.userId();
    Events.collection.update(_id, { $set: { eventName, address, imageId, description, tags, companyId, createdAt, startDateTime, endDateTime } }, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'Item updated successfully', 'success');
      }
    });
  };

  return ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={10}>
          <Col className="text-center"><h2>Edit Event</h2></Col>
          <AutoForm schema={bridge} onSubmit={data => submit(data)} model={doc}>
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
                  <Col><TextField name="imageId" /></Col>
                  <Col><TextField name="address" /></Col>
                </Row>
                <LongTextField name="description" />
                <DateField className="mb-3" name="startDateTime" placeholder="Time to start the event" />
                <DateField className="mb-3" name="endDateTime" placeholder="Time to end the event" />
                <SubmitField />
                <ErrorsField />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default EditEvent;
