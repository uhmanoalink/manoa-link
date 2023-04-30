import { Meteor } from 'meteor/meteor';
// import { Companies } from '../../api/company/Company';
import { Events } from '../../api/event/Event';
// import { Positions } from '../../api/position/Position';
// import { Users } from '../../api/user/User';

/* eslint-disable no-console */

// Initialize the database with a default data document.

// // Initialize the database with a default data document.
// const addCompany = (data) => {
//   console.log(`  Adding: ${data.name} (${data.owner})`);
//   Companies.collection.insert(data);
// };
//
// // Initialize the CompaniesCollection if empty.
// if (Companies.collection.find().count() === 0) {
//   if (Meteor.settings.defaultData) {
//     console.log('Creating default data.');
//     Meteor.settings.defaultData.forEach(data => addData(data));
//   }
// }
//
// Initialize the database with a default data document.
const addEvent = (data) => {
  console.log(`  Adding: ${data.eventName}`);
  Events.collection.insert(data);
};

// Initialize the EventsCollection if empty.
if (Events.collection.find().count() === 0) {
  if (Meteor.settings.defaultEvents) {
    console.log('Creating default events.');
    Meteor.settings.defaultEvents.forEach(data => addEvent(data));
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
//     Meteor.settings.defaultData.forEach(data => addData(data));
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
//   if (Meteor.settings.defaultData) {
//     console.log('Creating default data.');
//     Meteor.settings.defaultData.forEach(data => addData(data));
//   }
// }
