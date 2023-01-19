import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import DeletePoll from "./DeletePoll";
import ModalVoters from "./ModalVoters";
import ModalOptionsVotes from "./ModalOptionsVotes";
import { Button, Modal } from "react-bootstrap";
import DeleteAllPollsModal from "./DeleteAllPollsModal";
import Form from "./Form";
axios.defaults.withCredentials = true;
const AdminList = (props) => {
  const [pollsAdmins, setPollsAdmin] = useState([]);
  const [search, setSearch] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState("");
  const [show, setShow] = useState(false);
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/admin/list-polls", {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        setPollsAdmin(res.data.pollsRetrieved);
      })
      .catch((err) => {
        console.log();
        setIsAuthorized(err.response.data.message);
      });
  }, [search]);

  function deletePoll(pollId) {
    axios
      .delete(`http://localhost:8000/api/admin/polls/delete/${pollId}`)
      .then((res) => {
        setPollsAdmin(pollsAdmins.filter((p) => p._id !== pollId));
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleSearchSubmit(e) {
    e.preventDefault();
    if (search.length === 0) {
      setDisabled(true);
    } else {
      axios
        .get(`http://localhost:8000/api/admin/searchedPolls/?q=${search}`, {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res);
          setPollsAdmin(res.data);
          setDisabled(false);
        })
        .catch((err) => console.log(err));
    }
  }

  function deleteAll() {
    axios
      .delete("http://localhost:8000/api/admin/polls/delete", {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        setPollsAdmin(res.data);
      });
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <Modal
        aria-labelledby="example-modal-sizes-title-lg"
        show={show}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "blue" }}>Add poll</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form />
          <Button
            style={{ marginLeft: "160px", marginTop: "-65px", width: "100px" }}
            variant="secondary"
            onClick={handleClose}
          >
            Close
          </Button>
        </Modal.Body>
      </Modal>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {isAuthorized ? (
          <h1>{isAuthorized}</h1>
        ) : (
          <div>
            <nav
              className="d-flex justify-content-between align-items-center border rounded bg-light"
              style={{ height: "80px", padding: "0 30px" }}
            >
              <h4 className="text-primary font-weight-bold">MANAGE POLLS</h4>

              <form
                onSubmit={handleSearchSubmit}
                disabled={disabled}
                className="form-inline d-flex"
              >
                <input
                  type="text"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                  className="form-control me-2"
                />
                <Button
                  type="submit"
                  variant="outline-primary"
                  style={{ marginRight: "10px" }}
                >
                  Search
                </Button>
              </form>
              <Button
                style={{ width: "100px" }}
                variant="primary"
                onClick={handleShow}
              >
                Add poll
              </Button>
            </nav>
            {pollsAdmins.length > 0 ? (
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th style={{ padding: "10px" }}>Question</th>
                    <th style={{ padding: "10px" }}>Option1</th>
                    <th style={{ padding: "10px" }}>Option2</th>
                    <th style={{ padding: "10px" }}>Option3</th>
                    <th style={{ padding: "10px" }}>Option4</th>
                    <th style={{ padding: "10px" }}>Created</th>
                    <th style={{ padding: "10px" }}>Updated</th>
                    <th style={{ padding: "10px" }}>Poll Duration</th>
                    <th style={{ padding: "10px" }}>Voters Id</th>
                    <th style={{ padding: "10px" }}>Actions</th>
                  </tr>
                </thead>

                {pollsAdmins.map((poll, index) => {
                  return (
                    <tbody key={index}>
                      <tr>
                        {" "}
                        <td>{poll.question}</td>
                        <td style={{ padding: "10px" }}>
                          <div>
                            <ModalOptionsVotes
                              votes={poll.options[0].votes}
                              optionText={poll.options[0].text}
                            />
                          </div>
                        </td>
                        <td style={{ padding: "10px" }}>
                          <div>
                            <ModalOptionsVotes
                              votes={poll.options[1].votes}
                              optionText={poll.options[1].text}
                            />
                          </div>
                        </td>
                        <td style={{ padding: "10px" }}>
                          <div>
                            <ModalOptionsVotes
                              votes={poll.options[2].votes}
                              optionText={poll.options[2].text}
                            />
                          </div>
                        </td>
                        <td style={{ padding: "10px" }}>
                          <div>
                            <ModalOptionsVotes
                              votes={poll.options[3].votes}
                              optionText={poll.options[3].text}
                            />
                          </div>
                        </td>
                        <td style={{ padding: "10px" }}>{poll.createdAt}</td>
                        <td style={{ padding: "10px" }}>{poll.updatedAt}</td>
                        <td style={{ padding: "10px" }}>
                          {Math.ceil(
                            (new Date(poll.endTime).getTime() -
                              new Date().getTime()) /
                              (1000 * 60 * 60 * 24)
                          ) === 0
                            ? "Expired"
                            : Math.ceil(
                                (new Date(poll.endTime).getTime() -
                                  new Date().getTime()) /
                                  (1000 * 60 * 60 * 24)
                              ) + " days left"}
                        </td>
                        <td style={{ padding: "10px" }}>
                          <ModalVoters voterIds={poll.voters} />
                        </td>
                        <td style={{ padding: "10px" }}>
                          {" "}
                          <div
                            style={{
                              display: "flex",
                              gap: "10px",
                              alignItems: "center",
                            }}
                          >
                            <button
                              className="btn btn-secondary btn-sm"
                              style={{ width: "150px" }}
                            >
                              <Link
                                style={{
                                  color: "white",
                                  textDecoration: "none",
                                }}
                                to={`/poll/edit/${poll._id}`}
                              >
                                Edit Poll Duration
                              </Link>
                            </button>
                            <DeletePoll
                              pollId={poll._id}
                              deletePoll={deletePoll}
                            />
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  );
                })}
              </table>
            ) : search ? (
              <p
                style={{ marginTop: "10px" }}
                className="text-primary font-weight-bold"
              >
                Sorry, it seems there was no match!
              </p>
            ) : pollsAdmins.length === 0 ? (  
              <p
                style={{ marginTop: "10px" }}
                className="text-primary font-weight-bold"
              >
                Actually there are no polls.
              </p>
            ) : null}

            <DeleteAllPollsModal deleteAll={deleteAll}>
              Delete all polls
            </DeleteAllPollsModal>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminList;
