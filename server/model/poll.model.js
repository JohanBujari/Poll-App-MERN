const mongoose = require("mongoose");


const VotingSchema = mongoose.Schema(
    {
      question: {
        type: String,
      },
      options: [
        {
          text: {
            type: String,
          },
          votes: {
            type: Number,
            default: 0,
          },
        },
      ],
      endTime: {
        type: Date,
      },
      voters: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    },
  
    { timestamps: true }
  );

  const Poll = mongoose.model("Voting", VotingSchema);

  module.exports = Poll;