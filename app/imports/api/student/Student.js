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
   * ---
   *
   * @param {StudentSchema} newDoc
   * @override
   */
  insertOne(newDoc) {
    return Meteor.call('insert', newDoc);
  }

  /**
   * Finds a single document from the collection.
   *
   * ---
   *
   * @param {string | Mongo.ObjectID | Mongo.Selector<Document>} selector A query describing the documents to find.
   * @override
   */
  findOne(selector) {
    return Meteor.call('find', this.name, selector);
  }

  /**
   * Updates a single document in the collection.
   *
   * ---
   *
   * @param {string | Mongo.ObjectID | Mongo.Selector<Document>} selector A query that specifies which documents to modify.
   * @param {StudentSchema | Mongo.Modifier<Document>} modifier
   * @override
   */
  updateOne(selector, modifier) {
    return Meteor.call('update', this.name, selector, modifier);
  }

  /**
   * Removes a single document from the collection.
   *
   * ---
   *
   * @param {string | Mongo.ObjectID | Mongo.Selector<Document>} selector A query that specifies which documents to remove.
   * @override
   */
  removeOne(selector) {
    this.collection.remove();
    return Meteor.call('removeUser', this.name, selector);
  }
}

/**
 * The singleton instance of the StudentsCollection.
 * @type {StudentsCollection}
 */
export const Students = new StudentsCollection();
