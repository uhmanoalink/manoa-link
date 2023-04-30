import { Meteor } from 'meteor/meteor';
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
  insertOne(collectionName, doc) {
    check(collectionName, String);
    check(doc, Object);
    const collection = Mongo.Collection.get(collectionName);
    collection.insert(doc);
  },
  readOne(collectionName, _id) {
    check(collectionName, String);
    check(_id, String);
    const collection = Mongo.Collection.get(collectionName);
    return collection.findOne(_id);
  },
  updateOne(collectionName, _id, doc) {
    check(collectionName, String);
    check(_id, String);
    check(doc, Object);
    const collection = Mongo.Collection.get(collectionName);
    collection.update(_id, doc);
  },
  removeOne(collectionName, _id) {
    check(collectionName, String);
    check(_id, String);
    const collection = Mongo.Collection.get(collectionName);
    collection.remove(_id);
  },
  removeOneUser(collectionName, _id) {
    check(collectionName, String);
    check(_id, String);
    const collection = Mongo.Collection.get(collectionName);
    const { userId } = collection.findOne(_id);
    Meteor.users.remove({ _id: userId });
    collection.remove(_id);
  },
});
