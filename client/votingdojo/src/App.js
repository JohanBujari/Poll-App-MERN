import "./App.css";
import Navbar from "./components/Navbar";
import React, { useState } from "react";
import Home from "./components/Home";
import PollsListPage from "./components/PollsListPage";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Form from "./components/Form";
import PollVoting from "./components/PollVoting";
import Login from "./components/Login";
import Register from "./components/Register";
import AdminDashboard from "./components/AdminDashboard";
import PollEdit from "./components/PollEdit";
import About from "./components/About";
import Contact from "./components/Contact";
import UserEdit from "./components/UserEdit";
import UserProfile from "./components/UserProfile";
import ChartModal from "./components/ChartModal";
import UserSecurity from "./components/UserSecurity";
import AdminListUsers from "./components/AdminListUsers";
import AdminListPolls from "./components/AdminListPolls";

function App() {
  // const location = useLocation();
  // const background = location.state && location.state.background;
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<About />} path="/about" />
          <Route element={<Contact />} path="/contact" />
          <Route element={<PollsListPage />} path="/poll-app" default />
          <Route element={<AdminDashboard />} path="/admin" />
          <Route element={<AdminListUsers />} path="/admin/manageUsers" />
          <Route element={<AdminListPolls />} path="/admin/managePolls" />
          <Route element={<PollVoting />} path="/poll-voting/:id" />
          <Route element={<Login />} path="/login" />
          <Route element={<Register />} path="/signup" />
          <Route element={<PollEdit />} path="/poll/edit/:id" />
          <Route element={<UserProfile />} path="/user/details/:id" />
          <Route element={<UserEdit />} path="/user/edit/:id" />

          <Route element={<ChartModal />} path="/poll/:id" />
          <Route
            element={<UserSecurity />}
            path="/security/changePassword/:id"
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
