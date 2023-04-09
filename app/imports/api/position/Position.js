import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/**
 * The PositionsCollection. It encapsulates state and variable values for stuff.
 */
class PositionsCollection {
  constructor() {
    // The name of this collection.
    this.name = 'PositionsCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      positionName: String,
      companyId: String,
      address: String,
      pay: Number,
      createdAt: Date,
      owner: String,
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
 * The singleton instance of the PositionsCollection.
 * @type {PositionsCollection}
 */
export const Positions = new PositionsCollection();
