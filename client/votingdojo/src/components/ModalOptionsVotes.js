import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

const ModalOptionsVotes = (props) => {
  const [show, setShow] = useState(false);
  const [votes, setVotes] = useState(0);
  const [hover, setHover] = useState(false);

  const handleMouseEnter = () => {
    setHover(true);
  };

  const handleMouseLeave = () => {
    setHover(false);
  };

  const handleShow = () => {
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
  };
  useEffect(() => {
    setVotes(props.votes);
  }, [props.votes]);

  return (
    <>
      <button
        onClick={handleShow}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          fontSize: hover ? "20px" : "16px",
          textDecoration: "underline",
          cursor: "pointer",
          border: "none",
          backgroundColor: "white",
          color: "#0056b3",
        }}
      >
        {props.optionText}
      </button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Votes</Modal.Title>
        </Modal.Header>
        <Modal.Body>{votes}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalOptionsVotes;
