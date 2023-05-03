import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import CRUDCollection from '../CRUDCollection';
import { Students } from '../student/Student';

/**
 * The ListingCollection.
 *
 * @typedef {{
 *   companyId: string,
 *   title: string,
 *   description: string,
 *   imageId: String,
 *   location: String,
 *   employmentType: 'in-person' | 'online' | 'hybrid',
 *   scheduleType: 'part-time' | 'full-time' | 'flexible',
 *   tags: string[],
 *   createdAt: Date,
 *   startDate: Date,
 * }} ListingSchema
 */
class ListingsCollection extends CRUDCollection {
  constructor() {
    super();
    // The name of this collection.
    this.name = 'ListingsCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      companyId: String, // the ObjectId of the company that created it
      title: String,
      description: String,
      imageId: String, // also keep as string
      website: String,
      location: String, // optional. if not given, defaults to the address of the company
      employmentType: {
        type: String,
        allowedValues: ['in-person', 'online', 'hybrid'],
      },
      scheduleType: {
        type: String,
        allowedValues: ['part-time', 'full-time', 'flexible'],
      },
      tags: [String],
      createdAt: Date,
      startDate: Date,
    });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.studentPublicationName = `${this.name}.publication.student`;
    this.companyPublicationName = `${this.name}.publication.company`;
  }

  /**
   * Inserts a single document into the collection.
   *
   * ---
   *
   * @param {ListingSchema} newDoc
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
   * @param {ListingSchema | Mongo.Modifier<Document>} modifier
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
      { savedListings: selector },
      { $pull: { savedListings: selector } },
    );
    return Meteor.call('remove', this.name, selector);
  }
}

/**
 * The singleton instance of the ListingsCollection.
 * @type {ListingsCollection}
 */
export const Listings = new ListingsCollection();
