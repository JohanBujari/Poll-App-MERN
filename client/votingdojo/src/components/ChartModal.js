import React, { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import axios from "axios";
import { useParams } from "react-router-dom";

ChartJS.register(ArcElement, Tooltip, Legend);

const ChartModal = (props) => {
  const [poll, setPoll] = useState({});

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/poll/${id}`)
      .then((res) => {
        setPoll(res.data.poll);
      })
      .catch((err) => console.log(err));
  }, []);

  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [],
      },
    ],
  });

  useEffect(() => {
    try {
      setData({
        labels: [
          poll.options[0].text,
          poll.options[1].text,
          poll.options[2].text,
          poll.options[3].text,
        ],

        datasets: [
          {
            data: [
              poll.options[0].votes,
              poll.options[1].votes,
              poll.options[2].votes,
              poll.options[3].votes,
            ],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
            ],
          },
        ],
      });
    } catch (err) {
      console.log(err);
    }
  }, [poll]);

  try {
    return (
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div>
          <Doughnut
            style={{ width: "400px", height: "400px", margin: "70px" }}
            data={data}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <h1 style={{ marginTop: "150px", color: "blue" }}>{poll.question}</h1>
          <div style={{ display: "flex", gap: "30px" }}>
            {poll.options[0].text ? (
              <p>
                <li>{poll.options[0].text}</li>
              </p>
            ) : null}
            {poll.options[1].text ? (
              <p>
                <li>{poll.options[1].text}</li>
              </p>
            ) : null}
            {poll.options[2].text ? (
              <p>
                <li>{poll.options[2].text}</li>
              </p>
            ) : null}
            {poll.options[3].text ? (
              <p>
                <li>{poll.options[3].text}</li>
              </p>
            ) : null}
          </div>
        </div>
      </div>
    );
  } catch (err) {
    console.log(err);
  }
};

export default ChartModal;
