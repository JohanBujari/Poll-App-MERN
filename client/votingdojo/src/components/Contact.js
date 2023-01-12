import React from "react";
import { useState } from "react";
const Contact = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [show, setShow] = useState(false);

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormState({
      name: "",
      email: "",
      message: "",
    });
    setShow(true);
    setTimeout(() => setShow(false), 2000);
  };
  return (
    <div className="container mt-5">
      {show && (
        <div className="alert alert-success" role="alert">
          Thank you for your message! We will get back to you as soon as
          possible.
        </div>
      )}
      <h1 className="mb-4">Contact Us</h1>
      <p className="lead">
        Thank you for your interest in our poll app. If you have any questions
        or would like to get in touch with us, please use the form below or send
        us an email at{" "}
        <a href="mailto:info@pollapp.com" className="font-weight-bold">
          info@pollapp.com
        </a>
        .
      </p>
      <form
        onSubmit={handleSubmit}
        className="mt-4"
        style={{ width: "600px", margin: "auto" }}
      >
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            aria-describedby="nameHelp"
            placeholder="Enter your name"
            value={formState.name}
            onChange={handleChange}
          />
          <small id="nameHelp" className="form-text text-muted">
            We'll only use your name to personalize your message.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            placeholder="Enter your email"
            value={formState.email}
            onChange={handleChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll use your email to respond to your message.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            className="form-control"
            id="message"
            name="message"
            rows="3"
            value={formState.message}
            onChange={handleChange}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary mt-4">
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;
