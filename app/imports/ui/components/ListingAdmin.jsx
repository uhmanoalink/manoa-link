import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Companies } from '../../api/company/Company';
import { Listings } from '../../api/listing/Listing';
import DeleteConfirmation from './DeleteConfirmation';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const ListingAdmin = ({ listing }) => {

  const company = Companies.collection.findOne({ _id: listing.companyId });

  return (
    <Card className="h-100">
      <Card.Header>
        <Card.Title>{listing.title}</Card.Title>
        <Card.Subtitle>{(company !== undefined) && company.name}</Card.Subtitle>
      </Card.Header>
      <Card.Body>
        <Card.Text>{listing.description}</Card.Text>
        <Link to={`/edit/${listing._id}`}>Edit</Link>
        <DeleteConfirmation collection={Listings.collection} document={listing} />
      </Card.Body>
    </Card>
  );
};

// Require a document to be passed to this component.
ListingAdmin.propTypes = {
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

export default ListingAdmin;
