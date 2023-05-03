import { Students } from '../imports/api/student/Student';

/**
 * Adds a company id to the followedCompanies array.
 *
 * @param {string} studentId
 * @param {string} companyId
 */
export const studentFollowsCompany = (studentId, companyId) => {
  Students.updateOne(studentId, { $addToSet: { followedCompanies: companyId } });
};

/**
 * Removes a company id from the followedCompanies array.
 *
 * @param {string} studentId
 * @param {string} companyId
 */
export const studentUnfollowsCompany = (studentId, companyId) => {
  Students.updateOne(studentId, { $pull: { followedCompanies: companyId } });
};

/**
 * Adds a event id to the savedEvents array.
 *
 * @param {string} studentId
 * @param {string} eventId
 */
export const studentSavesEvent = (studentId, eventId) => {
  Students.updateOne(studentId, { $addToSet: { savedEvents: eventId } });
};

/**
 * Removes a event id from the savedEvents array.
 *
 * @param {string} studentId
 * @param {string} eventId
 */
export const studentUnsavesEvent = (studentId, eventId) => {
  Students.updateOne(studentId, { $pull: { savedEvents: eventId } });
};

/**
 * Adds a listing id to the savedListings array.
 *
 * @param {string} studentId
 * @param {string} listingId
 */
export const studentSavesListing = (studentId, listingId) => {
  Students.updateOne(studentId, { $addToSet: { savedListings: listingId } });
};

/**
 * Removes a listing id from the savedListings array.
 *
 * @param {string} studentId
 * @param {string} listingId
 */
export const studentUnsavesListing = (studentId, listingId) => {
  Students.updateOne(studentId, { $pull: { savedListings: listingId } });
};
