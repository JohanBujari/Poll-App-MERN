const Poll = require("../model/poll.model");
const User = require("../model/user.model");
const socket = require("socket.io-client")("http://localhost:3000");

module.exports.createPoll = (req, res) => {
  const { question, endTime } = req.body;
  if (question.length < 10) {
    return res
      .status(400)
      .json({ messageLength: "This field must be at least 10 characters" });
  }

  Poll.findOne({ question: question })
    .then((poll) => {
      if (poll) {
        return res
          .status(400)
          .json({ messageUnique: "This poll already exists" });
      }
      Poll.create(req.body)
        .then((pollCreated) =>
          res.status(200).json({ message: "poll created", pollCreated })
        )
        .catch((err) => {
          res.status(400).json({ message: "poll not created", err });
        });
    })
    .catch((err) => {
      res.status(400).json({ message: "Error finding poll", err });
    });
};

module.exports.getAllPolls = (req, res) => {
  Poll.find()
    .then((pollsRetrieved) =>
      res.status(200).json({ message: "polls retrieved", pollsRetrieved })
    )
    .catch((err) =>
      res.status(400).json({ message: "polls not retrieved", err })
    );
};

module.exports.getPolls = (req, res) => {
  Poll.find()
    .sort({ createdAt: -1 })
    .then((pollsRetrieved) =>
      res.status(200).json({ message: "polls retrieved", pollsRetrieved })
    )
    .catch((err) =>
      res.status(400).json({ message: "polls not retrieved", err })
    );
};
module.exports.getPollsFromLatestToEarliest = (req, res) => {
  Poll.find()
    .sort({ createdAt: 1 })
    .then((pollsRetrieved) =>
      res.status(200).json({ message: "polls retrieved", pollsRetrieved })
    )
    .catch((err) =>
      res.status(400).json({ message: "polls not retrieved", err })
    );
};

module.exports.getSearchedPolls = (req, res) => {
  const query = req.query.q;
  Poll.find(
    {
      $text: {
        $search: query,
        $caseSensitive: false,
        $diacriticSensitive: false,
      },
    },
    { score: { $meta: "textScore" } }
  )
    .sort({ score: { $meta: "textScore" } })
    .then((polls) => res.status(200).json(polls))
    .catch((err) =>
      res.status(404).json({ nopollsfound: "No polls found", err })
    );
};

module.exports.getPollsWithMostVotes = (req, res) => {
  Poll.find()
    .sort({ "options.votes": -1 })
    .limit(3)
    .exec()
    .then((pollsRetrieved) =>
      res.status(200).json({ message: "polls retrieved", pollsRetrieved })
    )
    .catch((err) =>
      res.status(400).json({ message: "polls not retrieved", err })
    );
};
module.exports.getTheMostVotedPoll = (req, res) => {
  Poll.find()
    .sort({ "options.votes": -1 })
    .limit(1)
    .exec()
    .then((pollsRetrieved) =>
      res.status(200).json({ message: "polls retrieved", pollsRetrieved })
    )
    .catch((err) =>
      res.status(400).json({ message: "polls not retrieved", err })
    );
};

module.exports.vote = (req, res) => {
  const userId = req.session.userId;
  User.findById(userId).then((user) => {
    req.session.userId = userId;
  });

  Poll.findOne({ _id: req.params.id })
    .then((poll) => {
      if (Date.now() > poll.endTime) {
        // Poll has ended, do not allow user to vote
        return res.status(400).json({
          messagePollEnded: "This poll has ended, you can no longer vote",
        });
      }

      // Check if user has already voted for this poll
      if (poll.voters.includes(userId)) {
        return res
          .status(400)
          .json({ messageAlreadyVoted: "You have already voted at this poll" });
      }

      // Poll is still active and user has not already voted, allow user to vote
      Poll.findOneAndUpdate(
        {
          _id: req.params.id,
          "options._id": req.params.optionId,
        },
        {
          $inc: { "options.$.votes": 1 },
          $push: { voters: req.session.userId },
        },
        { new: true }
      )
        .then((updatedPoll) => {
          const option = updatedPoll.options.find(
            (option) => option._id == req.params.optionId
          );
          const votes = option.votes;
          socket.emit("vote", votes);
          console.log(votes);

          req.session.votedPollId = req.params.id;
          res.status(200).json({ message: "voted succesfully", updatedPoll });
          User.findByIdAndUpdate(
            userId,
            { $push: { polls: updatedPoll._id } },
            { new: true }
          ).populate("polls");
        })
        .catch((err) => res.json(err));
    })
    .catch((err) => res.json(err));
};

module.exports.getOnePollById = (req, res) => {
  const pollId = req.params.id;
  Poll.findById(pollId)
    .then((poll) => res.status(200).json({ message: "poll retrieved", poll }))
    .catch((err) => res.status(400).json({ message: "not retrieved", err }));
};

module.exports.updatePollDuration = (req, res) => {
  const { endTime } = req.body;
  const pollId = req.params.id;

  Poll.findByIdAndUpdate(pollId, { endTime: endTime }, { new: true })
    .then((poll) => res.status(200).json({ message: "poll updated", poll }))
    .catch((err) => res.status(400).json({ message: "not updated", err }));
};

module.exports.deletePoll = (req, res) => {
  const pollId = req.params.id;
  Poll.findByIdAndDelete(pollId)
    .then((poll) => res.status(200).json({ message: "deleted", poll }))
    .catch((err) => res.status(400).json({ message: "not deleted", err }));
};

module.exports.deletePolls = (req, res) => {
  Poll.deleteMany()
    .then((polls) => res.status(200).json({ message: "deleted", polls }))
    .catch((err) => res.status(400).json({ message: "not deleted", err }));
};
