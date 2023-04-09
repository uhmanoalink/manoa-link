import React from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';

/* A simple static component to render some text for the landing page. */
const Landing = () => {
  const isLogged = Meteor.userId() !== null;
  return (
    <Container id="landing-page" fluid className="py-3">
      <Row className="align-middle text-center">
        <Col xs={8} className="d-flex flex-column justify-content-center">
          <h1>Welcome to Manoa-Link!</h1>
          {isLogged ? <p /> : <p>Sign in or sign up to get connected with hirers and recruiters in your area.</p>}
        </Col>

        <Col xs={4}>
          <Image roundedCircle src="/images/meteor-logo.png" width="150px" />
        </Col>
      </Row>
    </Container>
  );
};

export default Landing;
