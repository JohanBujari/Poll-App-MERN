const VotingController = require('../controller/poll.controller');
const UserController = require('../controller/user.controller');

module.exports = (app) => {
    app.get("/api/polls",UserController.checkNormalUser, VotingController.getPolls);
    app.get("/api/polls-1",UserController.checkNormalUser,  VotingController.getPollsFromLatestToEarliest);
  app.get("/api/polls/:id",UserController.checkNormalUser, VotingController.getOnePollById);
  app.get("/api/polls-most-votes",UserController.checkNormalUser, VotingController.getPollsWithMostVotes);
  app.get("/api/most-voted-poll",UserController.checkNormalUser,  VotingController.getTheMostVotedPoll);


  app.get(
    "/api/admin/list-polls",
    UserController.checkAdmin,
    VotingController.getAllPolls
  );
  app.delete(
    "/api/admin/polls/delete/:id",
    UserController.checkAdmin,
    VotingController.deletePoll
  );
  app.delete(
    "/api/admin/polls/delete",
    UserController.checkAdmin,
    VotingController.deletePolls
  );
  app.post(
    "/api/admin/polls/new",
    UserController.checkAdmin,
    VotingController.createPoll
  );
  app.put(
    "/api/admin/edit-poll/:id",
    UserController.checkAdmin,
    VotingController.updatePollDuration
  );
  app.get(
    "/api/admin/poll/:id",
    VotingController.getOnePollById
  );
  app.get(
    "/api/poll/:id",
    VotingController.getOnePollById
  );
  app.get(
    "/api/admin/searchedPolls",
    UserController.checkAdmin,
    VotingController.getSearchedPolls
  );

  //USER ROUTES
  app.put(
    "/api/polls/:id/vote/:optionId",
    UserController.checkNormalUser,
    VotingController.vote
  );
    
  };
  

