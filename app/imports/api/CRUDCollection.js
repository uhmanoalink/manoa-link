/**
 * @typedef {object} DocumentSchema
 * @abstract
 */
class CRUDCollection {
  /**
   * Inserts a single document into the collection.
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
   * @param {string} _id
   */
  findOne(_id) {
    throw new Error("Method 'findOne' must be implemented.");
  }

  /**
   * Updates a single document in the collection.
   *
   * @param {string} _id
   * @param {DocumentSchema} doc
   * @abstract
   */
  updateOne(_id, doc) {
    throw new Error("Method 'updateOne' must be implemented.");
  }

  /**
   * Removes a single document from the collection.
   *
   * @param {string} _id
   * @abstract
   */
  removeOne(_id) {
    throw new Error("Method 'removeOne' must be implemented.");
  }
}

export default CRUDCollection;
