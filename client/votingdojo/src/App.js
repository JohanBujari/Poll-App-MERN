import "./App.css";
import Navbar from "./components/Navbar";
import React from "react";
import Home from "./components/Home";
import PollsListPage from "./components/PollsListPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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

function App() {
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
          <Route element={<Form />} path="/polls/new" />
          <Route element={<PollVoting />} path="/poll-voting/:id" />
          <Route element={<Login />} path="/login" />
          <Route element={<Register />} path="/signup" />
          <Route element={<PollEdit />} path="/admin/admin/poll/edit/:id" />
          <Route element={<UserProfile />} path="/user/details/:id" />
          <Route element={<UserEdit />} path="/user/edit/:id" />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
