import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/**
 * The ListingCollection. It encapsulates state and variable values for stuff.
 */
class ListingsCollection {
  constructor() {
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
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

/**
 * The singleton instance of the ListingsCollection.
 * @type {ListingsCollection}
 */
export const Events = new ListingsCollection();
