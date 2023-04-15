import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import PropTypes from 'prop-types';

/**
 * ## ProtectedRender Component
 *
 * The `ProtectedRender` component is a React functional component that takes in a list of
 * allowed roles and a child element, and conditionally renders the child element based on
 * whether the current user is in one of the allowed roles.
 * ### Props
 *
 * - `allowedRoles` (optional):
 * An array of strings representing the roles that are allowed to see the child element. If
 * no roles are specified, any authenticated user can see the child element. If roles are
 * specified, the user must be in at least one of the roles to see the child element.
 *
 * - `children` (required):
 * A React node representing the child element to be conditionally rendered.
 *
 * ### Example Usage
 *
 * ```jsx
 * import ProtectedRender from './ProtectedRender';
 *
 * // Only users with the 'admin' role can see the button
 * <ProtectedRender allowedRoles={['admin']}>
 *  <button>Destroy App</button>
 * </ProtectedRender>
 * ```
 *
 * ---
 *
 * @type { React.FC<{ allowedRoles?: string[], children: React.ReactNode }> }
 *
 * *Note: Documentation mostly generated w/ ChatGPT*
 */
const ProtectedRender = ({ allowedRoles, children }) => {
  if (allowedRoles === undefined) {
    return (Meteor.user()) ? children : null;
  }
  return (allowedRoles.some(
    (role) => Roles.userIsInRole(Meteor.userId(), role),
  ))
    ? children
    : null;
};

ProtectedRender.propTypes = {
  allowedRoles: PropTypes.arrayOf(PropTypes.string),
  children: PropTypes.node.isRequired,
};

ProtectedRender.defaultProps = {
  allowedRoles: undefined,
};

export default ProtectedRender;
