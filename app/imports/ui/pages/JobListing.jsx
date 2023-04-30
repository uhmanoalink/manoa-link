import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import HelpButton from '../components/HelpButton';
import Sidebar from '../components/Sidebar';
import { Listings } from '../../api/listing/Listing';
import Listing from '../components/Listing';
import LoadingSpinner from '../components/LoadingSpinner';

const JobListing = () => {
  const { ready, listings } = useTracker(() => {
    const subscription = Meteor.subscribe(Listings.studentPublicationName);
    const rdy = subscription.ready();
    const allListings = Listings.collection.find({}).fetch();
    return {
      ready: rdy,
      listings: allListings,
    };
  });

  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={12} md={3}>
          <Sidebar />
        </Col>
        <Col>
          <Row>
            { ready ? (listings.map((listing, index) => (
              <Listing listing={listing} key={index} />
            )))
              : (<LoadingSpinner />) }
          </Row>
        </Col>
      </Row>
      <HelpButton />
    </Container>
  );
};

export default JobListing;
