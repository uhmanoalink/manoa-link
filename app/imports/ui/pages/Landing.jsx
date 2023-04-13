import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { Meteor } from "meteor/meteor";
import { useNavigate } from "react-router";
import SignIn from "../components/SignIn";
import LandingCarousel from "../components/LandingCarousel";

/* A simple static component to render some text for the landing page. */
const Landing = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isLogged = Meteor.userId() !== null;
    if (isLogged) {
      navigate("/home");
    }
  }, []);

  return (
    <div id="landing-page" fluid>
      <div className="landing-page-responsive-container">
        <LandingCarousel />
        <div>
          <h2>Welcome!</h2>
          <SignIn />
        </div>
      </div>
      <section id="tagline">
        <h2>
          Company-to-student networking <strong>made easy!</strong>
        </h2>
        <div className="img-container">
          <img src="/images/networking.jpg" alt="networking" />
          <small>
            <a href="https://www.freepik.com/free-vector/successful-partnership-negotiation-partners-handshaking_11669283.htm#query=vectorjuice%20networking&position=13&from_view=search&track=robertav1_2_sidr">
              Image by vectorjuice
            </a>{" "}
            on Freepik
          </small>
        </div>
      </section>
      <section id="interface-features">
        <h2>Streamlined Student interface</h2>
        <div className="features">
          <div className="feature">
            <h2>Never miss upcoming events</h2>
            <p>
              Manoa Link showcases a variety of events, including job fairs,
              workshops, and networking sessions, giving students the chance to
              connect with companies and industry professionals.
            </p>
          </div>
          <div className="feature">
            <h2>Notification management</h2>
            <p>
              Manoa Link’s notification system keeps users informed about
              important updates, such as new events, job openings, or changes to
              saved listings. This feature helps users stay engaged and
              up-to-date with the latest opportunities.
            </p>
          </div>
          <div className="feature">
            <h2>Comprehensive company listings</h2>
            <p>
              Students can browse through a wide range of company listings,
              filter them by tags, and save their favorite companies for future
              reference.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
