import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

const VoterIdsModal = (props) => {
  const [show, setShow] = useState(false);
  const [voterIds, setVoterIds] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    setVoterIds(props.voterIds);
  }, [props.voterIds]);

  return (
    <>
      <Button
        className="btn btn-secondary btn-sm"
        style={{ width: "150px" }}
        onClick={handleShow}
      >
        Show Voter IDs
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Voter IDs</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            {voterIds.map((id) => (
              <li key={id}>{id}</li>
            ))}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default VoterIdsModal;
