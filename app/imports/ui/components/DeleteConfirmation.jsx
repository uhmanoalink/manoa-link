import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'react-bootstrap';
import { Mongo } from 'meteor/mongo';

/** @type {React.FC<{ collection: Mongo.Collection<Document, Document>, document: { _id: string } }>} */
const DeleteConfirmation = ({ collection, document }) => {

  const [showConfirm, setShowConfirm] = useState(false);

  /** @type { React.MouseEventHandler<HTMLButtonElement> } */
  const handleClose = () => {
    setShowConfirm(false);
  };

  /** @type { React.MouseEventHandler<HTMLButtonElement> } */
  const handleDelete = () => {
    collection.remove({ _id: document._id });
    handleClose();
  };

  /** @type { React.MouseEventHandler<HTMLButtonElement> } */
  const handleShowConfirm = (e) => {
    if (e.ctrlKey) {
      handleDelete();
    } else {
      setShowConfirm(true);
    }
  };

  return (
    <>
      <Button onClick={handleShowConfirm} variant="danger" size="sm">Delete</Button>
      <Modal show={showConfirm} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure you want to delete?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>This is a permanent action.</p>
          <p>Hold <code>ctrl</code>/<code>control</code> to ignore this warning.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Nevermind
          </Button>
          <Button onClick={handleDelete} variant="danger">Yes, delete</Button>
        </Modal.Footer>
      </Modal>
    </>
  );

};

DeleteConfirmation.propTypes = {
  collection: PropTypes.instanceOf(Mongo.Collection).isRequired,
  document: PropTypes.shape({
    _id: PropTypes.string,
  }).isRequired,
};

export default DeleteConfirmation;
