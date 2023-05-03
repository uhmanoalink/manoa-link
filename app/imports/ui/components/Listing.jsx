import React from 'react';
import PropTypes from 'prop-types';
import { Badge, Button, Card, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Companies } from '../../api/company/Company';
import { Images } from '../../api/image/Image';
import { Listings } from '../../api/listing/Listing';
import SavedJob from './SavedJob';
import { Students } from '../../api/student/Student';
import ProtectedRender from './ProtectedRender';
import SavedConfirmation from './SavedConfirmation';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */

const defaultImage = 'images/sample-image-landscape.png';

const Listing = ({ listing }) => {
  const { readyCompany, company } = useTracker(() => {
    const subscription = Meteor.subscribe(Companies.studentPublicationName);
    const rdy = subscription.ready();
    const myCompany = Companies.collection.findOne({ userId: listing.companyId });
    return {
      ready: rdy,
      company: myCompany,
    };
  });

  const { ready, student } = useTracker(() => {
    const sub = Meteor.subscribe(Students.studentPublicationName);
    const studentsItems = Students.collection.findOne({ userId: Meteor.userId() });
    return {
      ready: sub.ready(),
      student: studentsItems,
    };
  }, []);

  function addHttpAndWww(url) {
    console.log(url);
    let newUrl = url;
    if (!url.startsWith('http') && !url.startsWith('https')) {
      newUrl = `https://${newUrl}`;
    }
    const hostname = new URL(newUrl).hostname;
    if (!hostname.startsWith('www.')) {
      newUrl = `https://www.${hostname}`;
    }
    return newUrl;
  }
  let companyName;
  if (readyCompany) {
    companyName = company.name;
  }
  return (
    <Col xs={12} md={4}>
      <Card className="justify-content-center" id="listing-card">
        <Card.Img id="listing-card-image" variant="top" src={(listing.imageId === 'noId') ? defaultImage : Images.getFileUrlFromId(listing.imageId)} />
        <Card.Title id="listing-card-title">{listing.title}</Card.Title>
        <Card.Text id="listing-card-text">Company: {companyName}</Card.Text>
        <Card.Text id="listing-card-text">{listing.description}</Card.Text>
        <div>
          <Card.Link id="listing-card-link" href={addHttpAndWww(listing.website)} target="_blank">
            <button type="button" className="visit-button">Visit Website</button>
          </Card.Link>
          <ProtectedRender allowedRoles={['student']}>{(student && ready) ? (<SavedJob jobID={listing._id} student={student} collection={Students.collection} />) : undefined}</ProtectedRender>
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
