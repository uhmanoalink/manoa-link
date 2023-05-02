import React, { useState } from 'react';
import { Container, Button, Card, Dropdown } from 'react-bootstrap';
import { Bookmark, BookmarkDash, Calendar, ThreeDots } from 'react-bootstrap-icons';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import HelpButton from '../components/HelpButton';
import Company from '../components/Company';
import AddToCalendarDropdown from '../components/AddToCalendarDropdown';
import { Companies } from '../../api/company/Company';
import { Listings } from '../../api/listing/Listing';
import { Students } from '../../api/student/Student';

const StudentDashboard = () => {
  const [activeFeed, setActiveFeed] = useState('events');

  const sampleInterestingCompanies = [0, 1];

  const sampleEventData = [
    {
      id: 0,
      eventName: 'Tech Talk',
      description: 'A talk with professionals.',
      imagePath: '/images/sample-pfp.png',
      startDateTime: new Date('2023-04-16T18:00:00'),
      endDateTime: new Date('2023-04-16T20:00:00'),
      location: 'Campus Ballroom',
      hostedBy: 'ACM Club',
    },
  ];

  const sampleCompanyData = {
    0: {
      companyName: 'UH Manoa',
      companyPage: 'https://www.ics.hawaii.edu/',
      address: '2500 Campus Rd, Honolulu, HI 96822',
      description: 'The University of Hawaiʻi at Mānoa is a public land-grant research university in Mānoa, a neighborhood of Honolulu, Hawaii. It is the flagship campus of the University of Hawaiʻi system and houses the main offices of the system.',
      image: '/images/sample-pfp.png',
      tag: '',
      owner: '',
      _id: '0',
    },
    1: {
      companyName: 'UH Manoa 1',
      companyPage: 'https://www.ics.hawaii.edu/',
      address: '2500 Campus Rd, Honolulu, HI 96822',
      description: 'The University of Hawaiʻi at Mānoa is a public land-grant research university in Mānoa, a neighborhood of Honolulu, Hawaii. It is the flagship campus of the University of Hawaiʻi system and houses the main offices of the system.',
      image: '/images/sample-pfp.png',
      tag: '',
      owner: '',
      _id: '1',
    },
    2: {
      companyName: 'UH Manoa 2',
      companyPage: 'https://www.ics.hawaii.edu/',
      address: '2500 Campus Rd, Honolulu, HI 96822',
      description: 'The University of Hawaiʻi at Mānoa is a public land-grant research university in Mānoa, a neighborhood of Honolulu, Hawaii. It is the flagship campus of the University of Hawaiʻi system and houses the main offices of the system.',
      image: '/images/sample-pfp.png',
      tag: '',
      owner: '',
      _id: '2',
    },
  };

  const { ready, companies, listings } = useTracker(() => {
    const companiesSub = Meteor.subscribe(Companies.studentPublicationName);
    const listingsSub = Meteor.subscribe(Listings.studentPublicationName);
    const rdy = companiesSub.ready() && listingsSub.ready();
    const allCompanies = Companies.collection.find({}).fetch();
    return {
      companiesReady: rdy,
      companies: allCompanies,
    };
  });

  const { jobsReady, listings, student } = useTracker(() => {
    const subscription = Meteor.subscribe(Listings.studentPublicationName);
    const subscription2 = Meteor.subscribe(Students.studentPublicationName);
    const rdy = subscription.ready() && subscription2.ready();
    const allListings = Listings.collection.findOne({ userId: Meteor.userId() });
    const studentDoc = Students.collection.findOne({ userId: Meteor.userId() });
    return {
      ready: rdy,
      companies: allCompanies,
      listings: allListings,
      student: studentDoc,
    };
  });

  console.log(student);

  const convertEmploymentType = (type) => {
    switch (type) {
    case 0: return 'in-person';
    case 1: return 'remote';
    case 2: return 'hybrid';
    default: return 'unknown';
    }
  };

  const convertScheduleType = (type) => {
    switch (type) {
    case 0: return 'full-time';
    case 1: return 'part-time';
    case 2: return 'flexible';
    default: return 'unknown';
    }
  };

  /** @type {(event: React.MouseEvent<HTMLButtonElement>) => void} */
  const handleRemoveJob = (e) => {
    e.preventDefault();
  };

  return (
    <Container id="student-dashboard">
      <main>
        <section id="feed">
          <div className="feed-buttons">
            <button
              onClick={() => setActiveFeed('events')}
              className={`icon-button feed-button ${(activeFeed === 'events') ? 'active' : ''}`}
              type="button"
            >
              <Calendar /> Upcoming Events
            </button>
            <button
              onClick={() => setActiveFeed('jobs')}
              className={`icon-button feed-button ${(activeFeed === 'jobs') ? 'active' : ''}`}
              type="button"
            >
              <Bookmark /> Saved Jobs
            </button>
          </div>
          <div className="feed">
            {(activeFeed === 'events') && (
              <div className="events-feed">
                {sampleEventData.map(({ id, imagePath, eventName, description, startDateTime, endDateTime, location }) => (
                  <Card className="event-card" key={id}>
                    <Card.Img src={imagePath} alt="Event Image" />
                    <Card.Body>
                      <Card.Title>{eventName}</Card.Title>
                      <Card.Text>{description}</Card.Text>
                      <Card.Text>{`${startDateTime.toLocaleDateString()}`}</Card.Text>
                      <Card.Text>{`${startDateTime.toLocaleTimeString()} - ${endDateTime.toLocaleTimeString()}`}</Card.Text>
                      <Card.Text>{location}</Card.Text>
                    </Card.Body>
                    <Card.Footer>
                      <AddToCalendarDropdown
                        eventName={eventName}
                        description={description}
                        location={location}
                        startDateTime={startDateTime}
                        endDateTime={endDateTime}
                      />
                    </Card.Footer>
                  </Card>
                ))}
                {(sampleEventData.length === 0) && (
                  <>
                    <h1 className="section-title">
                      😬 There&apos;s nothing to see...
                    </h1>
                    <h2 className="section-large-text">
                      Follow a company to see their upcoming events!
                    </h2>
                  </>
                )}
              </div>
            )}
            {(activeFeed === 'jobs') && (
              <div className="jobs-feed">
                { student && student.savedListings.map((listingId) => {
                  const listing = Listings.collection.findOne({ _id: listingId });
                  console.log(listing);
                  const { companyId, title, description, imageID, website, location, employmentType, scheduleType, createdAt, startDate } = listing;
                  return (
                    <Card className="job-card" key={companyId}>
                      <Card.Img src={imageID} alt="Company Logo" />
                      <Card.Body>
                        <Card.Title>{title}</Card.Title>
                        <Card.Subtitle>{companyId}</Card.Subtitle>
                        <Card.Text>{description}</Card.Text>
                        <Card.Text>{convertEmploymentType(employmentType).toUpperCase()}</Card.Text>
                        <Card.Text>{convertScheduleType(scheduleType).toUpperCase()}</Card.Text>
                        <Dropdown drop="end">
                          <Dropdown.Toggle>
                            <ThreeDots />
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item
                              href={website}
                              target="_blank"
                            >
                              Go to {companyId}&apos;s Website
                            </Dropdown.Item>
                            {/* <Dropdown.Item
                              onClick={handleRemoveJob}
                            >
                              <BookmarkDash /> Remove
                            </Dropdown.Item> */}
                          </Dropdown.Menu>
                        </Dropdown>
                        <Button className="btn-apply-now">Apply Now!</Button>
                      </Card.Body>
                    </Card>
                  );
                })}
                {listings && (activeFeed === 'jobs') && (listings.length === 0) && (
                  <>
                    <h1 className="section-title">
                      😬 There&apos;s nothing to see...
                    </h1>
                    <h2 className="section-large-text">
                      Save a job listing and it will show up here!
                    </h2>
                  </>
                )}
              </div>
            )}
          </div>
        </section>
        <section id="interesting-companies">
          <h1 className="section-title">Companies you might be interested in:</h1>
          <div className="companies">
            {ready && companies.map((company) => (
              <Company company={company} key={company._id} />
            ))}
          </div>
        </section>
      </main>
      <HelpButton />
    </Container>
  );
};

export default StudentDashboard;
