import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/**
 * The EventsCollection. It encapsulates state and variable values for stuff.
 */
class ListingsCollection {
  constructor() {
    // The name of this collection.
    this.name = 'ListingsCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      companyId: String,
      title: String,
      description: String,
      image: String,
      location: String,
      employmentType: oneOf(['in-person', 'remote', 'hybrid']),
      scheduleType: oneOf(['full-time', 'part-time', 'flexible']),
      tags: [String],
      createdAt: Date,
      startDate: Date,
    });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.companyPublicationName = `${this.name}.publication.company`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

/**
 * The singleton instance of the EventsCollection.
 * @type {ListinsgCollection}
 */
export const Listings = new ListingsCollection();
