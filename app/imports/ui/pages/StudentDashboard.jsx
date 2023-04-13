import React from 'react';
import { Col, Row, Button } from 'react-bootstrap';
import Sidebar from '../components/Sidebar';

const sampleUpdates = ['Made texas holdem game', 'Redesigned personal site', 'Wrote basic compiler'];
const samplePeople = ['Winston Co', 'Prayag Das', 'Honggun Jeon', 'Jared Lo'];
const StudentDashboard = () => {
  const updates = sampleUpdates;
  const people = samplePeople;
  return (
    <Row className="justify-content-center">
      <Col xs={3}>
        <Sidebar />
      </Col>
      <Col className="justify-content-center">
        <div style={{ alignContent: 'center' }}>
          <h1>My Dashboard</h1>
          <div>
            <h3>Recent Updates</h3>
            <ul>
              {updates.map((update, index) => (
                <li key={index}>{update}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>People You Might Know</h3>
            <ul>
              {people.map((person, index) => (
                <li key={index}><Button href="#">{person}</Button></li>
              ))}
            </ul>
          </div>
          <div style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
            <Button>Request Help</Button>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default StudentDashboard;
