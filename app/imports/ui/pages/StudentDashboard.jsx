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
import { Events } from '../../api/event/Event';
import { Students } from '../../api/student/Student';
import { Images } from '../../api/image/Image';

const StudentDashboard = () => {
  function addHttpAndWww(url) {
    console.log(url);
    let newUrl = url;
    if (!url.startsWith('http') && !url.startsWith('https')) {
      newUrl = `https://${newUrl}`;
    }
    const hostname = new URL(newUrl).hostname;
    if (!hostname.startsWith('www.')) {
      newUrl = `https://www.${hostname}`;
    }
    return newUrl;
  }

  const [activeFeed, setActiveFeed] = useState('events');

  const { ready, student, interestingCompanies, upcomingEvents, savedListings } = useTracker(() => {
    const imagesSub = Meteor.subscribe(Images.allImagesPublication);
    const studentsSub = Meteor.subscribe(Students.studentPublicationName);
    const companiesSub = Meteor.subscribe(Companies.studentPublicationName);
    const listingsSub = Meteor.subscribe(Listings.studentPublicationName);
    const eventsSub = Meteor.subscribe(Events.studentPublicationName);

    const rdy = imagesSub.ready() && studentsSub.ready() && companiesSub.ready() && listingsSub.ready() && eventsSub.ready();

    const studentDoc = Students.collection.findOne({ userId: Meteor.userId() });

    let followedCompanyIds;
    let upcomingEventsItems;
    if (studentDoc) {
      const followedCompanies = Companies.collection.find({ _id: { $in: studentDoc.followedCompanies } }).fetch();
      followedCompanyIds = followedCompanies.map(company => company._id);
      if (followedCompanyIds) {
        const upcomingEventsItemsId = Events.collection.find({ companyId: { $in: followedCompanyIds } }, { fields: { _id: 1 } }).fetch();
        const savedEvents = studentDoc.savedEvents;
        const unionEventIds = [...new Set([...upcomingEventsItemsId, ...savedEvents])];
        upcomingEventsItems = Events.collection.find({ _id: { $in: unionEventIds } })
          .fetch().sort(({ startDateTime: startA }, { startDateTime: startB }) => startA - startB);
      }
    }

    let savedListingsItems;
    if (studentDoc) {
      savedListingsItems = Listings.collection.find({ _id: { $in: studentDoc.savedListings } }).fetch();
    }

    let companiesNotFollowed;
    if (followedCompanyIds) {
      companiesNotFollowed = Companies.collection.find({ _id: { $nin: followedCompanyIds } }).fetch();
    }

    return {
      ready: rdy,
      student: studentDoc,
      interestingCompanies: companiesNotFollowed,
      upcomingEvents: upcomingEventsItems,
      savedListings: savedListingsItems,
    };
  });

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
                {upcomingEvents && upcomingEvents.map(({ _id, imageId, eventName, description, startDateTime, endDateTime, address }) => {
                  const imagePath = Images.getFileUrlFromId(imageId);

                  return (
                    <Card className="event-card" key={_id}>
                      <Card.Img src={imagePath} alt="Event Image" />
                      <Card.Body>
                        <Card.Title>{eventName}</Card.Title>
                        <Card.Text>{description}</Card.Text>
                        <Card.Text>{`${startDateTime.toLocaleDateString()}`}</Card.Text>
                        <Card.Text>{`${startDateTime.toLocaleTimeString()} - ${endDateTime.toLocaleTimeString()}`}</Card.Text>
                        <Card.Text>{address}</Card.Text>
                      </Card.Body>
                      <Card.Footer>
                        <AddToCalendarDropdown
                          eventName={eventName}
                          description={description}
                          location={address}
                          startDateTime={startDateTime}
                          endDateTime={endDateTime}
                        />
                      </Card.Footer>
                    </Card>
                  );
                })}
                {(upcomingEvents && upcomingEvents.length === 0) && (
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
                { savedListings && savedListings.map((listing) => {
                  const defaultImage = "images/sample-image-landscape.png";
                  const { companyId, title, description, imageId, website, location, employmentType, scheduleType, createdAt, startDate } = listing;
                  const imagePath = (imageId !== "noId") ? Images.getFileUrlFromId(imageId) : defaultImage;
                  return (
                    <Card className="job-card" key={companyId}>
                      <Card.Img src={imagePath} alt="Company Logo" />
                      <Card.Body>
                        <Card.Title>{title}</Card.Title>
                        <Card.Subtitle>{Companies.collection.findOne({userId: companyId}).name}</Card.Subtitle>
                        <Card.Text>{description}</Card.Text>
                        <Card.Text>{employmentType.toUpperCase()}</Card.Text>
                        <Card.Text>{scheduleType.toUpperCase()}</Card.Text>
                        <Dropdown drop="end">
                          <Dropdown.Toggle>
                            <ThreeDots />
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item
                              href={addHttpAndWww(website)}
                              target="_blank"
                            >
                              Go to {website}&apos;s Website
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
                })}
                {(activeFeed === 'jobs') && savedListings && (savedListings.length === 0) && (
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
            {ready && interestingCompanies && interestingCompanies.map((company) => (
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
