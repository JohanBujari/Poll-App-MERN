import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";
const UserProfile = () => {
  const [user, setUser] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/user/${id}`)
      .then((res) => {
        console.log(res.data.user);
        setUser(res.data.user);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-lg-6 offset-lg-3 col-sm-6 offset-sm-3">
            <div className="card text-center">
              <div className="card-header">Profile</div>
              <div className="card-body">
                <h5 className="card-title">{user.username}</h5>
                <p className="card-text">Email: {user.email}</p>
                <p className="card-text">
                  Joined: {moment(user.created).format("MMM Do YY")}
                </p>
                <p className="card-text">
                  Last updated: {moment(user.updated).format("MMM Do YY")}
                </p>
                <Link
                  style={{ width: "100px" }}
                  type="button"
                  className="btn btn-primary"
                  to={`/user/edit/${id}`}
                >
                  Edit
                </Link>
              </div>
            </div>
            {user && user.role === "admin" ? (
              <Link
                style={{ marginLeft: "550px", marginTop: "10px" }}
                to="/admin"
              >
                Go back
              </Link>
            ) : (
              <Link to="/poll-app">go back</Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
