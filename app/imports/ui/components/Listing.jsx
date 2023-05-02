import React from 'react';
import PropTypes from 'prop-types';
import { Badge, Button, Card, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Images } from '../../api/image/Image';
import { Listings } from '../../api/listing/Listing';
import SavedJob from './SavedJob';
import { Students } from '../../api/student/Student';
import ProtectedRender from './ProtectedRender';
import SavedConfirmation from './SavedConfirmation';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */

const defaultImage = 'images/sample-image-landscape.png';
const Listing = ({ listing }) => {
  const { ready, student } = useTracker(() => {
    const sub = Meteor.subscribe(Students.studentPublicationName);
    const studentsItems = Students.collection.findOne({ userId: Meteor.userId() });
    return {
      ready: sub.ready(),
      student: studentsItems,
    };
  }, []);
  return (
    <Col xs={12} md={4}>
      <Card className="justify-content-center" id="listing-card">
        <Card.Img id="listing-card-image" variant="top" src={(listing.imageId === 'noId') ? defaultImage : Images.getFileUrlFromId(listing.imageId)} />
        <Card.Title id="listing-card-title">{listing.title}</Card.Title>
        <Card.Text id="listing-card-text">Company: {listing.companyId}</Card.Text>
        <Card.Text id="listing-card-text">{listing.description}</Card.Text>
        <div>
          <Card.Link id="listing-card-link" to={listing.website}><button type="submit" className="visit-button">More Info</button></Card.Link>
          <SavedJob jobID={listing._id} student={student} collection={Students.collection} />
        </div>
      </Card>
    </Col>
  );
};
// Require a document to be passed to this component.
Listing.propTypes = {
  listing: PropTypes.shape({
    companyId: PropTypes.string, // the ObjectId of the company that created it
    title: PropTypes.string,
    description: PropTypes.string,
    imageId: PropTypes.string, // also keep as string
    website: PropTypes.string,
    location: PropTypes.string, // optional. if not given, defaults to the address of the company
    employmentType: PropTypes.string,
    scheduleType: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    createdAt: PropTypes.instanceOf(Date),
    startDate: PropTypes.instanceOf(Date),
    _id: PropTypes.string,
  }).isRequired,
};

export default Listing;
