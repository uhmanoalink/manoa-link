import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';

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
});
