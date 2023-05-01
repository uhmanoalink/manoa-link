import React from 'react';
import { Col, Container, Row, Image, Badge } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { useParams } from 'react-router';
import { Events } from '../../api/event/Event';
import LoadingSpinner from '../components/LoadingSpinner';

const EventPage = () => {
  const { _id } = useParams();
  const { doc, ready } = useTracker(() => {
    const subscription = Meteor.subscribe(Events.adminPublicationName);
    const subscription2 = Meteor.subscribe(Events.companyPublicationName);
    const subscription3 = Meteor.subscribe(Events.studentPublicationName);
    const rdy = subscription.ready() && subscription2.ready() && subscription3.ready();
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
          <h1 className="event-page-title">{doc.eventName}</h1>
          <Image src={doc.imageId} fluid className="event-page-image mb-4" />
          <div className="event-page-info">
            <p className="event-page-address"><strong>Address:</strong> {doc.address}</p>
            <p className="event-page-date"><strong>Date:</strong> {doc.eventAt.toString()}</p>
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
