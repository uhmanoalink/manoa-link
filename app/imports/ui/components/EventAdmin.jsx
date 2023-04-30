import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Events } from '../../api/event/Event';
import DeleteConfirmation from './DeleteConfirmation';

const EventAdmin = ({ event }) => (
  <Card className="shadow event-card">
    <Card.Img variant="top" src={event.image} className="event-image" />
    <Card.Body className="event-body">
      <Card.Title className="event-name">{event.eventName}</Card.Title>
      <Card.Subtitle className="mb-2 text-muted event-address">{event.address}</Card.Subtitle>
      <Card.Text className="event-description">{event.description}</Card.Text>
      <div className="event-tags">
        {event.tags.map((tag, index) => (
          <Badge variant="primary" className="event-tag" key={index}>{tag}</Badge>
        ))}
      </div>
      <Link to={`/edit/${event._id}`} className="event-edit-link">
        <Button variant="outline-dark" size="sm">Edit</Button>
      </Link>
      <DeleteConfirmation collection={Events} document={event} />
    </Card.Body>
  </Card>
);

// Require a document to be passed to this component.
EventAdmin.propTypes = {
  event: PropTypes.shape({
    eventName: PropTypes.string,
    companyId: PropTypes.string,
    address: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    createdAt: PropTypes.instanceOf(Date),
    owner: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default EventAdmin;
