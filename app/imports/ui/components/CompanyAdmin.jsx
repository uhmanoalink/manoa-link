import React from 'react';
import PropTypes from 'prop-types';
import { Image, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Companies } from '../../api/company/Company';
import DeleteConfirmation from './DeleteConfirmation';
import { Images } from '../../api/image/Image';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const CompanyAdmin = ({ company }) => (
  <Card className="h-100">
    <Card.Header>
      <Image src={Images.getFileUrlFromId(company.imageId) ?? ''} width={75} />
      <Card.Title>{company.name}</Card.Title>
      <Card.Subtitle>{company.website}</Card.Subtitle>
    </Card.Header>
    <Card.Body>
      <Link to={`/edit/${company._id}`}>Edit</Link>
      <DeleteConfirmation collection={Companies.collection} document={company} />
    </Card.Body>
  </Card>
);

// Require a document to be passed to this component.
CompanyAdmin.propTypes = {
  company: PropTypes.shape({
    _id: PropTypes.string,
    userId: PropTypes.string,
    name: PropTypes.string,
    imageId: PropTypes.string,
    website: PropTypes.string,
    address: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
};

export default CompanyAdmin;
