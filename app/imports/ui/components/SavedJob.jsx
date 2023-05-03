import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { Mongo } from 'meteor/mongo';

const SavedJob = ({ collection, student, jobID }) => {
  const [isJobSaved, setIsJobSaved] = useState(student.savedListings.includes(jobID));
  const findStudentIdByUserId = (userId) => {
    const studentDoc = collection.findOne({ userId });
    return studentDoc ? studentDoc._id : null;
  };
  useEffect(() => {
    setIsJobSaved(student.savedListings.includes(jobID));
  }, [student, jobID]);

  const handleToggleSave = () => {
    const studentId = findStudentIdByUserId(student.userId);
    if (isJobSaved) {
      collection.update(
        { _id: studentId },
        { $pull: { savedListings: jobID } },
      );
    } else {
      collection.update(
        { _id: studentId },
        { $push: { savedListings: jobID } },
      );
    }
    setIsJobSaved(!isJobSaved);
  };

  return (
    <Button onClick={handleToggleSave} variant={isJobSaved ? 'warning' : 'primary'} size="sm">
      {isJobSaved ? 'Unsave' : 'Save'}
    </Button>
  );
};

SavedJob.propTypes = {
  collection: PropTypes.instanceOf(Mongo.Collection).isRequired,
  student: PropTypes.shape({
    userId: PropTypes.string,
    savedListings: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  jobID: PropTypes.string.isRequired,
};

export default SavedJob;
