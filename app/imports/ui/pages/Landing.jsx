import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
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
    <Container id="landing-page" fluid>
      <div className="landing-page-responsive-container">
        <LandingCarousel />
        <div>
          <h2>Welcome!</h2>
          <SignIn />
        </div>
        {/* <LandingCarousel reverse /> */}
      </div>
    </Container>
  );
};

export default Landing;
