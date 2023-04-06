import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { useNavigate } from 'react-router';
import SignIn from '../components/SignIn';
import LandingCarousel from '../components/LandingCarousel';

/* A simple static component to render some text for the landing page. */
const Landing = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isLogged = Meteor.userId() !== null;
    if (isLogged) {
      navigate('/home');
    }
  }, []);

  return (
    <Container id="landing-page" fluid className="py-3">
      <Row className="align-middle text-center">
        <Col xs={7}>
          <LandingCarousel />
        </Col>

        <Col xs={5}>
          <SignIn />
        </Col>
      </Row>
    </Container>
  );
};

export default Landing;
