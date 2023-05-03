import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Events } from '../../api/event/Event';
import DeleteConfirmation from './DeleteConfirmation';
import { Images } from '../../api/image/Image';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const EventCompany = ({ event }) => {
  const { ready, imageSrc } = useTracker(() => {
    const imagesSub = Meteor.subscribe(Images.allImagesPublication);
    const eventsSub = Meteor.subscribe(Events.companyPublicationName);
    const trueUrl = Images.getFileUrlFromId(event.imageId);

    return {
      ready: imagesSub.ready() && eventsSub.ready() && trueUrl,
      imageSrc: trueUrl ?? 'images/sample-image-landscape.png',
    };
  }, []);

  const formatDate = (date) => {
    if (date) {
      const parsedDate = new Date(date);
      if (!Number.isNaN(parsedDate.getTime())) {
        return parsedDate.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric' });
      }
    }
    return 'Invalid Date';
  };

  return (
    <Card className="shadow event-card">
      <Card.Body className="event-body">
        <Card.Img variant="top" src={imageSrc} className="event-image" />
        <Card.Title className="event-name">{event.eventName}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted event-address">{event.address}</Card.Subtitle>
        <Card.Text className="event-description">{event.description}</Card.Text>
        <div className="event-tags">
          {event.tags.map((tag, index) => (
            <Badge variant="light" className="event-tag" key={index}>
              {tag}
            </Badge>
          ))}
        </div>
        <Card.Text className="event-date">
          <span>Event starts at</span>
          {formatDate(event.startDateTime)}
        </Card.Text>
        <Card.Text className="event-date">
          <span>Event ends at</span>
          {formatDate(event.endDateTime)}
        </Card.Text>
        <Link to={`/edit-event/${event._id}`} className="event-edit-link mx-1">
          <Button variant="dark" size="sm">
            Edit
          </Button>
        </Link>
        <Link to={`/event/${event._id}`} className="event-edit-link">
          <Button variant="secondary" size="sm">
            View
          </Button>
        </Link>
        <DeleteConfirmation collection={Events} document={event} />
      </Card.Body>
    </Card>
  );
};

// Require a document to be passed to this component.
EventCompany.propTypes = {
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
    _id: PropTypes.string,
  }).isRequired,
};

export default EventCompany;
