import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { check, Match } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';
import { Mongo } from 'meteor/mongo';

Meteor.methods({
  initUser(userId, role) {
    check(userId, String);
    check(role, String);
    Match.Where(/\b(?=\w)(student|company)\b(?<=\w)/.test(role));
    Roles.createRole(role, { unlessExists: true });
    Roles.addUsersToRoles(userId, [role]);
  },
  deleteUser(userId) {
    check(userId, String);
    Meteor.users.remove({ _id: userId });
  },
  findUserByUsername(username) {
    check(username, String);
    const user = Meteor.users.findOne({ username });
    return user;
  },
  insert(collectionName, doc) {
    check(collectionName, String);
    check(doc, Object);
    const collection = Mongo.Collection.get(collectionName);
    collection.insert(doc);
  },
  find(collectionName, selector) {
    check(collectionName, String);
    check(selector, Match.OneOf(Object, String, Mongo.ObjectID, Mongo.Selector));
    const collection = Mongo.Collection.get(collectionName);
    return collection.find(selector).fetch();
  },
  findOne(collectionName, selector) {
    check(collectionName, String);
    check(selector, Match.OneOf(Object, String, Mongo.ObjectID, Mongo.Selector));
    const collection = Mongo.Collection.get(collectionName);
    return collection.findOne(selector);
  },
  update(collectionName, selector, modifier, options) {
    check(collectionName, String);
    check(selector, Match.OneOf(Object, String, Mongo.ObjectID, Mongo.Selector));
    check(modifier, Match.OneOf(Object, Mongo.Modifier));
    check(options, Match.Optional(Object));
    const collection = Mongo.Collection.get(collectionName);
    collection.update(selector, modifier, options);
  },
  remove(collectionName, selector) {
    check(collectionName, String);
    check(selector, Match.OneOf(Object, String, Mongo.ObjectID, Mongo.Selector));
    const collection = Mongo.Collection.get(collectionName);
    collection.remove(selector);
  },
  removeUser(collectionName, selector) {
    check(collectionName, String);
    Match.Where(/\b(?=\w)(StudentsCollection|CompaniesCollection)\b(?<=\w)/.test(collectionName));
    check(selector, Match.OneOf(Object, String, Mongo.ObjectID, Mongo.Selector));
    const collection = Mongo.Collection.get(collectionName);
    const { userId } = collection.findOne(selector);
    Meteor.users.remove({ _id: userId });
    collection.remove(selector);
  },
  changeAccountEmail(userId, oldEmail, newEmail) {
    check(userId, String);
    check(oldEmail, String);
    // Email regex from: https://regexr.com/3e48o
    Match.Where(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(oldEmail));
    check(newEmail, String);
    Match.Where(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(newEmail));
    if (Meteor.isServer) {
      Accounts.removeEmail(userId, oldEmail);
      Accounts.addEmail(userId, newEmail);
      Accounts.setUsername(userId, newEmail);
    }
  },
});
