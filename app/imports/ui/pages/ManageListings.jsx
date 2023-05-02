import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, DateField, ErrorsField, LongTextField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import Select from 'react-select';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import swal from 'sweetalert';
import PropTypes from 'prop-types';
import HelpButton from '../components/HelpButton';
import LoadingSpinner from '../components/LoadingSpinner';
import Listing from '../components/Listing';
import { Listings } from '../../api/listing/Listing';

const formSchema = new SimpleSchema({
  title: String,
  description: String,
  imageId: String,
  website: String,
  location: String,
  employmentType: PropTypes.oneOf(['in-person', 'online', 'hybrid']),
  scheduleType: PropTypes.oneOf(['part-time', 'full-time', 'flexible']),
  tags: [String],
  startDate: Date,
});
const bridge = new SimpleSchema2Bridge(formSchema);
const ManageListings = () => {
  const [selectedTags, setSelectedTags] = React.useState([]);
  const { ready, listings } = useTracker(() => {
    const subscription = Meteor.subscribe(Listings.companyPublicationName);
    const rdy = subscription.ready();
    const myListings = Listings.collection.find({ companyId: Meteor.userId() });
    return {
      ready: rdy,
      listings: myListings,
    };
  });

  const submit = (data, formRef) => {
    const { title, imageId, website, location, employmentType, scheduleType, startDate, description } = data;
    const tags = selectedTags.map(tag => tag.value);
    const companyId = Meteor.user()._id;
    const createdAt = new Date();
    Listings.collection.insert(
      { companyId, title, description, imageId, website, location, employmentType, scheduleType, tags, createdAt, startDate },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Job Listing added successfully', 'success');
          formRef.reset();
          setSelectedTags([]);
        }
      },
    );
  };
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

  let fRef = null;

  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <h2>Post a new job listing</h2>
        <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
          <Card className="event-card">
            <Card.Body>
              <Row>
                <Col><TextField className="mb-3" name="title" placeholder="Job Title" /></Col>
                <Col>
                  Tags
                  <Select
                    className="mb-3"
                    isMulti
                    options={tagOptions}
                    value={selectedTags}
                    onChange={setSelectedTags}
                  />
                </Col>
              </Row>
              <Row>
                <Col><TextField className="mb-3" name="imageId" placeholder="Image URL" /></Col>
              </Row>
              <Row>
                <Col><TextField className="mb-3" name="website" placeholder="Website URL" /></Col>
                <Col><TextField className="mb-3" name="location" placeholder="Location" /></Col>
              </Row>
              <Row>
                <Col><SelectField name="employmentType" /><ErrorsField /></Col>
                <Col><SelectField name="scheduleType" /><ErrorsField /></Col>
              </Row>
              <DateField className="mb-3" name="startDate" placeholder="Start Date" />
              <LongTextField className="mb-3" name="description" placeholder="Description" />
              <ErrorsField />
              <SubmitField className="submit-btn" value="Post Job Listing" />
            </Card.Body>
          </Card>
        </AutoForm>
      </Row>
      <Row className="justify-content-center">
        <h2>Your current listings:</h2>
        <Col>
          <Row>
            { ready ? (listings.map((listing) => (
              <Listing listing={listing} key={listing._id} />
            )))
              : (<LoadingSpinner />) }
          </Row>
        </Col>
      </Row>
      <HelpButton />
    </Container>
  );
};

export default ManageListings;
