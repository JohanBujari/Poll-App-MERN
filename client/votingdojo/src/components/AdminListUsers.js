import React, { useState, useEffect } from "react";
import axios from "axios";
import DeleteUser from "./DeleteUser";
import { Button } from "react-bootstrap";
import DeleteAllUsersModal from "./DeleteAllUsersModal";
axios.defaults.withCredentials = true;

const AdminListUsers = (props) => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [disabled, setDisabled] = useState(false);
  const { isAuthorized, setIsAuthorized } = props;

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/admin/normal-users", {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        setUsers(res.data.user);
      })
      .catch((err) => {
        console.log();
        setIsAuthorized(err.response.data.message);
      });
  }, [search]);
  function deleteUser(userId) {
    axios
      .delete(`http://localhost:8000/api/admin/users/delete/${userId}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        setUsers(users.filter((user) => user._id !== userId));
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function handleSearchSubmit(e) {
    e.preventDefault();
    if (search.length === 0) {
      setDisabled(true);
    } else {
      axios
        .get(`http://localhost:8000/api/admin/searchedUsers/?q=${search}`, {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res);
          setUsers(res.data);
        })
        .catch((err) => console.log(err));
    }
  }
  function deleteAll() {
    axios
      .delete("http://localhost:8000/api/admin/users/delete", {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        setUsers(res.data);
      });
  }

  return (
    <div>
      <nav
        className="d-flex justify-content-between align-items-center border rounded bg-light"
        style={{ height: "80px", padding: "0 30px" }}
      >
        <h4 className="text-primary font-weight-bold">MANAGE USERS</h4>

        <form
          onSubmit={handleSearchSubmit}
          disabled={disabled}
          className="form-inline d-flex"
        >
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-control me-2"
          />
          <Button
            type="submit"
            variant="outline-primary"
            style={{ marginRight: "10px" }}
          >
            Search
          </Button>
        </form>
      </nav>
      {users.length > 0 ? (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th style={{ padding: "10px" }}>Username</th>
              <th style={{ padding: "10px" }}>Email</th>
              <th style={{ padding: "10px" }}>Role</th>
              <th style={{ padding: "10px" }}>Created</th>
              <th style={{ padding: "10px" }}>Updated</th>
            </tr>
          </thead>

          {users.map((user, index) => {
            return (
              <tbody key={index}>
                <tr>
                  <td>{user.username}</td>

                  <td style={{ padding: "10px" }}>{user.email}</td>
                  <td style={{ padding: "10px" }}>{user.role}</td>
                  <td style={{ padding: "10px" }}>{user.created}</td>
                  <td style={{ padding: "10px" }}>{user.updated}</td>
                  <DeleteUser userId={user._id} deleteUser={deleteUser} />
                </tr>
              </tbody>
            );
          })}
        </table>
      ) : search ? (
        <p
          style={{ marginTop: "10px" }}
          className="text-primary font-weight-bold"
        >
          Sorry, it seems there was no match!
        </p>
      ) : users.length === 0 ? (
        <p
          style={{ marginTop: "10px" }}
          className="text-primary font-weight-bold"
        >
          Actually there are no users.
        </p>
      ) : null}

      <DeleteAllUsersModal deleteAll={deleteAll}>
        Delete all users
      </DeleteAllUsersModal>
    </div>
  );
};

export default AdminListUsers;
