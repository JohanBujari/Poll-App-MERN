const express = require("express");
const app = express();
const port = 8000;
const cors = require("cors");
const http = require("http");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const socket = require('socket.io');

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

const { urlencoded } = require("express");
const passport = require("passport");
app.use(express.json(), urlencoded({ extended: true }));

app.use(require("serve-static")(__dirname + "/../../public"));
app.use(require("cookie-parser")());

app.use(
  require("express-session")({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true,
    expires: new Date(Date.now() + 100), // 1 hour
  })
);

app.use(passport.initialize());
app.use(passport.session());

require("../server/config/config");
try {
  // Require the route modules
  const pollRoutes = require("../server/routes/poll.routes");
  const userRoutes = require("../server/routes/user.routes");

  // Use the exported functions from the route modules
  pollRoutes(app);
  userRoutes(app);
} catch (err) {
  console.error(`Failed to load routes: ${err.message}`);
}

const server = app.listen(port, () => console.log(`Listening on port: ${port}`));
const io = socket(server, {
  cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST', 'PUT'],
      allowedHeaders: ['*'],
      credentials: true,
  }
});
io.on('connection', (socket) => {
  socket.on('vote', arg1 => {
    console.log(arg1)
  })
})

