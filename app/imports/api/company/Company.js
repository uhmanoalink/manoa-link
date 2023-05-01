import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import CRUDCollection from '../CRUDCollection';
import { Students } from '../student/Student';

/**
 * The CompanysCollection.
 *
 * @typedef {{
 *   name: string
 *   imageId: string
 *   website: string
 *   address: string
 *   description: string
 * }} CompanySchema
 */
class CompaniesCollection extends CRUDCollection {
  constructor() {
    super();
    // The name of this collection.
    this.name = 'CompaniesCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      userId: String,
      name: String,
      imageId: String,
      website: String,
      address: String,
      description: {
        type: String,
        optional: true,
      },
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
   * @param {CompanySchema} newDoc
   */
  insertOne(newDoc) {
    return Meteor.call('insert', newDoc);
  }

  /**
   * Finds a single document from the collection.
   *
   * @param {string} _id
   */
  findOne(_id) {
    return Meteor.call('find', this.name, _id);
  }

  /**
   * Updates a single document in the collection.
   *
   * @param {string} _id
   * @param {CompanySchema} doc
   */
  updateOne(_id, doc) {
    return Meteor.call('update', this.name, _id, doc);
  }

  /**
   * Removes a single document from the collection.
   *
   * @param {string} _id
   */
  removeOne(_id) {
    Meteor.call(
      'update',
      Students.name,
      { followedCompanies: _id },
      { $pull: { followedCompanies: _id } },
    );
    return Meteor.call('removeUser', this.name, _id);
  }
}

/**
 * The singleton instance of the CompanysCollection.
 * @type {CompaniesCollection}
 */

export const Companies = new CompaniesCollection();
