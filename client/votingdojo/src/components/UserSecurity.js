import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";

const UserSecurity = () => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const [confirmNewPassword, setNewConfirmPassword] = useState("");
  const [backEnderror, setBackEndError] = useState("");
  const [frontEndError, setFrontEndError] = useState("");

  const { oldPassword, newPassword } = formData;
  const navigate = useNavigate();
  const { id } = useParams();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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

  function submitHandler(e) {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      setFrontEndError("New password does not match with confirm password");
    } else {
      axios
        .put(`http://localhost:8000/api/changePassword/${id}`, { ...formData })
        .then((res) => {
          localStorage.setItem("username", res.data.updatedUser.username);
          navigate(0);
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
          setBackEndError(err.response.data);
        });
    }
  }
  return (
    <div>
      <div >
       
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
              Old password
            </label>
            <input
              name="oldPassword"
              type="password"
              className="form-control"
              id="validationCustom01"
              value={oldPassword}
              onChange={handleChange}
            />
            <p style={{ color: "red", textAlign: "left" }}></p>
          </div>
          <div class="col-md-4">
            <label
              htmlFor="validationCustom01"
              className="form-label"
              style={{ float: "left" }}
            >
              New password
            </label>
            <input
              name="newPassword"
              type="password"
              className="form-control"
              id="validationCustom01"
              value={newPassword}
              onChange={handleChange}
            />
            <p style={{ color: "red", textAlign: "left" }}></p>
          </div>
          <div class="col-md-4">
            <label
              htmlFor="validationCustom01"
              className="form-label"
              style={{ float: "left" }}
            >
              Confirm new password
            </label>
            <input
              name="confirmNewPassword"
              type="password"
              className="form-control"
              id="validationCustom01"
              value={confirmNewPassword}
              onChange={(e) => setNewConfirmPassword(e.target.value)}
            />
            <p style={{ color: "red", textAlign: "left" }}>
              {backEnderror
                ? backEnderror.message
                : backEnderror ? backEnderror.messagePasswordRegex : null}
            </p>
          </div>

          <div class="col-12">
            <button
              className="btn btn-primary"
              type="submit"
              style={{ marginLeft:"185px", width: "100px" }}
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserSecurity;
