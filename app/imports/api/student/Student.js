import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import CRUDCollection from '../CRUDCollection';

/**
 * The StudentsCollection.
 *
 * @typedef {{
 *   userId: string,
 *   name: {
 *     firstName: string,
 *     lastName: string,
 *   },
 *   email: string,
 *   profileImageId: string,
 *   followedCompanies: string[],
 *   savedEvents: string[],
 *   savedListings: string[],
 * }} StudentSchema
 */
class StudentsCollection extends CRUDCollection {
  constructor() {
    super();
    // The name of this collection.
    this.name = 'StudentsCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      userId: String,
      name: Object,
      'name.firstName': String,
      'name.lastName': String,
      email: String,
      profileImageId: String,
      followedCompanies: [String],
      savedEvents: [String],
      savedListings: [String],
    });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.studentPublicationName = `${this.name}.publication.student`;
    this.companyPublicationName = `${this.name}.publication.company`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }

  /**
   * Inserts a single document into the collection.
   *
   * @param {StudentSchema} newDoc
   */
  insertOne(newDoc) {
    return Meteor.call('insertOne', newDoc);
  }

  /**
   * Finds a single document from the collection.
   *
   * @param {string} _id
   */
  findOne(_id) {
    return Meteor.call('findOne', this.collection, _id);
  }

  /**
   * Updates a single document in the collection.
   *
   * @param {string} _id
   * @param {StudentSchema} doc
   */
  updateOne(_id, doc) {
    return Meteor.call('updateOne', this.collection, _id, doc);
  }

  /**
   * Removes a single document from the collection.
   *
   * @param {string} _id
   */
  removeOne(_id) {
    return Meteor.call('removeOneUser', this.collection, _id);
  }
}

/**
 * The singleton instance of the StudentsCollection.
 * @type {StudentsCollection}
 */
export const Students = new StudentsCollection();
