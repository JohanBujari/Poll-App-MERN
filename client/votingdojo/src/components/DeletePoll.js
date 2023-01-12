import React, { useState } from "react";
import DeletePollConfirmation from "./DeletePollConfirmation";

const DeletePoll = (props) => {
  const [show, setShow] = useState(false);
  const { pollId, deletePoll } = props;

  function handleDelete() {
    deletePoll(pollId);
  }

  return (
    <div>
     {show && <DeletePollConfirmation show={show} setShow={setShow} handleDelete={handleDelete} />}
      {!show && (
        <button
          type="button"
          className="btn btn-danger btn-sm"
          onClick={() => setShow(true)}
        >
          Delete
        </button>
      )}
    </div>
  );
};

export default DeletePoll;
