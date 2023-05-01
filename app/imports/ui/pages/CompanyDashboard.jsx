import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Badge } from 'react-bootstrap';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import HelpButton from '../components/HelpButton';
import { Events } from '../../api/event/Event';
import Event from '../components/Event';
import { Listings } from '../../api/listing/Listing';
import Listing from '../components/Listing';
import { Companies } from '../../api/company/Company';
import Company from '../components/Company';

/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const CompanyDashboard = () => {

  const { events, listings, company } = useTracker(() => {
    const eventsSub = Meteor.subscribe(Events.companyPublicationName);
    const listingsSub = Meteor.subscribe(Listings.companyPublicationName);
    // Determine if the subscription is ready
    const rdy = eventsSub.ready() && listingsSub.ready();

    const eventItems = Events.collection.find({}).fetch();
    const listingItems = Listings.collection.find({}).fetch();
    const companyItem = Companies.collection.findOne({ _id: Meteor.userId() });

    return {
      events: eventItems,
      listings: listingItems,
      company: companyItem,
      ready: rdy,
    };
  }, []);

  /** @type { ( array: { tag: string }[]) => { tag: string }[][] } */
  const groupDocsByTag = (array) => {
    /** @type { { tag: string }[][] } */
    const groupArray = [];
    const sortedByTags = array.sort(({ tag: tag1 }, { tag: tag2 }) => tag1.localeCompare(tag2));
    let nextGroup;
    sortedByTags.forEach((doc) => {
      nextGroup = groupArray[groupArray.length - 1];
      if (groupArray.length > 0 && doc.tag === nextGroup[0].tag) {
        nextGroup.push(doc);
      } else {
        groupArray.push([doc]);
      }
    });
    return groupArray;
  };

  /**
   * Given a job listing, fetch the number of students who saved it.
   */
  const getNumSaved = (listing) => {
    // Do something, probably using a method since pub/sub for this will be expensive
    const numSaved = 1;
    return numSaved;
  };

  return (
    <div id="company-dashboard">
      <main>
        <section id="upcoming-events">
          <h2>Your Upcoming Events</h2>
          <div className="events">
            {events.map((event) => (
              <Event key={event._id} event={event} />
            ))}
          </div>
        </section>
        <section id="listings">
          <h2>Your Job Listings</h2>
          <hr />
          {groupDocsByTag(listings).map((listingGroup) => (
            <div key={listingGroup[0].tag} className="listing-group">
              <h3>{listingGroup[0].tag}</h3>
              <hr />
              {listings.map((listing) => (
                <div key={listing._id} className="listing">
                  <Listing listing={listing} />
                  <Badge>Saved by {getNumSaved(listing)} {getNumSaved(listing) === 1 ? 'person' : 'people'}</Badge>
                </div>
              ))}
            </div>
          ))}
        </section>
        <section id="calendar">
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            height="auto"
            events={events.map((event) => ({
              id: event._id,
              title: event.eventName,
              start: event.createdAt,
            }))}
          />
        </section>
        <section id="about">
          <h2>Company Name</h2>
          {/* <Company company={company} /> */}
        </section>
      </main>
      <HelpButton />
    </div>
  );
};

export default CompanyDashboard;
