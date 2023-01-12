const VotingController = require('../controller/poll.controller');
const UserController = require('../controller/user.controller');

module.exports = (app) => {
    
    //Admin and Normal Users Routes
app.post("/api/register", UserController.registerUser);
app.post("/api/login", UserController.logInUser);
app.delete("/api/logout", UserController.logOutUser);
app.get("/api/user", UserController.getUser);
app.put("/api/user/edit/:id", UserController.getOneUserAndUpdate);
app.get('/api/user/:id', UserController.getUserById);

//ADMIN ROUTES

//users
app.get(
  "/api/admin/normal-users",
  UserController.checkAdmin,
  UserController.getNormalUsers
);
app.get(
  "/api/admin/searchedUsers",
  UserController.checkAdmin,
  UserController.getSearchedUSers
);
app.delete(
  "/api/admin/users/delete/:id",
  UserController.checkAdmin,
  UserController.deleteUser
);
app.delete(
  "/api/admin/users/delete",
  UserController.checkAdmin,
  UserController.deleteUsers
);
  };
  


