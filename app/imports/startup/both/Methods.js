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
  insertOne(collection, doc) {
    check(collection, Mongo.Collection);
    check(doc, Object);
    collection.insert(doc);
  },
  readOne(collection, _id) {
    check(collection, Mongo.Collection);
    check(_id, String);
    return collection.findOne(_id);
  },
  updateOne(collection, _id, doc) {
    check(collection, Mongo.Collection);
    check(_id, String);
    check(doc, Object);
    collection.update(_id, doc);
  },
  removeOne(collection, _id) {
    check(collection, Mongo.Collection);
    check(_id, String);
    collection.remove(_id);
  },
  removeOneUser(collection, _id) {
    check(collection, Mongo.Collection);
    check(_id, String);
    const { userId } = collection.findOne(_id);
    Meteor.users.remove({ _id: userId });
    collection.remove(_id);
  },
});
