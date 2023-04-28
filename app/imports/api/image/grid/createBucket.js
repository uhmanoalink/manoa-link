import { MongoInternals } from 'meteor/mongo';

export const createBucket = (bucketName) => {
  const options = bucketName ? { bucketName } : undefined;
  return new MongoInternals.NpmModules.mongodb.module.GridFSBucket(MongoInternals.defaultRemoteCollectionDriver().mongo.db, options);
};
