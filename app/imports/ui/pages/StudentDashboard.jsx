import React from 'react';
import { Container, Col, Image, Row, Button } from 'react-bootstrap';
import Sidebar from '../components/Sidebar';

const sampleUpdates = ['Made texas holdem game', 'Redesigned personal site', 'Wrote basic compiler'];
const samplePeople = ['Winston Co', 'Prayag Das', 'Honggun Jeon', 'Jared Lo'];
const StudentDashboard = () => {
  const updates = sampleUpdates;
  const people = samplePeople;
  const sampleImage = '/images/sample-pfp.png';
  const sampleName = 'John Foo';
  const sampleDescription = 'Fake engineer. Should have taken computer science. Not to be confused with Company Foo.';
  return (
    <Row className="justify-content-center">
      <Col xs={2}>
        <Sidebar />
      </Col>
      <Col xs={2}>
        <Image src={sampleImage} width="200px" />
        <h1>{ sampleName }</h1>
        <p>{ sampleDescription }</p>
      </Col>
      <Col xs={5} className="justify-content-center">
        <div style={{ alignContent: 'center' }}>
          <Container id="bubble">
            <h1>My Dashboard</h1>
            <div>
              <h3>Recent Updates</h3>
              <ul id="fix-list">
                {updates.map((update, index) => (
                  <li key={index}>{update}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3>People You Might Know</h3>
              <ul id="fix-list">
                {people.map((person, index) => (
                  <li key={index}><Button href="#">{person}</Button></li>
                ))}
              </ul>
            </div>
            <div style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
              <Button>Request Help</Button>
            </div>
          </Container>
        </div>
      </Col>
    </Row>
  );
};

export default StudentDashboard;
