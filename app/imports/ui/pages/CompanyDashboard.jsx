import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Col, Container, Row, Badge } from 'react-bootstrap';
// import Sidebar from '../components/Sidebar';
import HelpButton from '../components/HelpButton';
import { Events } from '../../api/event/Event';
import { Positions } from '../../api/position/Position';

/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const CompanyDashboard = () => {

  const { events, listings } = useTracker(() => {
    const eventsSub = Meteor.subscribe(Events.companyPublicationName);
    const listingsSub = Meteor.subscribe(Positions.companyPublicationName);
    // Determine if the subscription is ready
    const rdy = eventsSub.ready() && listingsSub.ready();

    const eventItems = Events.collection.find({}).fetch();
    const listingItems = Positions.collection.find({}).fetch();

    return {
      events: eventItems,
      listings: listingItems,
      ready: rdy,
    };
  }, []);

  const sampleEvents = (events.length > 0) ? events : [
    {
      eventName: 'This is a sample event',
      image: '/images/sample-image-landscape.png',
      createdAt: 'April 13, 2023',
    },
    {
      name: 'This is another sample event',
      image: '/images/sample-image-landscape.png',
      createdAt: 'April 15, 2023',
    },
    {
      name: 'This is a final sample event',
      image: '/images/sample-image-landscape.png',
      createdAt: 'April 17, 2023',
    },
  ];

  /*
  eventName: String,
  companyId: String,
  address: String,
  description: String,
  image: String,
  tags: Array,
  'tags.$': String,
  createdAt: Date,
  owner: String,
  */

  return (
    <Container id="company-dashboard" className="py-3">
      <Row className="justify-content-center">
        {/* <Col xs={3}>
          <Sidebar />
        </Col> */}
        <Col>
          <main>
            <section id="upcoming-events">
              <h2>Upcoming Events</h2>
              <div className="events">
                {sampleEvents.map(({ eventName, image, createdAt }, index) => (
                  <div key={index} className="event">
                    <h3 className="event-name">{eventName}</h3>
                    <img src={image} alt="sample" />
                    <h4 className="event-date">{createdAt}</h4>
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
