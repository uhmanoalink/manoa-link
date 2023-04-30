export type Student = {
  _id: string, // MongoDB ObjectId (in the document by default, don’t put in schema)
  userId: string, // Meteor.userId of student account
  name: {
    firstName: string,
    lastName: string,
  },
  email: string,
  profileImage: string, // File? String? Idk how mongo breaks down files,
  followedCompanies: string[], // array of company _ids (ObjectId)
  savedEvents: string[], // array of event _ids
  savedListings: string[], // array of listing _ids
}

export type Company = {
  _id: string, // MongoDB ObjectId (in the document by default, don’t put in schema)
  userId: string, // Meteor.userId of company account
  name: string,
  image: string, // should it be a File? string? Idk how mongo breaks down files,
  website: string,
  address: string,
  description: string,
}

export type Event = {
  _id: string, // MongoDB ObjectId (in the document by default, don’t put in schema)
  eventName: string,
  companyId: string, // the ObjectId of the company that created it
  address: string,
  description: string,
  image: string, // just keep as string for now until I figure out how to save files
  tags: string[],
  createdAt: Date,
  startDateTime: Date,
  endDateTime: Date,
}

export type Listing = {
  _id: string, // MongoDB ObjectId (in the document by default, don’t put in schema)
  companyId: string, // the ObjectId of the company that created it
  title: string,
  description: string,
  image: string, // also keep as string
  location: string, // optional. if not given, defaults to the address of the company
  employmentType: 'in-person' | 'remote' | 'hybrid',
  scheduleType: 'full-time' | 'part-time' | 'flexible',
  tags: string[],
  createdAt: Date,
  startDate: Date,
}
