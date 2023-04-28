import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';

Meteor.methods({
  initUser(userId, role) {
    check(userId, String);
    check(role, /\b(?=\w)(student|company)\b(?<=\w)/);
    Roles.createRole(role, { unlessExists: true });
    Roles.addUsersToRoles(userId, [role]);
  },
  deleteUser(userId) {
    check(userId, String);
    Meteor.users.remove({ _id: userId });
  },
});
