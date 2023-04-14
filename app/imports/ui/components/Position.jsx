import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const Position = ({ position }) => (
  <Card className="h-100">
    <Card.Header>
      <Card.Title>{position.positionName}</Card.Title>
      <Card.Subtitle>{position.companyName}</Card.Subtitle>
    </Card.Header>
    <Card.Body>
      <Card.Text>{position.description}</Card.Text>
      <Link to={`/edit/${position._id}`}>Edit</Link>
    </Card.Body>
  </Card>
);

// Require a document to be passed to this component.
Position.propTypes = {
  position: PropTypes.shape({
    positionName: PropTypes.string,
    companyName: PropTypes.string,
    description: PropTypes.string,
    pay: Number,
    tag: PropTypes.string,
    createdAt: Date,
    owner: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default Position;
