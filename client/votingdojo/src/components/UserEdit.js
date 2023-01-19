import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Button, Modal, ModalDialog } from "react-bootstrap";
import UserProfile from "./UserProfile";

const UserEdit = (props) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
  });
  const [error, setError] = useState("");
  const [showEdit, setShowEdit] = useState(true);
  const { id } = useParams();
  const { username, email } = formData;
  const navigate = useNavigate();
  const location = useLocation();

  const { state } = useLocation();
  const from = state;

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/user/${id}`)
      .then((res) => {
        console.log(res.data.user);
        setFormData(res.data.user);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  function submitHandler(e) {
    e.preventDefault();
    axios
      .put(`http://localhost:8000/api/user/edit/${id}`, { ...formData })
      .then((res) => {
        localStorage.setItem("username", res.data.updatedUser.username);
        navigate(0);

        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        setError(err.response.data);
      });
  }

  const handleClose = () => setShowEdit(false);
  const handleShow = () => setShowEdit(true);

  return (
    <div style={{ marginTop: "60px" }}>
      <form
        onSubmit={submitHandler}
        className="row g-3 needs-validation"
        noValidate
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: "-50px",
          width: "900px",
        }}
      >
        <div class="col-md-4">
          <label
            htmlFor="validationCustom01"
            className="form-label"
            style={{ float: "left" }}
          >
            Username
          </label>
          <input
            name="username"
            htmlFor="username"
            className="form-control"
            id="validationCustom01"
            value={username}
            onChange={handleChange}
            style={{
              border:
                error && error.messageRequired
                  ? "1px solid red"
                  : error.messageUsername
                  ? "1px solid red"
                  : null,
            }}
          />
          <p style={{ color: "red", textAlign: "left" }}>
            {error && error.messageUsername ? error.messageUsername : null}
          </p>
        </div>
        <div class="col-md-4">
          <label
            htmlFor="validationCustom01"
            className="form-label"
            style={{ float: "left" }}
          >
            Email
          </label>
          <input
            name="email"
            htmlFor="email"
            className="form-control"
            id="validationCustom01"
            value={email}
            onChange={handleChange}
            style={{
              border:
                error && error.messageRequired
                  ? "1px solid red"
                  : error.messageEmail
                  ? "1px solid red"
                  : null,
            }}
          />
          <button
            style={{ marginLeft: "203px", marginTop: "30px" }}
            className="btn btn-primary"
          >
            Confirm
          </button>
          <p style={{ color: "red", textAlign: "left" }}>
            {error && error.messageRequired ? error.messageRequired : null}
            {error && error.messageEmail ? error.messageEmail : null}
          </p>
        </div>
      </form>
    </div>
  );
};

export default UserEdit;
