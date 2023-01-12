import React, { useState } from "react";
import AdminList from "./AdminListPolls";
import AdminListUsers from "./AdminListUsers";
import axios from "axios";
axios.defaults.withCredentials = true;

const AdminDashboard = () => {
  const [isAuthorized, setIsAuthorized] = useState("");
  return (
    <div
      style={{
        padding: "20px",
        marginTop: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "30px",
      }}
    >
      {isAuthorized ? (
        <h1>{isAuthorized}</h1>
      ) : (
        <div>
          <AdminList
            isAuthorized={isAuthorized}
            setIsAuthorized={setIsAuthorized}
          />
          <AdminListUsers
            isAuthorized={isAuthorized}
            setIsAuthorized={setIsAuthorized}
          />
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
