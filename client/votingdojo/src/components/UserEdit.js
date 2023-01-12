import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";

const UserEdit = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
  });
  const { id } = useParams();
  const [error, setError] = useState("");
  const { username, email } = formData;
  const navigate = useNavigate();

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
        if (res.data.updatedUser.role === "admin") {
          navigate("/admin");
          localStorage.setItem("username", res.data.updatedUser.username);
        } else if (res.data.updatedUser.role === "normal") {
          navigate("/poll-app");
          localStorage.setItem("username", res.data.updatedUser.username);
        }
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        setError(err.response.data);
      });
  }

  return (
    <div style={{ marginLeft: "500px", marginTop: "60px" }}>
      <h3
        style={{
          fontFamily: "Arial, sans-serif",
          fontSize: "20px",
          marginLeft: "-745px",
        }}
      >
        Edit your profile
      </h3>
      <form
        onSubmit={submitHandler}
        className="row g-3 needs-validation"
        noValidate
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "auto",
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
          <p style={{ color: "red", textAlign: "left" }}>
            {error && error.messageRequired ? error.messageRequired : null}
            {error && error.messageEmail ? error.messageEmail : null}
          </p>
        </div>

        <div class="col-12">
          <button
            className="btn btn-primary"
            type="submit"
            style={{ float: "left", width: "285px" }}
          >
            Confirm
          </button>
        </div>
      </form>
      <Link style={{ marginLeft: "-380px" }} to={`/user/details/${id}`}>
        Go back
      </Link>
    </div>
  );
};

export default UserEdit;
