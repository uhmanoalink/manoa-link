/**
 * @typedef {object} DocumentSchema
 * @abstract
 */
class CRUDCollection {
  /**
   * Inserts a single document into the collection.
   *
   * ---
   *
   * @param {DocumentSchema} newDoc
   * @abstract
   */
  insertOne(newDoc) {
    throw new Error("Method 'insertOne' must be implemented.");
  }

  /**
   * Finds a single document from the collection.
   *
   * ---
   *
   * @param {string | Mongo.ObjectID | Mongo.Selector<Document>} selector A query describing the documents to find.
   */
  findOne(selector) {
    throw new Error("Method 'findOne' must be implemented.");
  }

  /**
   * Updates a single document in the collection.
   *
   * ---
   *
   * @param {string | Mongo.ObjectID | Mongo.Selector<Document>} selector A query that specifies which documents to modify.
   * @param {DocumentSchema | Mongo.Modifier<Document>} modifier
   * @abstract
   */
  updateOne(selector, modifier) {
    throw new Error("Method 'updateOne' must be implemented.");
  }

  /**
   * Removes a single document from the collection.
   *
   * ---
   *
   * @param {string | Mongo.ObjectID | Mongo.Selector<Document>} selector A query that specifies which documents to remove.
   * @abstract
   */
  removeOne(selector) {
    throw new Error("Method 'removeOne' must be implemented.");
  }
}

export default CRUDCollection;
