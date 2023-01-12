import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const DeleteAllPollsModal = (props) => {
  const [show, setShow] = useState(false);
  const { deleteAll } = props;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
      <Button
        variant="outline-danger"
        style={{ width: "200px", marginLeft: "1280px" }}
        onClick={handleShow}
      >
        Delete All
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Delete Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete all?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              setShow(false);
              deleteAll();
            }}
          >
            Delete All
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DeleteAllPollsModal;
