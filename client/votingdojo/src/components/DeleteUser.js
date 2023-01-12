import React, { useState } from "react";
import DeleteUserConfimation from "./DeleteUserConfimation";

const DeleteUser = (props) => {
  const [show, setShow] = useState(false);
  const { userId, deleteUser } = props;

  function handleDelete() {
    deleteUser(userId);
  }

  return (
    <div>
      {show && <DeleteUserConfimation show={show} setShow={setShow} handleDelete={handleDelete} />}
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

export default DeleteUser;
