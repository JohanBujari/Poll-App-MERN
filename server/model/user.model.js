const mongoose = require("mongoose");


const UserSchema = mongoose.Schema({
    username: {
      type: String,
    },
    password: {
      type: String,
    },
    email: {
      type: String,
    },
    role: {
      type: String,
      enum: ["admin", "normal"],
      default: "normal",
    },
    created: {
      type: Date,
      default: Date.now,
    },
    updated: {
      type: Date,
      default: Date.now,
    },
  });
  
  UserSchema.pre("save", (next) => {
    this.updated = Date.now();
    next();
  });

  const User = mongoose.model("User", UserSchema);

  module.exports = User;