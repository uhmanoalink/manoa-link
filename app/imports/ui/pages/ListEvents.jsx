import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row, Form, Button } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../components/LoadingSpinner';
import Event from '../components/Event';
import { Events } from '../../api/event/Event';

/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const ListEvents = () => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, events } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Events documents.
    const subscription = Meteor.subscribe(Events.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Event documents
    let eventItems = Events.collection.find({}).fetch();
    if (selectedTags.length > 0) {
      eventItems = eventItems.filter(event => selectedTags.some(tag => event.tags.includes(tag)));
    }
    return {
      events: eventItems,
      ready: rdy,
    };
  }, [selectedTags]);

  const handleTagChange = (event) => {
    const tag = event.target.value;
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleTagClick = (tag) => {
    if (tag === 'All') {
      setSelectedTags([]);
    } else if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
    } else {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    }
  };

  const handleClearFilter = () => {
    setSelectedTags([]);
  };

  const tags = ['Computer Science', 'Cyber security', 'Web Development', 'Data Science', 'Business Administration',
    'Marketing', 'Accounting', 'Finance', 'Entrepreneurship', 'Biology', 'Chemistry',
    'Physics', 'Environmental Science', 'Geology', 'Psychology', 'Sociology', 'Political Science',
    'Economics', 'Anthropology', 'English', 'History', 'Philosophy', 'Religious Studies', 'Classics',
    'Fine Arts', 'Music', 'Theater', 'Film', 'Creative Writing', 'Nursing', 'Pre-Med', 'Public Health',
    'Health Sciences', 'Physical Therapy', 'Linguistics', 'Journalism', 'Advertising', 'Public Relations',
    'Communication Studies', 'Law', 'Criminal Justice', 'Paralegal Studies', 'Political Science', 'Sociology',
    'International Relations', 'Global Studies', 'Foreign Languages', 'Engineering'];

  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col>
          <Col className="text-center">
            <h2>List Events</h2>
          </Col>
          <Row>
            <Col>
              <div className="d-flex align-items-center">
                <Button className="btn btn-secondary mr-2" onClick={() => setShowFilter(!showFilter)}>
                  Filter by tags
                </Button>
                {selectedTags.length > 0 && (
                  <Button className="btn btn-outline-secondary" onClick={handleClearFilter}>
                    Clear filter
                  </Button>
                )}
              </div>
              {showFilter && (
                <div className="mt-2" style={{ height: '250px', overflow: 'scroll' }}>
                  {tags.map(tag => (
                    <div key={tag} className={`form-check ${selectedTags.includes(tag) ? 'active' : ''}`}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value={tag}
                        checked={selectedTags.includes(tag)}
                        onChange={() => handleTagClick(tag)}
                      />
                      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                      <label className="form-check-label">{tag}</label>
                    </div>
                  ))}
                </div>
              )}
            </Col>
          </Row>
          <Row xs={1} md={2} lg={3} className="g-4">
            {ready ? (events.map((event) => (<Col key={event._id}><Event event={event} /></Col>))
            ) : (
              <LoadingSpinner />
            )}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default ListEvents;
