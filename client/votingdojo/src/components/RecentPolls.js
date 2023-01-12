import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";

const Top3 = (props) => {
  const [polls, setPolls] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/polls", {
        withCredentials: true,
      })

      .then((res) => {
        setPolls(res.data.pollsRetrieved);
        console.log(res.data.pollsRetrieved);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div
      className="card"
      style={{ width: "700px", marginLeft: "20px", marginTop: "30px" , borderRadius:"15px"}}
    >
      <div className="card-body">
      <h1 style={{ fontSize: "28px", fontFamily: "Verdana, sans-serif", fontWeight: "bold" }}>Recent polls</h1>
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
              }}
            >
              <h6 style={{ color: "blue" }}> {poll.question}</h6>

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
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p>({moment(poll.createdAt).fromNow()})</p>
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
  );
};

export default Top3;
