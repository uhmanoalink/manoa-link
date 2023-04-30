import React from 'react';
import { Card, Container, Col, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import HelpButton from '../components/HelpButton';
import Sidebar from '../components/Sidebar';
import { Listings } from '../../api/listing/Listing';
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
              <Col xs={12} md={4} key={index}>
                <Card className="justify-content-center" id="listing-card">
                  <Card.Img id="listing-card-image" variant="top" src={listing.imageId} />
                  <Card.Title id="listing-card-title">{listing.title}</Card.Title>
                  <Card.Text id="listing-card-text">Company: {listing.companyId}</Card.Text>
                  <Card.Text id="listing-card-text">{listing.description}</Card.Text>
                  <Card.Link id="listing-card-link" to={listing.website}><button type="submit" className="visit-button">More Info</button></Card.Link>
                </Card>
              </Col>
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
