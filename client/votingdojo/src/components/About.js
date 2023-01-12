import React from "react";

const About = () => {
  return (
    <div class="container mt-5">
      <h1 class="mb-4">About Us</h1>
      <p class="lead">
        Our app features a simple and easy-to-use interface that allows you to
        vote on polls in just a few clicks. You can track the real-time results
        as people cast their votes.
      </p>
      <h2 class="mb-4 mt-5">Our Mission</h2>
      <p>
        Our mission is to use technology to make a difference in people's lives.
        We believe that by creating easy-to-use and intuitive products and
        services, we can help people accomplish more and achieve their goals.
      </p>
      <h2 class="mb-4 mt-5">Our Team</h2>
      <p>
        Our team is made up of skilled professionals with a wide range of
        expertise and experience. From engineers and designers to marketers and
        customer support staff, every member of our team plays a crucial role in
        helping us achieve our mission.
      </p>
      <div class="text-center mt-4 mb-4">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwDtMqmGz3BE8yX0a-jiQUREyHH1enztWn5JxZI2r21_m1jQRhfLT6e0Zqlbut_GrqCxM&usqp=CAU"
          alt="Team photo"
          class="img-fluid rounded-circle"
        />
      </div>
    </div>
  );
};

export default About;
