import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Companies } from '../../api/company/Company';
import { Events } from '../../api/event/Event';
import { Students } from '../../api/student/Student';
import { Listings } from '../../api/listing/Listing';
import { Images } from '../../api/image/Image';

Meteor.publish(Images.allImagesPublication, () => Images.collection.find({}));

// User-level publication.
// If logged in, then publish documents owned by this user. Otherwise publish nothing.
Meteor.publish(Companies.studentPublicationName, function () {
  if (this.userId) {
    return Companies.collection.find({});
  }
  return this.ready();
});

// Company-level publication.
// If logged in and with company role, then publish the documents for companys. Otherwise publish nothing.
Meteor.publish(Companies.companyPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'company')) {
    return Companies.collection.find({ _id: this.userId });
  }
  return this.ready();
});

// Admin-level publication.
// If logged in and with admin role, then publish all documents from all users. Otherwise publish nothing.
Meteor.publish(Companies.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Companies.collection.find({});
  }
  return this.ready();
});

Meteor.publish(Listings.studentPublicationName, function () {
  if (this.userId) {
    return Listings.collection.find({});
  }
  return this.ready();
});

Meteor.publish(Listings.companyPublicationName, function () {
  if (this.userId) {
    return Listings.collection.find({});
  }
  return this.ready();
});

Meteor.publish(Events.studentPublicationName, function () {
  if (this.userId) {
    return Events.collection.find({});
  }
  return this.ready();
});

// Company-level publication.
// If logged in and with company role, then publish the documents for companys. Otherwise publish nothing.
Meteor.publish(Events.companyPublicationName, function () {
  if (this.userId) {
    return Events.collection.find({ companyId: this.userId });
  }
  return this.ready();
});

// Admin-level publication.
// If logged in and with admin role, then publish all documents from all users. Otherwise publish nothing.
Meteor.publish(Events.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Events.collection.find();
  }
  return this.ready();
});

// Company-level publication.
// If logged in and with company role, then publish the documents for companys. Otherwise publish nothing.
Meteor.publish(Students.companyPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Students.collection.find({ owner: username });
  }
  return this.ready();
});

// Admin-level publication.
// If logged in and with admin role, then publish all documents from all users. Otherwise publish nothing.
Meteor.publish(Students.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Students.collection.find();
  }
  return this.ready();
});

Meteor.publish(Students.studentPublicationName, function () {
  if (this.userId) {
    return Students.collection.find({});
  }
  return this.ready();
});

// alanning:roles publication
// Recommended code to publish roles for each user.
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});
