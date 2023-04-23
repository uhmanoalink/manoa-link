import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

Meteor.methods({
  'initUser'({ userId, role }) {
    Roles.createRole(role, { unlessExists: true });
    Roles.addUsersToRoles(userId, [role]);
  },
  'deleteUser'({ userId }) {
    Meteor.users.remove({ _id: userId });
  },
});
