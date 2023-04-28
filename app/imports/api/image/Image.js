/*
resources:
https://github.com/veliovgroup/Meteor-Files/blob/master/docs/gridfs-bucket-integration.md
https://github.com/veliovgroup/files-gridfs-autoform-example
https://github.com/veliovgroup/Meteor-Files/blob/master/docs/insert.md
*/

import { Meteor } from 'meteor/meteor';
import { FilesCollection } from 'meteor/ostrio:files';
import { createBucket } from './grid/createBucket';
import { createOnAfterUpload } from './files/createOnAfterUpload';
import { createInterceptDownload } from './files/createInterceptDownload';
import { createOnAfterRemove } from './files/createOnAfterRemove';

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
}

/**
 * The singleton instance of the EventsCollection.
 * @type {ImagesCollection}
 */
export const Images = new ImagesCollection();
