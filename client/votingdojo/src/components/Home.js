import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container mt-5">
      <h1 className="mb-4">Vote now on the latest polls</h1>
      <body>
        <p className="lead">
          With our poll app, you can quickly and easily vote on latest polls on
          almost any topic .Whether you're looking to get feedback on a new
          product, gather opinions on a current event, or just want to have some
          fun with friends and family, our poll app has you covered.
        </p>
        <div class="row mt-4">
          <div class="col-md-6">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqFnBKEW5djs20GpN-9m1Ev9lnq9LT8aV57IIISR9eqq2rl4nN4hyDV8JlaiK7IU_TGPg&usqp=CAU"
              alt="Screenshot of poll app interface"
              className="img-fluid"
              style={{ width: "500px", marginLeft: "370px" }}
            />
          </div>
        </div>
        <div class="text-center mt-4">
          <p>
            Voting on a poll is fast and easy. Just{" "}
            <Link className="font-weight-bold" to="/signup">
              sign up for a free account
            </Link>{" "}
            and start doing it in minutes.
          </p>
          <button className="btn btn-primary mt-3">
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/signup"
            >
              Sign up for a free account
            </Link>
          </button>
          <p style={{ marginTop: "10px" }}>
            {" "}
            <Link to="/login">Or you can log in</Link>
          </p>
        </div>
      </body>
      <footer className=" py-3 mt-5">
        <div classNAme="container">
          <p className="text-center m-0">
            Copyright &copy; EasyPolls. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
