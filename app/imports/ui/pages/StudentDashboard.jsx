import React, { useState } from 'react';
import { Container, Button, Card, Dropdown } from 'react-bootstrap';
import { Bookmark, BookmarkDash, Calendar, CalendarEvent, ThreeDots } from 'react-bootstrap-icons';
import HelpButton from '../components/HelpButton';

const StudentDashboard = () => {
  const [activeFeed, setActiveFeed] = useState('events');

  const sampleInterestingCompanies = [0, 1];

  const sampleEventData = [
    // {
    //   id: 0,
    //   eventName: 'Tech Talk',
    //   description: 'A talk with professionals.',
    //   imagePath: '/images/sample-pfp.png',
    //   startDateTime: new Date('2023-04-16T18:00:00'),
    //   endDateTime: new Date('2023-04-16T20:00:00'),
    //   location: 'Campus Ballroom',
    //   hostedBy: 'ACM Club',
    // },
  ];

  const sampleJobData = [
    {
      id: 0,
      companyId: 0,
      jobTitle: 'React Developer',
      description: 'Work on the UH websites.',
      employmentType: 1, // 0 = in-person, 1 = remote, 2 = hybrid
      scheduleType: 0, // 0 = full-time, 1 = part-time, 2 = flexible
      location: 'Campus Ballroom',
    },
  ];

  const sampleCompanyData = {
    0: {
      companyName: 'UH Manoa',
      companyLogo: '/images/sample-pfp.png',
      companyPage: 'https://www.ics.hawaii.edu/',
    },
    1: {
      companyName: 'UH Manoa 1',
      companyLogo: '/images/sample-pfp.png',
      companyPage: 'https://www.ics.hawaii.edu/',
    },
    2: {
      companyName: 'UH Manoa 2',
      companyLogo: '/images/sample-pfp.png',
      companyPage: 'https://www.ics.hawaii.edu/',
    },
  };

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
    console.log('Clicked remove job');
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
            <div className="cards">
              {(activeFeed === 'events') && (
                sampleEventData.map(({ id, imagePath, eventName, description, startDateTime, endDateTime, location }) => (
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
                      <Dropdown className="btn-add-to-cal">
                        <Dropdown.Toggle className="icon-button">
                          <CalendarEvent /> Add to Calendar
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item
                            target="_blank"
                            href={'https://www.google.com/calendar/render?action=TEMPLATE&' +
                              `text=${eventName}&` +
                              `details=${description}&` +
                              `location=${location}&` +
                              `dates=${startDateTime.toISOString().replaceAll(/[-,:]/g, '').split('.')[0]}Z` +
                              `%2F${endDateTime.toISOString().replaceAll(/[-,:]/g, '').split('.')[0]}Z`}
                          >
                            <img width={18} src="/assets/google-calendar-icon.svg" alt="Google Calendar Icon" /> Google Calendar
                          </Dropdown.Item>
                          <Dropdown.Item
                            target="_blank"
                            href={'https://outlook.live.com/calendar/0/deeplink/compose?allday=false&path=%2Fcalendar%2Faction%2Fcompose&rru=addevent&' +
                              `subject=${eventName}&` +
                              `body=${description}&` +
                              `location=${location}&` +
                              `startdt=${startDateTime.toISOString()}&` +
                              `enddt=${endDateTime.toISOString()}&`}
                          >
                            <img width={18} src="/assets/microsoft-office-outlook-icon.svg" alt="Microsoft Outlook Icon" /> Microsoft Outlook
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </Card.Footer>
                  </Card>
                ))
              )}
              {(activeFeed === 'events') && (sampleEventData.length === 0) && (
                <>
                  <h1 className="section-title">
                    😬 There&apos;s nothing to see...
                  </h1>
                  <h2 className="section-large-text">
                    Follow a company to see their upcoming events!
                  </h2>
                </>
              )}
              {(activeFeed === 'jobs') && (
                sampleJobData.map(({ id, companyId, jobTitle, description, employmentType, scheduleType }) => {
                  const { companyName, companyLogo, companyPage } = sampleCompanyData[companyId];
                  return (
                    <Card className="job-card" key={id}>
                      <Card.Img src={companyLogo} alt="Company Logo" />
                      <Card.Body>
                        <Card.Title>{jobTitle}</Card.Title>
                        <Card.Subtitle>{companyName}</Card.Subtitle>
                        <Card.Text>{description}</Card.Text>
                        <Card.Text>{convertEmploymentType(employmentType).toUpperCase()}</Card.Text>
                        <Card.Text>{convertScheduleType(scheduleType).toUpperCase()}</Card.Text>
                        <Dropdown drop="end">
                          <Dropdown.Toggle>
                            <ThreeDots />
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item
                              href={companyPage}
                              target="_blank"
                            >
                              Go to {companyName}&apos;s Website
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={handleRemoveJob}
                            >
                              <BookmarkDash /> Remove
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                        <Button className="btn-apply-now">Apply Now!</Button>
                      </Card.Body>
                    </Card>
                  );
                })
              )}
              {(activeFeed === 'jobs') && (sampleJobData.length === 0) && (
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
          </div>
        </section>
        <section id="people">
          <h1 className="section-title">Companies you might be interested in:</h1>
          {sampleInterestingCompanies.map((id) => (
            <h2 key={id} className="section-large-text">{sampleCompanyData[id].companyName}</h2>
          ))}
        </section>
      </main>
      <HelpButton />
    </Container>
  );
};

export default StudentDashboard;
