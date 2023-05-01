import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { Mongo } from 'meteor/mongo';

const SavedConfirmation = ({ collection, student, eventId }) => {
  const [isEventSaved, setIsEventSaved] = useState(student.savedEvents.includes(eventId));
  const findStudentIdByUserId = (userId) => {
    const studentDoc = collection.findOne({ userId });
    return studentDoc ? studentDoc._id : null;
  };
  useEffect(() => {
    setIsEventSaved(student.savedEvents.includes(eventId));
  }, [student, eventId]);

  const handleToggleSave = () => {
    const studentId = findStudentIdByUserId(student.userId);
    if (isEventSaved) {
      collection.update(
        { _id: studentId },
        { $pull: { savedEvents: eventId } },
      );
    } else {
      collection.update(
        { _id: studentId },
        { $push: { savedEvents: eventId } },
      );
    }
    setIsEventSaved(!isEventSaved);
  };

  return (
    <Button onClick={handleToggleSave} variant={isEventSaved ? 'warning' : 'primary'} size="sm">
      {isEventSaved ? 'Unsave' : 'Save'}
    </Button>
  );
};

SavedConfirmation.propTypes = {
  collection: PropTypes.instanceOf(Mongo.Collection).isRequired,
  student: PropTypes.shape({
    userId: PropTypes.string,
    savedEvents: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  eventId: PropTypes.string.isRequired,
};

export default SavedConfirmation;
