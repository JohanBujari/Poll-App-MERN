import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { OverlayTrigger } from "react-bootstrap";
import { Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import io from "socket.io-client";

axios.defaults.withCredentials = true;

const Top3Polls = (props) => {
  const [polls, setPolls] = useState([]);
  const [poll, setPoll] = useState({});
  const [sort, setSort] = useState("topThreePolls");
  const [socket] = useState(() => io(":8000"));

  useEffect(() => {
    if (sort === "topThreePolls") {
      axios
        .get("http://localhost:8000/api/polls-most-votes", {
          withCredentials: true,
        })
        .then((res) => {
          setPolls(res.data.pollsRetrieved);
          console.log(res);
        })
        .catch((err) => console.log(err));
    } else if (sort === "topPoll") {
      axios
        .get("http://localhost:8000/api/most-voted-poll", {
          withCredentials: true,
        })
        .then((res) => {
          setPolls(res.data.pollsRetrieved);
          console.log(res);
        })
        .catch((err) => console.log(err));
    } else if (sort === "latestToEarliest") {
      axios
        .get("http://localhost:8000/api/polls-1", {
          withCredentials: true,
        })
        .then((res) => {
          setPolls(res.data.pollsRetrieved);
          console.log(res);
        })
        .catch((err) => console.log(err));
    } else if (sort === "earliestToLatest") {
      axios
        .get("http://localhost:8000/api/polls", {
          withCredentials: true,
        })

        .then((res) => {
          socket.on("vote", res.data.pollsRetrieved);
          setPolls(res.data.pollsRetrieved);
          console.log(res.data.pollsRetrieved);
        })
        .catch((err) => console.log(err));
    }
  }, [sort, socket]);

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      See it in chart view
    </Tooltip>
  );
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        gap: "200px",
        backgroundColor: "#f8f9fa",
        width: "1600px",
      }}
    >
      <div
        className="card"
        style={{
          width: "700px",
          marginLeft: "20px",
          marginTop: "30px",
          borderRadius: "15px",
          overflowX:
            sort === "latestToEarliest" || sort === "earliestToLatest"
              ? "hidden"
              : null,
          overflowY:
            sort === "latestToEarliest" || sort === "earliestToLatest"
              ? "scroll"
              : null,
          height:
            sort === "latestToEarliest" || sort === "earliestToLatest"
              ? "500px"
              : sort === "topPoll"
              ? "235px"
              : null,
        }}
      >
        <div style={{ backgroundColor: "#f8f9fa" }} className="card-body">
          <h1
            style={{
              fontSize: "28px",
              fontFamily: "Verdana, sans-serif",
              fontWeight: "bold",
              color: "blue",
            }}
          >
            Polls
          </h1>

          {polls.map((poll, index) => {
            return (
              <div
                key={index}
                className="card"
                style={{
                  margin: "10px",
                  textAlign: "left",
                  padding: "20px",
                  height: "130px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  backgroundColor: "white",
                  borderRadius: "10px",
                }}
              >
                <OverlayTrigger
                  placement="top"
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderTooltip}
                >
                  <Link
                    style={{ color: "blue", textDecoration: "none" }}
                    to={`/poll/${poll._id}`}
                  >
                    {" "}
                    {poll.question}
                  </Link>
                </OverlayTrigger>

                <div
                  style={{ display: "flex", flexDirection: "row", gap: "20px" }}
                >
                  {poll.options[0].text ? (
                    <p>
                      {poll.options[0].text}: {poll.options[0].votes} votes
                    </p>
                  ) : null}
                  {poll.options[1].text ? (
                    <p>
                      {poll.options[1].text}: {poll.options[1].votes} votes
                    </p>
                  ) : null}
                  {poll.options[2].text ? (
                    <p>
                      {poll.options[2].text}: {poll.options[2].votes} votes
                    </p>
                  ) : null}
                  {poll.options[3].text ? (
                    <p>
                      {poll.options[3].text}: {poll.options[3].votes} votes
                    </p>
                  ) : null}
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <p>({moment(poll.createdAt).fromNow()})</p>
                  <p style={{ marginLeft: "-400px" }}>
                    {Math.ceil(
                      (new Date(poll.endTime).getTime() -
                        new Date().getTime()) /
                        (1000 * 60 * 60 * 24)
                    ) === 0 && "(Expired)"}
                  </p>
                  <Link
                    style={{ textDecoration: "none", color: "blue" }}
                    to={`/poll-voting/${poll._id}`}
                  >
                    Vote
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "50px",
            marginTop: "30px",
          }}
        >
          <img
            style={{ borderRadius: "40px" }}
            width="500px"
            height="400px"
            src="https://img.freepik.com/premium-vector/man-businessman-votes-throwing-into-box-bulletin-political-referendum-voting-government-ballot-paper-polling-bulletin-insert-document-vector-abstract-flat-design-illustration_485380-275.jpg?w=2000"
          />
          <select
            style={{
              height: "50px",
              width: "500px",
              textAlign: "center",
              fontSize: "18px",
              fontFamily: "Verdana, sans-serif",
              fontWeight: "bold",
              color: "blue",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  backgroundColor: "white",
                  borderRadius: "10px",
            }}
            className="form-select "
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="topThreePolls">Filter polls</option>
            <option value="topThreePolls">Top 3 polls</option>
            <option value="topPoll">Top poll</option>
            <option value="latestToEarliest">Latest to earliest</option>
            <option value="earliestToLatest">Earliest to Latest</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Top3Polls;
