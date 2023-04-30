import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'react-bootstrap';
import CRUDCollection from '../../api/CRUDCollection';

/**
 * @type {React.FC<{ collection: CRUDCollection, document: { _id: string } }>}
 */
const DeleteConfirmation = ({ collection, document }) => {

  const [showConfirm, setShowConfirm] = useState(false);

  /** @type { React.MouseEventHandler<HTMLButtonElement> } */
  const handleClose = () => {
    setShowConfirm(false);
  };

  /** @type { React.MouseEventHandler<HTMLButtonElement> } */
  const handleDelete = () => {
    collection.removeOne(document._id);
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
          <p>Hold <code>ctrl</code>/<code>control</code> when you delete to not show this warning.</p>
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
  collection: PropTypes.instanceOf(CRUDCollection).isRequired,
  document: PropTypes.shape({
    _id: PropTypes.string,
  }).isRequired,
};

export default DeleteConfirmation;
