/*
resources:
https://github.com/veliovgroup/Meteor-Files/blob/master/docs/gridfs-bucket-integration.md
https://github.com/veliovgroup/files-gridfs-autoform-example
https://github.com/veliovgroup/Meteor-Files/blob/master/docs/insert.md
*/

import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { FilesCollection } from 'meteor/ostrio:files';
import { createBucket } from './grid/createBucket';
import { createOnAfterUpload } from './files/createOnAfterUpload';
import { createInterceptDownload } from './files/createInterceptDownload';
import { createOnAfterRemove } from './files/createOnAfterRemove';
import { insertFileToFilesCollection, removeFileFromFilesCollection, verifyFileType } from '../../../lib/files';
import { Students } from '../student/Student';
import { Companies } from '../company/Company';
import { Events } from '../event/Event';
import { Listings } from '../listing/Listing';

let imagesBucket;
if (Meteor.isServer) {
  imagesBucket = createBucket('allImages');
}

/**
 * The ImagesCollection.
 */
class ImagesCollection {
  constructor() {
    this.name = 'ImagesCollection';

    this.filesCollection = new FilesCollection({
      debug: false,
      collectionName: this.name,
      allowClientCode: false,
      onBeforeUpload(file) {
        if (file.size <= 10485760 && /png|jpg|jpeg/i.test(file.extension)) return true;
        return 'Please upload image, with size equal or less than 10MB';
      },
      onAfterUpload: createOnAfterUpload(imagesBucket),
      interceptDownload: createInterceptDownload(imagesBucket),
      onAfterRemove: createOnAfterRemove(imagesBucket),
    });

    this.collection = this.filesCollection.collection;
    this.allImagesPublication = `${this.name}.all.publication`;
  }

  /**
   * Inserts a given image File into the FilesCollection.
   *
   * FilesCollection documentation: https://github.com/veliovgroup/Meteor-Files/blob/master/docs/constructor.md
   *
   * ---
   *
   * @param {FilesCollection} filesCollection
   * @param {File} imageFile
   * @typedef {{
   *   size: number,
   *   type: "image/png" | "image/jpeg",
   *   ext: "png" | "jpg" | "jpeg",
   *   extension: "png" | "jpg" | "jpeg",
   *   extensionWithDot: ".png" | ".jpg" | ".jpeg",
   *   mime: "image/png" | "image/jpeg",
   *   "mime-type": "image/png" | "image/jpeg",
   *   _id: string,
   *   userId: string,
   *   path: string,
   *   versions: object,
   *   _downloadRoute: string,
   *   _collectionName: "ImagesCollection",
   *   isVideo: false,
   *   isAudio: false,
   *   isImage: true,
   *   isText: false,
   *   isJSON: false,
   *   isPDF: false,
   *   _storagePath: string,
   *   public: boolean
   * }} ImageDocument
   * @returns {Promise<ImageDocument>} The new document of the file in the collection
   */
  async uploadFile(imageFile) {
    if (!verifyFileType(imageFile, 'image/png, image/jpeg')) {
      throw new Error(`${imageFile.name} is not an image`);
    }
    return insertFileToFilesCollection(this.filesCollection, imageFile);
  }

  /**
   * Gets the image at the given URL and converts it to a File object.
   *
   * ---
   *
   * @param {string} url The URL to the image file.
   * @param {string | undefined} fileName An optional file name (with extension). If not defined, a random one is generated.
   * @returns {Promise<File | null>} A promise that resolves to a File or null if the image could not be found.
   * @async
   */
  async getFileFromImageUrl(url, fileName) {
    const acceptedTypes = ['image/png', 'image/jpeg'];
    const fetchRes = await fetch(url);
    if (!acceptedTypes.includes(fetchRes.headers.get('Content-Type'))) {
      return null;
    }
    let fileExt = '.png';
    if (fetchRes.headers.get('Content-Type') === 'image/jpeg') fileExt = '.jpeg';
    else if (fetchRes.headers.get('Content-Type') === 'image/png') fileExt = '.png';
    const blob = await fetchRes.blob();
    return new File([blob], fileName ?? `${Random.hexString(16)}${fileExt}`, { type: fetchRes.headers.get('Content-Type') });
  }

  /**
   * Given the ObjectId of an image, convert to the URL of the file.
   *
   * ---
   *
   * @param {string} imageId The ObjectId of the image in the Images collection.
   * @returns {string} A URL that leads to the image.
   */
  getFileUrlFromId(imageId) {
    const imageDoc = this.collection.findOne({ _id: imageId });
    if (imageDoc) {
      return this.filesCollection.link(imageDoc);
    }
    return undefined;
  }

  purgeUnused() {
    const allImages = this.collection.find({}).fetch();
    allImages.forEach(({ _id }) => {
      // Check all collections for usage of the _id
      const used =
        Students.collection.find({ profileImageId: _id }).fetch().length !== 0 ||
        Companies.collection.find({ imageId: _id }).fetch().length !== 0 ||
        Events.collection.find({ imageId: _id }).fetch().length !== 0 ||
        Listings.collection.find({ imageId: _id }).fetch().length !== 0;

      if (!used) {
        removeFileFromFilesCollection(this.filesCollection, _id);
      }
    });
  }
}

/**
 * The singleton instance of the EventsCollection.
 * @type {ImagesCollection}
 */
export const Images = new ImagesCollection();
