import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import ProtectedRender from './ProtectedRender';
import { Events } from '../../api/event/Event';
import DeleteConfirmation from './DeleteConfirmation';

const formatDate = (date) => {
  if (date) {
    const parsedDate = new Date(date);
    if (!Number.isNaN(parsedDate.getTime())) {
      return parsedDate.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric' });
    }
  }
  return 'Invalid Date';
};

const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');
const isCompany = Roles.userIsInRole(Meteor.userId(), 'company');
/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const Event = ({ event }) => (
  <Card className="shadow event-card">
    <Card.Img variant="top" src={event.image} className="event-image" />
    <Card.Body className="event-body">
      <Card.Title className="event-name">{event.eventName}</Card.Title>
      <Card.Subtitle className="mb-2 text-muted event-address">{event.address}</Card.Subtitle>
      <Card.Text className="event-description">{event.description}</Card.Text>
      <div className="event-tags">
        {event.tags.map((tag, index) => (
          <Badge variant="light" className="event-tag" key={index}>{tag}</Badge>
        ))}
      </div>
      <Card.Text className="event-date">
        <h6>Event starts at</h6>
        {formatDate(event.eventAt)}
      </Card.Text>
      <Card.Text className="event-date">
        <h6>Event ends at</h6>
        {formatDate(event.eventDoneAt)}
      </Card.Text>
      <ProtectedRender allowedRoles={['admin']}>
        <Link to={`/edit/${event._id}`} className="event-edit-link mx-1">
          <Button variant="dark" size="sm">Edit</Button>
        </Link>
      </ProtectedRender>
      <Link to={`/event/${event._id}`} className="event-edit-link">
        <Button variant="secondary" size="sm">View</Button>
      </Link>
    </Card.Body>
  </Card>
);

// Require a document to be passed to this component.
Event.propTypes = {
  event: PropTypes.shape({
    eventName: PropTypes.string,
    companyId: PropTypes.string,
    address: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    createdAt: Date,
    eventAt: Date,
    eventDoneAt: Date,
    owner: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default Event;
