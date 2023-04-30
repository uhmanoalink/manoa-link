import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { Mongo } from 'meteor/mongo';

/** @type {React.FC<{ collection: Mongo.Collection<Document, Document>, student: { _id: string, savedEvents: string[] }, eventId: string }>} */
const SavedConfirmation = ({ collection, student, eventId }) => {
  const isEventSaved = student.savedEvents.includes(eventId);

  /** @type { React.MouseEventHandler<HTMLButtonElement> } */
  const handleToggleSave = () => {
    if (isEventSaved) {
      collection.update(
        { _id: student.userId },
        { $pull: { savedEvents: eventId } },
      );
    } else {
      collection.update(
        { _id: student.userId },
        { $addToSet: { savedEvents: eventId } },
      );
    }
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
