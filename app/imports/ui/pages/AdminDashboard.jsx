import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Button, Container } from 'react-bootstrap';
import { ArrowsCollapse, ArrowsExpand, FilterLeft } from 'react-bootstrap-icons';
import LoadingSpinner from '../components/LoadingSpinner';
import EventAdmin from '../components/EventAdmin';
import { Events } from '../../api/event/Event';
import StudentAdmin from '../components/StudentAdmin';
import { Students } from '../../api/student/Student';
import CompanyAdmin from '../components/CompanyAdmin';
import { Companies } from '../../api/company/Company';
import { Listings } from '../../api/listing/Listing';
import Listing from '../components/Listing';
import { Images } from '../../api/image/Image';

const AdminDashboard = () => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  // students, companies, events, listings
  const [minimizedTabs, setMinimizedTabs] = useState([false, false, false, false]);

  const { ready, students, companies, events, listings } = useTracker(() => {
    const eventsSub = Meteor.subscribe(Events.adminPublicationName);
    const studentsSub = Meteor.subscribe(Students.adminPublicationName);
    const companiesSub = Meteor.subscribe(Companies.adminPublicationName);
    const listingsSub = Meteor.subscribe(Listings.studentPublicationName);
    const imagesSub = Meteor.subscribe(Images.allImagesPublication);

    // Determine if the subscription is ready
    const rdy = eventsSub.ready() && studentsSub.ready() && companiesSub.ready() && listingsSub.ready() && imagesSub.ready();

    const studentItems = Students.collection.find({}).fetch();
    const companyItems = Companies.collection.find({}).fetch();
    const eventItems = Events.collection.find({}).fetch();
    const listingItems = Listings.collection.find({}).fetch();

    setMinimizedTabs([
      Students.collection.find({}).count() === 0,
      Companies.collection.find({}).count() === 0,
      Events.collection.find({}).count() === 0,
      Listings.collection.find({}).count() === 0,
    ]);
    return {
      events: eventItems,
      students: studentItems,
      companies: companyItems,
      listings: listingItems,
      ready: rdy,
    };
  }, []);

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

  const genCollapseButton = (index) => (
    <button
      type="button"
      className="min-max-button"
      onClick={() => setMinimizedTabs(minimizedTabs.map((_, i) => ((i === index) ?
        !minimizedTabs[i] : minimizedTabs[i])))}
    >
      {minimizedTabs[index]
        ? <ArrowsExpand />
        : <ArrowsCollapse /> }
    </button>
  );

  let filteredEvents = events;
  if (selectedTags.length > 0) {
    filteredEvents = events.filter(event => selectedTags.some(tag => event.tags.includes(tag)));
  }

  const tags = ['Computer Science', 'Cyber security', 'Web Development', 'Data Science', 'Business Administration',
    'Marketing', 'Accounting', 'Finance', 'Entrepreneurship', 'Biology', 'Chemistry', 'Physics',
    'Environmental Science', 'Geology', 'Psychology', 'Economics', 'Anthropology', 'English', 'History',
    'Philosophy', 'Religious Studies', 'Classics', 'Fine Arts', 'Music', 'Theater', 'Film', 'Creative Writing',
    'Nursing', 'Pre-Med', 'Public Health', 'Health Sciences', 'Physical Therapy', 'Linguistics', 'Journalism',
    'Advertising', 'Public Relations', 'Communication Studies', 'Law', 'Criminal Justice', 'Paralegal Studies',
    'Political Science', 'Sociology', 'International Relations', 'Global Studies', 'Foreign Languages', 'Engineering'].sort();

  return (
    <Container id="admin-dashboard" fluid>
      <main>
        <section id="students">
          {genCollapseButton(0)}
          <h2>Students</h2>
          <div className={`collapsible ${minimizedTabs[0] ? 'collapsed' : ''}`}>
            {ready ? (
              <div className="cards">
                {students.map((student) => <StudentAdmin student={student} />)}
              </div>
            ) : <LoadingSpinner />}
          </div>
        </section>
        <section id="companies">
          {genCollapseButton(1)}
          <h2>Companies</h2>
          <div className={`collapsible ${minimizedTabs[1] ? 'collapsed' : ''}`}>
            {ready ? (
              <div className="cards">
                {companies.map((company) => <CompanyAdmin company={company} key={company._id} />)}
              </div>
            ) : <LoadingSpinner />}
          </div>
        </section>
        <section id="events">
          {genCollapseButton(2)}
          <h2>Events</h2>
          <div className={`collapsible ${minimizedTabs[2] ? 'collapsed' : ''}`}>
            {ready ? (
              <>
                {!minimizedTabs[2] && (
                  <>
                    <Button variant="secondary" onClick={() => setShowFilter(!showFilter)}>
                      <FilterLeft /> Filter by tags
                    </Button>
                    {selectedTags.length > 0 && (
                      <Button variant="outline-secondary" className="ms-2" onClick={handleClearFilter}>
                        Clear filter
                      </Button>
                    )}
                    {showFilter && (
                      <div className="taglist mt-1">
                        {tags.map(tag => (
                          <div key={tag} className={`tag form-check ${selectedTags.includes(tag) ? 'active' : ''}`}>
                            <input
                              id={`events-tag-input-${tag.toLowerCase().replace(/ /g, '-')}`}
                              className="form-check-input"
                              type="checkbox"
                              value={tag}
                              checked={selectedTags.includes(tag)}
                              onChange={() => handleTagClick(tag)}
                            />
                            <label htmlFor={`events-tag-input-${tag.toLowerCase().replace(/ /g, '-')}`} className="form-check-label">{tag}</label>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}

                <div className="cards">
                  {filteredEvents.map((event) => (<EventAdmin key={event._id} event={event} />))}
                </div>
              </>
            ) : <LoadingSpinner />}
          </div>
        </section>
        <section id="listings">
          {genCollapseButton(3)}
          <h2>Listings</h2>
          <div className={`collapsible ${minimizedTabs[3] ? 'collapsed' : ''}`}>
            {ready ? (
              <div className="cards">
                {listings.map((listing) => <Listing listing={listing} key={listing._id} />)}
              </div>
            ) : <LoadingSpinner />}
          </div>
        </section>
      </main>
    </Container>
  );
};

export default AdminDashboard;
