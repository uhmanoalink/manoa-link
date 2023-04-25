import React from 'react';
import PropTypes from 'prop-types';
import { Image, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Companies } from '../../api/company/Company';
import DeleteConfirmation from './DeleteConfirmation';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const CompanyAdmin = ({ company }) => (
  <Card className="h-100">
    <Card.Header>
      <Image src={company.image} width={75} />
      <Card.Title>{company.companyName}</Card.Title>
      <Card.Subtitle>{company.address}</Card.Subtitle>
    </Card.Header>
    <Card.Body>
      <Card.Text>{company.description}</Card.Text>
      <Link to={`/edit/${company._id}`}>Edit</Link>
      <DeleteConfirmation collection={Companies.collection} document={company} />
    </Card.Body>
  </Card>
);

// Require a document to be passed to this component.
CompanyAdmin.propTypes = {
  company: PropTypes.shape({
    companyName: PropTypes.string,
    address: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    tag: PropTypes.string,
    owner: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default CompanyAdmin;
