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
    this.userPublicationName = `${this.name}.publication.user`;
    this.companyPublicationName = `${this.name}.publication.company`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }

  /**
   * Inserts a single document into the collection.
   *
   * ---
   *
   * @param {CompanySchema} newDoc
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
   * @param {CompanySchema | Mongo.Modifier<Document>} modifier
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
    Meteor.call(
      'update',
      Students.name,
      { followedCompanies: selector },
      { $pull: { followedCompanies: selector } },
    );
    return Meteor.call('removeUser', this.name, selector);
  }
}

/**
 * The singleton instance of the CompanysCollection.
 * @type {CompaniesCollection}
 */

export const Companies = new CompaniesCollection();
