import React from 'react';
import PropTypes from 'prop-types';
import { Card, Col } from 'react-bootstrap';
import Company from './Company';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const Listing = ({ listing }) => (
  <Col xs={12} md={4}>
    <Card className="justify-content-center" id="listing-card">
      <Card.Img id="listing-card-image" variant="top" src={listing.imageId} />
      <Card.Title id="listing-card-title">{listing.title}</Card.Title>
      <Card.Text id="listing-card-text">Company: {listing.companyId}</Card.Text>
      <Card.Text id="listing-card-text">{listing.description}</Card.Text>
      <Card.Link id="listing-card-link" to={listing.website}><button type="submit" className="visit-button">More Info</button></Card.Link>
    </Card>
  </Col>
);
// Require a document to be passed to this component.
Listing.propTypes = {
  listing: PropTypes.shape({
    _id: PropTypes.string,
    companyId: PropTypes.string, // the ObjectId of the company that created it
    title: PropTypes.string,
    description: PropTypes.string,
    imageId: PropTypes.string, // also keep as string
    website: PropTypes.string,
    location: PropTypes.string, // optional. if not given, defaults to the address of the company
    employmentType: PropTypes.string,
    scheduleType: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    createdAt: Date,
    startDate: Date,
  }).isRequired,
};

export default Listing;
