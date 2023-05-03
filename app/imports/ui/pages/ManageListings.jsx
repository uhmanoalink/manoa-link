import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, DateField, LongTextField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import Select from 'react-select';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import swal from 'sweetalert';
import HelpButton from '../components/HelpButton';
import LoadingSpinner from '../components/LoadingSpinner';
import Listing from '../components/Listing';
import { Listings } from '../../api/listing/Listing';
import { Images } from '../../api/image/Image';
import FileUpload from '../components/FileUpload';
import { Companies } from '../../api/company/Company';

const formSchema = new SimpleSchema({
  title: String,
  description: String,
  website: String,
  location: String,
  employmentType: String,
  scheduleType: String,
  tags: {
    type: Array,
    defaultValue: [],
    optional: true,
  },
  'tags.$': {
    type: String,
  },
  startDate: Date,
});
const bridge = new SimpleSchema2Bridge(formSchema);
const ManageListings = () => {
  const [imageDoc, setImageDoc] = useState(null);
  const [uploadedFileId, setUploadedFileId] = useState('noId');

  const convertImage = async (url) => {
    const file = await Images.getFileFromImageUrl(url);
    if (file) {
      const doc = await Images.uploadFile(file);
      setImageDoc(doc);
    }
  };

  const handleUpload = (fileDoc) => {
    setUploadedFileId(fileDoc._id);
  };

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
    const { title, website, location, employmentType, scheduleType, startDate, description } = data;
    const imageId = uploadedFileId;
    const tags = selectedTags.map(tag => tag.value);
    const companyId = Meteor.userId();
    console.log(companyId);
    const associatedCompany = Companies.collection.findOne({ userId: companyId });
    console.log(associatedCompany);
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
          <Card>
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
                <FileUpload onUpload={handleUpload} name="imageId" />
              </Row>
              <Row>
                <Col><TextField className="mb-3" name="website" placeholder="Website URL" /></Col>
                <Col><TextField className="mb-3" name="location" placeholder="Location" /></Col>
              </Row>
              <Row>
                <Col><SelectField
                  label="Employment Type"
                  name="employmentType"
                  options={[
                    { label: 'In-Person', value: 'in-person' },
                    { label: 'Online', value: 'online' },
                    { label: 'Hybrid', value: 'hybrid' },
                  ]}
                  placeholder="Select"
                />
                </Col>
                <Col><SelectField
                  label="Schedule Type"
                  name="scheduleType"
                  options={[
                    { label: 'Full-Time', value: 'full-time' },
                    { label: 'Part-Time', value: 'part-time' },
                    { label: 'Flexible', value: 'flexible' }]}
                  placeholder="Select"
                />
                </Col>
              </Row>
              <DateField className="mb-3" name="startDate" placeholder="Start Date" />
              <LongTextField name="description" placeholder="Description" />
              <SubmitField className="submit-btn" value="Post Job Listing" />
            </Card.Body>
            <i><p>You will be able to modify this later.</p></i>
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
