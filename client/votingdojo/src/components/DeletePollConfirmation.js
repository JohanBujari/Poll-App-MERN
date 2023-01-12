import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

const DeletePollConfirmation = (props) => {
  const { show, setShow, handleDelete } = props;
  return (
    <div>
      <Modal show={show}>
        <Modal.Header>
          <Modal.Title>Delete Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete it?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              setShow(false);
              handleDelete();
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DeletePollConfirmation;
