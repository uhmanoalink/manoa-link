import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import CRUDCollection from '../CRUDCollection';
import { Students } from '../student/Student';

/**
 * The EventsCollection.
 *
 * @typedef {{
 *   eventName: string,
 *   companyId: string,
 *   address: string,
 *   description: string,
 *   imageId: string,
 *   tags: string[],
 *   createdAt: Date,
 *   startDateTime: Date,
 *   endDateTime: Date,
 * }} EventSchema
 */
class EventsCollection extends CRUDCollection {
  constructor() {
    super();
    // The name of this collection.
    this.name = 'EventsCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      eventName: String,
      companyId: String,
      address: String,
      description: String,
      imageId: String,
      tags: [String],
      createdAt: Date,
      startDateTime: Date,
      endDateTime: Date,
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
   * @param {EventSchema} newDoc
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
   * @param {EventSchema} doc
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
      { savedEvents: _id },
      { $pull: { savedEvents: _id } },
    );
    return Meteor.call('remove', this.name, _id);
  }
}

/**
 * The singleton instance of the EventsCollection.
 * @type {EventsCollection}
 */
export const Events = new EventsCollection();
