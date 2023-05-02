/**
 * Inserts a given File into a FilesCollection.
 *
 * FilesCollection documentation: https://github.com/veliovgroup/Meteor-Files/blob/master/docs/constructor.md
 *
 * @param {FilesCollection} filesCollection
 * @param {File} file
 * @typedef {number} FileDocument
 * @returns {Promise<FileDocument>} The new document of the file in the collection.
 */
export const insertFileToFilesCollection = async (filesCollection, file) => new Promise((res, rej) => {
  const uploader = filesCollection.insert({ file });
  uploader.on('uploaded', (error, fileObj) => {
    if (error) rej(`There was a problem while uploading file ${fileObj.name}`);
    // Upload was successful
    res(fileObj);
  });
  uploader.on('error', (error, fileObj) => {
    // Upload was unsuccessful
    if (error) rej(`There was a problem while uploading file ${fileObj.name}`);
  });
});

/**
 * Removes a File from a FilesCollection based on a given ID.
 *
 * FilesCollection documentation: https://github.com/veliovgroup/Meteor-Files/blob/master/docs/constructor.md
 *
 * @param {FilesCollection} filesCollection
 * @param {string} _id
 */
export const removeFileFromFilesCollection = (filesCollection, _id) => {
  filesCollection.remove({ _id: _id });
  filesCollection.collection.remove(_id);
};

/**
 * Verifies the type of a file against an accept property value.
 *
 * @param {File} file
 * @param {string} acceptString - The accepted types of the file input.
 * - For more info: https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/accept
 * @returns {boolean} True if the type matches.
 */
export const verifyFileType = (file, acceptString) => {
  // https://stackoverflow.com/questions/20524306/check-selected-file-matches-accept-attribute-on-an-input-tag
  const acceptedTypes = acceptString.toLowerCase().split(',').map(type => type.trim());
  const fileType = file.type.toLowerCase();
  return acceptedTypes.some(type => type === fileType
    || type === `${fileType.split('/')[0]}/*`
    || type === `.${fileType.split('/')[1]}`);
};
