import React, { useState } from "react";
import AdminList from "./AdminListPolls";
import AdminListUsers from "./AdminListUsers";
import { Button } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
axios.defaults.withCredentials = true;

const AdminDashboard = () => {
  const [isAuthorized, setIsAuthorized] = useState("");
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
      <h2
        style={{ fontFamily: "sans-serif", color: "blue", marginTop: "100px" }}
      >
        Welcome to dashboard
      </h2>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "20px",
          marginLeft: "450px",
        }}
      >
        <Button
          style={{
            width: "300px",
            height: "70px",
            fontSize: "25px",
            padding: "15px",
          }}
          href="/admin/managePolls"
          variant="outline-primary"
        >
          Manage Polls
        </Button>
        <Button
          style={{
            width: "300px",
            height: "70px",
            fontSize: "25px",
            padding: "15px",
          }}
          href="/admin/manageUSers"
          variant="outline-primary"
        >
          Manage Users
        </Button>
      </div>
    </div>
  );
};

export default AdminDashboard;
