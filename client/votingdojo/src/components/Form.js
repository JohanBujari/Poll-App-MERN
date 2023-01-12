import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Alert, Button } from "react-bootstrap";

axios.defaults.withCredentials = true;

const Form = () => {
  const [show, setShow] = useState(false);
  const [pollFormData, setPollFormData] = useState({
    question: "",
    options: [
      { text: "", votes: 0, required: true },
      { text: "", votes: 0, required: true },
      { text: "", votes: 0, required: false },
      { text: "", votes: 0, required: false },
    ],
    endTime: new Date(),
  });
  const [errorMessageOptions, setErrorMessageOptions] = useState("");
  const [errorQuestion, setErrorQuestion] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const handleChange = (event) => {
    const { name, value } = event.target;
    setPollFormData({ ...pollFormData, [name]: value });
  };
  const handleOptionChange = (event, index) => {
    const { name, value } = event.target;
    const options = [...pollFormData.options];
    options[index][name] = value;
    setPollFormData({ ...pollFormData, options });
  };

  const handleVotingEndTimeChange = (e) => {
    // Calculate the voting end time based on the selected option
    const days = Number(e.target.value);
    const endTime = new Date();
    endTime.setDate(endTime.getDate() + days);
    // Update the pollFormData state with the new voting end time
    setPollFormData({ ...pollFormData, endTime });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const requiredOptions = pollFormData.options.filter(
      (option) => option.required
    );
    if (
      requiredOptions.some((option) => option.text.trim() === "") ||
      pollFormData.question === ""
    ) {
      setErrorMessageOptions("Please fill out all required options");
      setErrorQuestion(null);
    } else {
      setErrorMessageOptions(null);
      setErrorQuestion(null);
      axios
        .post("http://localhost:8000/api/admin/polls/new", pollFormData, {
          withCredentials: true,
        })
        .then((res) => {
          setPollFormData(res.data);
          navigate("/admin");
          // console.log(res.data);
        })
        .catch((err) => {
          console.log(err.response.data);
          setErrorQuestion(err.response.data);
        });
    }
  };
  return (
    <div>
      {errorMessageOptions && (
        <p style={{ color: "red", marginLeft: "-50px", marginTop: "10px" }}>
          {errorMessageOptions}
        </p>
      )}

      <form
        onSubmit={submitHandler}
        className="row g-3 needs-validation"
        noValidate
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "auto",
          marginLeft: "40%",
        }}
      >
        <div class="col-md-4">
          <label
            htmlFor="validationCustom01"
            className="form-label"
            style={{ float: "left" }}
          >
            Question <span style={{ color: "red" }}>*</span>
          </label>
          <input
            name="question"
            className="form-control"
            id="validationCustom01"
            value={pollFormData.question}
            onChange={handleChange}
            style={{
              border: errorMessageOptions
                ? "1px solid red"
                : errorQuestion
                ? "1px solid red"
                : null,
            }}
          />
          <p style={{ color: "red", textAlign: "left" }}>
            {errorQuestion
              ? errorQuestion.messageUnique
                ? errorQuestion.messageUnique
                : errorQuestion.messageLength
              : null}
          </p>
        </div>
        {pollFormData.options.map((option, index) => (
          <div className="col-md-4" key={index}>
            <label
              className="form-label"
              style={{ float: "left" }}
              htmlFor={`option-${index}`}
            >
              Option {index + 1}:{" "}
              <span style={{ color: option.required ? "red" : "black" }}>
                {" "}
                *
              </span>
            </label>
            <br></br>
            <input
              className="form-control"
              required
              type="text"
              name="text"
              id={`option-${index}`}
              value={option.text}
              onChange={(event) => handleOptionChange(event, index)}
              style={{
                border:
                  errorMessageOptions && option.required
                    ? "1px solid red"
                    : null,
              }}
            />
          </div>
        ))}

        <div className="col-md-4">
          <label
            htmlFor="validationCustom04"
            className="form-label"
            style={{ float: "left" }}
          >
            Set poll duration <span style={{ color: "red" }}>*</span>
          </label>
          <select
            className="form-select"
            id="validationCustom04"
            onChange={handleVotingEndTimeChange}
            style={{ border: errorMessageOptions ? "1px solid red" : null }}
          >
            <option value="">Choose</option>
            <option value="1">1 day</option>
            <option value="2">2 days</option>
            <option value="3">3 days</option>
            <option value="4">4 days</option>
            <option value="5">5 days</option>
            <option value="6">6 days</option>
            <option value="7">7 days</option>
          </select>
        </div>

        <div class="col-12">
          <button
            className="btn btn-primary"
            type="submit"
            style={{ float: "left" }}
          >
            Create poll
          </button>
          <p style={{ marginRight: "550px" }}>
            <Link to="/admin">Back to dashboard</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Form;
