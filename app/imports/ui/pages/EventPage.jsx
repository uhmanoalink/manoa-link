import React from 'react';
import { Col, Container, Row, Image, Badge, Card } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { useParams } from 'react-router';
import { Events } from '../../api/event/Event';
import LoadingSpinner from '../components/LoadingSpinner';
import { Images } from '../../api/image/Image';

const EventPage = () => {
  const { _id } = useParams();
  const { doc, ready } = useTracker(() => {
    const subscription = Meteor.subscribe(Events.adminPublicationName);
    const subscription2 = Meteor.subscribe(Events.companyPublicationName);
    const subscription3 = Meteor.subscribe(Events.studentPublicationName);
    const imagesSub = Meteor.subscribe(Images.allImagesPublication);
    const rdy = subscription.ready() && subscription2.ready() && subscription3.ready() && imagesSub.ready();
    const event = Events.collection.findOne(_id);
    return {
      doc: event,
      ready: rdy,
    };
  }, [_id]);

  return ready ? (
    <Container className="event-page">
      <Row className="justify-content-md-center event-page-main-row">
        <Col xs={12} md={8}>
          <Card.Img variant="top" src={(doc.imageId === 'noId') ? 'images/sample-image-landscape.png' : Images.getFileUrlFromId(doc.imageId)} className="event-image" class="img-fluid rounded mx-auto d-block" />
          <h1 className="event-page-title">{doc.eventName}</h1>
          <div className="event-page-info">
            <p className="event-page-address"><strong>Address:</strong> {doc.address}</p>
            <p className="event-page-date"><strong>Date:</strong> {doc.startDateTime.toString()}</p>
            <div className="event-page-tags mb-3">
              {doc.tags.map((tag, index) => (
                <Badge variant="black" className="event-page-tag mr-2 mx-1" key={index}>{tag}</Badge>
              ))}
            </div>
            <p className="event-page-description"><strong>Description:</strong><br />{doc.description}</p>
          </div>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default EventPage;
