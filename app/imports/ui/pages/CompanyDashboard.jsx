import React from 'react';
import { Col, Container, Row, Badge } from 'react-bootstrap';
import Sidebar from '../components/Sidebar';
import HelpButton from '../components/HelpButton';

/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const CompanyDashboard = () => {

  const sampleEvents = [
    {
      name: 'This is a sample event',
      image: '/images/sample-image-landscape.png',
      date: 'April 13, 2023',
    },
    {
      name: 'This is another sample event',
      image: '/images/sample-image-landscape.png',
      date: 'April 15, 2023',
    },
    {
      name: 'This is a final sample event',
      image: '/images/sample-image-landscape.png',
      date: 'April 17, 2023',
    },
  ];

  return (
    <Container id="company-dashboard" className="py-3">
      <Row className="justify-content-center">
        <Col xs={3}>
          <Sidebar />
        </Col>
        <Col>
          <main>
            <section id="upcoming-events">
              <h2>Upcoming Events</h2>
              <div className="events">
                {sampleEvents.map(({ name, image, date }, index) => (
                  <div key={index} className="event">
                    <h3 className="event-name">{name}</h3>
                    <img src={image} alt="sample" />
                    <h4 className="event-date">{date}</h4>
                  </div>
                ))}
              </div>
            </section>
            <section id="listings">
              <h2>Listings</h2>
              <hr />
              <div className="listing-group">
                <h3>Software engineering</h3>
                <hr />
                <div className="listing">
                  <a href="/" className="listing-name">
                    Summer Web Developer Internship
                  </a>
                  <Badge>Num. Applicants: 400</Badge>
                </div>
                <div className="listing">
                  <a href="/" className="listing-name">
                    Summer DevOps Internship
                  </a>
                  <Badge>Num. Applicants: 300</Badge>
                </div>
              </div>
              <div className="listing-group">
                <h3>Human Resources</h3>
                <hr />
                <div className="listing">
                  <a href="/" className="listing-name">
                    Summer HR Internship
                  </a>
                  <Badge>Num. Applicants: 100</Badge>
                </div>
              </div>
            </section>
            <section id="calendar">
              <h2>A calendar widget</h2>
            </section>
          </main>
        </Col>
      </Row>
      <HelpButton />
    </Container>
  );
};

export default CompanyDashboard;
