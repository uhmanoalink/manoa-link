import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Students } from '../../api/student/Student';
import { Images } from '../../api/image/Image';
import { useTracker } from 'meteor/react-meteor-data';

const defaultImage = "images/sample-image-landscape.png";

const formatDate = (date) => {
  if (date) {
    const parsedDate = new Date(date);
    if (!Number.isNaN(parsedDate.getTime())) {
      return parsedDate.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
    }
  }
  return 'Invalid Date';
};

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const PastEvent = ({ event }) => {
  const { ready, image } = useTracker(() => {
    const imagesSub = Meteor.subscribe(Images.allImagesPublication);
    const img = (event.imageId !== "noId") ? Images.getFileUrlFromId(event.imageId) : defaultImage;
    return {
      ready: imagesSub.ready(),
      image: img,
    };
  }, []);
  return (
  <Card className="shadow event-card h-100 bg-dark past-event">
    <Card.Img variant="top" src={(ready) ? image : defaultImage} className="event-image" />
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
        <span>Event ends at</span>
        {formatDate(event.endDateTime)}
      </Card.Text>
      <Link to={`/event/${event._id}`} className="event-edit-link">
        <Button variant="secondary" size="sm">View</Button>
      </Link>
    </Card.Body>
  </Card>
);}

// Require a document to be passed to this component.
PastEvent.propTypes = {
  event: PropTypes.shape({
    eventName: PropTypes.string,
    companyId: PropTypes.string,
    address: PropTypes.string,
    description: PropTypes.string,
    imageId: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    createdAt: PropTypes.instanceOf(Date),
    startDateTime: PropTypes.instanceOf(Date),
    endDateTime: PropTypes.instanceOf(Date),
    owner: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default PastEvent;
