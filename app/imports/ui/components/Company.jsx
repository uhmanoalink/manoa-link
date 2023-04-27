import React from 'react';
import PropTypes from 'prop-types';
import { Image, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');
const isCompany = Roles.userIsInRole(Meteor.userId(), 'company');

const Company = ({ company }) => (
  <Card className="h-100">
    <Card.Header>
      <Image src={company.image} width={75} />
      <Card.Title>{company.companyName}</Card.Title>
      <Card.Subtitle>{company.address}</Card.Subtitle>
    </Card.Header>
    <Card.Body>
      <Card.Text>{company.description}</Card.Text>
      { (isAdmin || isCompany) ? (<Link to={`/edit/${company._id}`}>Edit</Link>) : <></> }
    </Card.Body>
  </Card>
);

// Require a document to be passed to this component.
Company.propTypes = {
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

export default Company;
