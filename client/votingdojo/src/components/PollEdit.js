import React from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
axios.defaults.withCredentials = true;

const PollEdit = () => {
  const [poll, setPoll] = useState({
    endTime: " ",
  });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/admin/poll/${id}`)
      .then((res) => {
        console.log(res.data.poll);
        setPoll(res.data.poll);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleVotingEndTimeChange = (e) => {
    // Calculate the voting end time based on the selected option
    const days = Number(e.target.value);
    const endTime = new Date();
    endTime.setDate(endTime.getDate() + days);

    // Update the pollFormData state with the new voting end time
    setPoll({ ...poll, endTime });
  };

  function submitHandler(e) {
    e.preventDefault();
    axios
      .put(`http://localhost:8000/api/admin/edit-poll/${id}`, poll, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        navigate(-1);
      })
      .catch((err) => console.log(err));
  }
  return (
    <div style={{display:"flex", flexDirection:"column", marginTop:"150px", gap:"10px"}}>
      <h4 style={{color:"blue"}}>{poll.question}</h4>
      <form onSubmit={submitHandler} style={{display:"flex", gap:"10px", margin:"auto"}}>
        <div>
          <select
          id="votingEndTime"
          onChange={handleVotingEndTimeChange}
          className="form-select"
          style={{  width:"300px" }}
        >
          <option value="1">Edit poll duration</option>
          <option value="1">1 day</option>
          <option value="2">2 days</option>
          <option value="3">3 days</option>
          <option value="4">4 days</option>
          <option value="5">5 days</option>
          <option value="6">6 days</option>
          <option value="7">7 days</option>
        </select>
        </div>
        <div>
          <button type="submit" className="btn btn-primary" 
        >
          Confirm
        </button>
        </div>
        
      </form>
    </div>
  );
};

export default PollEdit;
