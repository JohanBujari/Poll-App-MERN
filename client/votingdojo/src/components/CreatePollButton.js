import React from "react";
import { useNavigate } from "react-router-dom";

const CreatePollButton = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/polls/new");
  };

  return (
    <div>
      <button
        className="btn btn-primary btn-lg"
        style={{
          width: "200px",
          height: "40px",
          marginTop: "0",
          textDecoration: "none",
          padding: "5px",
          boxShadow: "2px 2px",
        }}
        onClick={handleClick}
      >
        Add poll
      </button>
    </div>
  );
};

export default CreatePollButton;
