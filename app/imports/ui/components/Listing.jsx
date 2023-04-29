import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Companies } from '../../api/company/Company';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const Listing = ({ listing }) => {

  const company = Companies.collection.findOne({ _id: listing.companyId });

  return (
    <Card className="h-100">
      <Card.Header>
        <Card.Title>{listing.title}</Card.Title>
        <Card.Subtitle>{company.name}</Card.Subtitle>
      </Card.Header>
      <Card.Body>
        <Card.Text>{listing.description}</Card.Text>
        <Link to={`/edit/${listing._id}`}>Edit</Link>
      </Card.Body>
    </Card>
  );
};

// Require a document to be passed to this component.
Listing.propTypes = {
  listing: PropTypes.shape({
    companyId: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    location: PropTypes.string,
    employmentType: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default Listing;
