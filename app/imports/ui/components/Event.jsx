import React from 'react';
import PropTypes from 'prop-types';
import { Image, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const Event = ({ event }) => (
  <Card className="h-100">
    <Card.Header>
      <Image src={event.image} width={75} />
      <Card.Title>{event.eventName}</Card.Title>
      <Card.Subtitle>{event.address}</Card.Subtitle>
    </Card.Header>
    <Card.Body>
      <Card.Text>{event.description}</Card.Text>
      <Link to={`/edit/${event._id}`}>Edit</Link>
    </Card.Body>
  </Card>
);

// Require a document to be passed to this component.
Event.propTypes = {
  event: PropTypes.shape({
    eventName: PropTypes.string,
    companyId: String,
    address: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    tag: PropTypes.string,
    createdAt: Date,
    owner: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default Event;
