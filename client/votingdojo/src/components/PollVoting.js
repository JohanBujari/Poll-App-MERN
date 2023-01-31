import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Alert, Button } from "react-bootstrap";
import image from "../image.jpg";
import io from 'socket.io-client';



axios.defaults.withCredentials = true;

const PollVoting = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [p, setPoll] = useState({});
  const [show, setShow] = useState(false);
  const [error, setError] = useState(null);
  const [socket] = useState(() => io(':8000'));

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/polls/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data.poll);
        setPoll(res.data.poll);
      })
      .catch((err) => console.log(err));
  }, [id]);
  try {
    const updateVoteCount = async (pollId, optionId) => {
      try {
        const res = await axios.put(
          `http://localhost:8000/api/polls/${pollId}/vote/${optionId}`,
          {
            withCredentials: true,
         
          },
        );
        setPoll(res.data.updatedPoll)
        socket.on("vote", res.data.updatedPoll);
    // note that we're returning a callback function
    // this ensures that the underlying socket will be closed if App is unmounted
    // this would be more critical if we were creating the socket in a subcomponent
        console.log(res);
        setShow(true);
      } catch (err) {
        console.log(err);
        setError(err.response.data);
      }
    };
  
    const handleBackToList = () => {
      navigate("/poll-app");
    };

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {error ? (
          <Alert
            show={true}
            variant="danger"
            style={{ width: "410px", margin: "auto" }}
          >
            <Alert.Heading>
              {error.messageAlreadyVoted
                ? error.messageAlreadyVoted
                : error.messagePollEnded
                ? error.messagePollEnded
                : null}
            </Alert.Heading>
            <hr />

            <Button
              style={{ width: "150px" }}
              onClick={() => {
                setShow(false);
                handleBackToList();
              }}
              className="alert alert-danger btn btn-light"
            >
              Go back to polls
            </Button>
          </Alert>
        ) : null}

        {!error && show ? (
          <Alert
            show={show}
            variant="success"
            style={{ width: "300px", margin: "auto" }}
          >
            <Alert.Heading>You voted succesfully</Alert.Heading>
            <hr />
            <div className="d-flex justify-content-center">
              <Button
                onClick={() => {
                  setShow(false);
                  handleBackToList();
                }}
                variant="outline-success"
              >
                Go back to polls
              </Button>
            </div>
          </Alert>
        ) : null}
        {
          <div style={{backgroundColor: "#f8f9fa" }}>

            <div
            style={{
              width: "700px",
              height: "600px",
              padding: "30px",
              margin: "auto",
              marginTop: "30px",
              borderRadius: "15px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              gap: "100px",
              
            }}
          >
            <img
              style={{ marginLeft: "-40px" , borderRadius:"800px" }}
              height="500px"
              width="800px"
              src={image}
            />
            <div className="card-body" style={{ marginTop: "100px" }}>
              <p style={{ fontSize: "45px", color: "blue" }}>{p.question}</p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "30px",
                  justifyContent: "center",
                  width: "470px",
                }}
              >
                {p.options[0].text ? (
                  <button
                    className="btn btn-outline-primary"
                    onClick={() => {
                      updateVoteCount(p._id, p.options[0]._id).then(() =>
                        setShow(true)
                      );
                    }}
                  >
                    {p.options[0].text}
                  </button>
                ) : null}
                {p.options[1].text ? (
                  <button
                    className="btn btn-outline-primary"
                    onClick={() => {
                      updateVoteCount(p._id, p.options[1]._id).then(() =>
                        setShow(true)
                      );
                    }}
                  >
                    {p.options[1].text}
                  </button>
                ) : null}
                {p.options[2].text ? (
                  <button
                    className="btn btn-outline-primary"
                    onClick={() => {
                      updateVoteCount(p._id, p.options[2]._id).then(() =>
                        setShow(true)
                      );
                    }}
                  >
                    {p.options[2].text}
                  </button>
                ) : null}
                {p.options[3].text ? (
                  <button
                    className="btn btn-outline-primary"
                    onClick={() => {
                      updateVoteCount(p._id, p.options[3]._id).then(() =>
                        setShow(true)
                      );
                    }}
                  >
                    {p.options[3].text}
                  </button>
                ) : null}
              </div>
            </div>
          </div>
          </div>
          
        }
      </div>
    );
  } catch (err) {
    console.log(err);
  }
};

export default PollVoting;
