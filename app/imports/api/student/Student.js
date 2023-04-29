import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/**
 * The UsersCollection. It encapsulates state and variable values for stuff.
 */
class StudentsCollection {
  constructor() {
    // The name of this collection.
    this.name = 'StudentsCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      name: Object,
      'name.firstName': String,
      'name.lastName': String,
      email: String,
      profileImage: String,
      followedCompanies: [String],
      savedEvents: [String],
      savedListings: [String],
    });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.companyPublicationName = `${this.name}.publication.company`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

/**
 * The singleton instance of the UsersCollection.
 * @type {UsersCollection}
 */
export const Students = new StudentsCollection();
