import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row, Button } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import Select from 'react-select';
import LoadingSpinner from '../components/LoadingSpinner';
import Event from '../components/Event';
import { Events } from '../../api/event/Event';
import PastEvent from '../components/PastEvent';

const MainEventsPage = () => {
  const [selectedTags, setSelectedTags] = useState([]);
  const { ready, upcomingEvents, pastEvents } = useTracker(() => {
    const subscription = Meteor.subscribe(Events.studentPublicationName);
    const subscription2 = Meteor.subscribe(Events.adminPublicationName);
    const rdy = subscription.ready() && subscription2.ready();
    let allEvents = Events.collection.find({}).fetch();
    const upcoming = [];
    const past = [];
    if (selectedTags.length > 0) {
      const selectedTagValues = selectedTags.map(tag => tag.value);
      allEvents = allEvents.filter(event => selectedTagValues.some(tag => event.tags.includes(tag)));
    }
    allEvents.forEach(event => {
      if (new Date(event.eventAt) > new Date()) {
        upcoming.push(event);
      } else {
        past.push(event);
      }
    });
    upcoming.sort((a, b) => a.eventAt - b.eventAt);
    past.sort();
    return {
      upcomingEvents: upcoming,
      pastEvents: past,
      ready: rdy,
    };
  }, [selectedTags]);
  const handleClearFilter = () => {
    setSelectedTags([]);
  };

  const tags = [
    'Computer Science', 'Cyber security', 'Web Development', 'Data Science', 'Business Administration',
    'Marketing', 'Accounting', 'Finance', 'Entrepreneurship', 'Biology', 'Chemistry',
    'Physics', 'Environmental Science', 'Geology', 'Psychology', 'Sociology', 'Political Science',
    'Economics', 'Anthropology', 'English', 'History', 'Philosophy', 'Religious Studies', 'Classics',
    'Fine Arts', 'Music', 'Theater', 'Film', 'Creative Writing', 'Nursing', 'Pre-Med', 'Public Health',
    'Health Sciences', 'Physical Therapy', 'Linguistics', 'Journalism', 'Advertising', 'Public Relations',
    'Communication Studies', 'Law', 'Criminal Justice', 'Paralegal Studies', 'Political Science', 'Sociology',
    'International Relations', 'Global Studies', 'Foreign Languages', 'Engineering',
  ].sort().map(tag => ({ label: tag, value: tag }));

  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col>
          <Row>
            <Col>
              <div className="d-flex justify-content-center">
                <Select
                  className="align-content-center mb-3 customSelectWidth"
                  value={selectedTags}
                  options={tags}
                  onChange={(selected) => setSelectedTags(selected)}
                  isMulti
                  placeholder="Filter by tags..."
                  id="filter-button"
                />
                {selectedTags.length > 0 && (
                  <Button className="btn btn-clear-filter" onClick={handleClearFilter}>
                    &times;
                  </Button>
                )}
              </div>
            </Col>
          </Row>
          <Row className="g-4">
            <Col xs={12} md={8} id="upcoming-event">
              <h3 className="text-center">Upcoming Events</h3>
              <Row xs={1} md={2} lg={2} className="g-4">
                {ready ? (upcomingEvents.map((event) => (<Col key={event._id}><Event event={event} /></Col>))
                ) : (
                  <LoadingSpinner />
                )}
              </Row>
            </Col>
            <Col xs={12} md={4} id="past-event">
              <h3 className="text-center">Past Events</h3>
              <div className="custom-scroll mt-2" style={{ height: '1000px', paddingLeft: '30px', paddingRight: '30px' }}>
                <Row xs={1} md={1} lg={1} className="g-4">
                  {ready ? (pastEvents.map((event) => (<Col key={event._id}><PastEvent event={event} /></Col>))) : (
                    <LoadingSpinner />
                  )}
                </Row>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default MainEventsPage;
