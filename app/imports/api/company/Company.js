import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/**
 * The CompanysCollection. It encapsulates state and variable values for stuff.
 */
class CompaniesCollection {
  constructor() {
    // The name of this collection.
    this.name = 'CompaniesCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      userId: String,
      name: String,
      image: String,
      website: String,
      address: String,
      description: String,
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
 * The singleton instance of the CompanysCollection.
 * @type {CompaniesCollection}
 */

export const Companies = new CompaniesCollection();
