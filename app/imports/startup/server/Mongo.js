import { Meteor } from 'meteor/meteor';
import { Companies } from '../../api/company/Company';
import { Events } from '../../api/event/Event';
import { Listings } from '../../api/listing/Listing';
import { Images } from '../../api/image/Image';
// import { Positions } from '../../api/position/Position';
// import { Users } from '../../api/user/User';

/* eslint-disable no-console */

// Initialize the database with a default data document.

const addCompany = (data) => {
  console.log(`  Adding: ${data.name} ${data.imageId}`);
  Companies.collection.insert(data);
};

if (Companies.collection.find().count() === 0) {
  if (Meteor.settings.defaultCompanies) {
    console.log('Creating default data.');
    Meteor.settings.defaultCompanies.forEach(data => addCompany(data));
  }
}

// Initialize the database with a default data document.
const addEvent = (data) => {
  console.log(`  Adding: ${data.eventName}`);
  Events.collection.insert(data);
};

// Initialize the EventsCollection if empty.
if (Events.collection.find().count() === 0) {
  if (Meteor.settings.defaultEvents) {
    console.log('Creating default event.');
    Meteor.settings.defaultEvents.forEach(data => addEvent(data));
  }
}

const addListing = (data) => {
  console.log(`  Adding: ${data.title} at ${data.companyId}`);
  Listings.collection.insert(data);
};

// Initialize the EventsCollection if empty.
if (Listings.collection.find().count() === 0) {
  if (Meteor.settings.defaultJobs) {
    console.log('Creating default listings.');
    Meteor.settings.defaultJobs.forEach(data => addListing(data));
  }
}
//
// // Initialize the database with a default data document.
// const addPosition = (data) => {
//   console.log(`  Adding: ${data.name} (${data.owner})`);
//   Positions.collection.insert(data);
// };
//
// // Initialize the PositionsCollection if empty.
// if (Positions.collection.find().count() === 0) {
//   if (Meteor.settings.defaultData) {
//     console.log('Creating default data.');
//     Meteor.settings.defaultPositions.forEach(data => addPosition(data));
//   }
// }
//
// // Initialize the database with a default data document.
// const addUser = (data) => {
//   console.log(`  Adding: ${data.name} (${data.owner})`);
//   Users.collection.insert(data);
// };
//
// // Initialize the UsersCollection if empty.
// if (Users.collection.find().count() === 0) {
//   if (Meteor.settings.defaultUsers) {
//     console.log('Creating default data.');
//     Meteor.settings.defaultUsers.forEach(data => addUser(data));
//   }
// }
