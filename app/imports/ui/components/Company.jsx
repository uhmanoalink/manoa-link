import React from 'react';
import PropTypes from 'prop-types';
import { Card, Col } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');
const isCompany = Roles.userIsInRole(Meteor.userId(), 'company');

const Company = ({ company }) => (
  <Col xs={12} md={4}>
    <Card className="justify-content-center" id="listing-card">
      <Card.Img id="listing-card-image" variant="top" src={company.imageId} />
      <Card.Title id="listing-card-title">{company.name}</Card.Title>
      <Card.Text id="listing-card-text">{company.description}</Card.Text>
      <Card.Link id="listing-card-link" to={company.website}><button type="submit" className="visit-button">Visit</button></Card.Link>
    </Card>
  </Col>
);

// Require a document to be passed to this component.
Company.propTypes = {
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

export default Company;
