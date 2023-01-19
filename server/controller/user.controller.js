const User = require('../model/user.model');
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const io = require("socket.io-client");
const socket = io("http://localhost:3000");

passport.use(
    new LocalStrategy((username, password, done) => {
      User.findOne({ username: username })
        .then((user) => {
          if (!user) {
            return done(null, false, {
              message: "Incorrect username or password",
            });
          }
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
              return done(err);
            }
            if (!isMatch) {
              return done(null, false, {
                message: "Incorrect username or password",
              });
            }
            return done(null, user);
          });
        })
        .catch((err) => done(err));
    })
  );
  
  module.exports.registerUser = async (req, res, next) => {
    const { username, password, email, role } = req.body;
    console.log(username);
  
    const saltRounds = 10;
  
    if (username.length === 0 || password.length === 0 || email.length === 0) {
      return res.status(400).json({ messageRequired: "Missing credentials" });
    } else if (username.length < 5) {
      return res
        .status(400)
        .json({ messageUsername: "Username must have at least 5 chars" });
    }
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        messageEmail: "Email entered does not meet format requirements",
      });
    }
    const passwordRegex =
      /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        messagePasswordRegex:
          "Password must have at least 8 chars, including at least one lower and upper case letter, one number and one special char (?%&!@)",
      });
    } else {
      User.findOne({ username: username }).then((unique) => {
        if (unique) {
          return res
            .status(400)
            .json({ messageUnique: "This user already exists" });
        } else {
          (async () => {
            // Technique 1 (generate a salt and hash on separate function calls):
            const salt = await bcrypt.genSalt(saltRounds);
            const hash = await bcrypt.hash(password, salt);
            User.create({
              username,
              password: hash,
              email,
              role,
            })
              .then((userRegistered) =>
                res.status(200).json({
                  message: "Successfully registered",
                  userRegistered,
                })
              )
              .catch((err) => next(err));
          })();
        }
      });
    }
  };
  
  module.exports.logInUser = (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(400).json({ messageBlank: info.message });
      }
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        req.session.userId = user._id;
        res.status(200).json({ message: "Successfully logged in", user });
      });
    })(req, res, next);
  };
  
  module.exports.logOutUser = async (req, res, user) => {
    try {
      const result = await new Promise((resolve, reject) => {
        if (req.session) {
          req.session.destroy((err) => {
            if (err) {
              reject({ message: "Unable to log out", error: err, user });
            } else {
              resolve({ message: "logged out", user });
            }
          });
        } else {
          resolve({ message: "logged out", user });
        }
      });
      res.status(200).json(result);
    } catch (result_1) {
      res.status(400).json(result_1);
    }
  };
  
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser((_id, done) => {
    User.findById(_id)
      .then((user) => done(null, user))
      .catch((err) => done(err));
  });

  module.exports.changePassword = (req, res, next) => {
    const { oldPassword, newPassword } = req.body;
    User.findOne({ _id: req.params.id })
      .then((user) => {
        if (!user) {
          return res.status(401).json({ message: "User not found" });
        }
        bcrypt.compare(oldPassword, user.password, (err, isMatch) => {
          if (err) {
            return next(err);
          }
          if (!isMatch) {
            return res.status(401).json({ message: "Incorrect password" });
          }
          bcrypt.genSalt(10, (err, salt) => {
            if (err) {
              return next(err);
            }
            bcrypt.hash(newPassword, salt, (err, hash) => {
              if (err) {
                return next(err);
              }
              const passwordRegex =
              /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
            if (!passwordRegex.test(newPassword)) {
              return res.status(400).json({
                messagePasswordRegex:
                  "Password must have at least 8 chars, including at least one lower and upper case letter, one number and one special char (?%&!@)",
              })}
              User.findOneAndUpdate(
                { _id: req.params.id },
                { $set: { password: hash } },
                { new: true },
                (err, updatedUser) => {
                  if (err) {
                    return next(err);
                  }
                  return res.status(200).json({ message: "Password changed successfully", updatedUser });
                }
              );
            });
          });
        });
      })
      .catch((err) => next(err));
  }
  
  module.exports.checkAdmin = async (req, res, next) => {
    try {
      if (req.user && req.user.role === "admin") {
        next();
      } else {
        throw new Error("403 Forbidden");
      }
    } catch (error) {
      return res.status(403).json({ message: error.message });
    }
  };
  
  module.exports.checkNormalUser = (req, res, next) => {
    if (req.user && req.user.role === "normal") {
      next();
    } else {
      res.status(403).json({ message: "forbidden" });
    }
  };
  
  module.exports.getNormalUsers = (req, res) => {
    User.find({ role: "normal" })
      .then((user) => {
        res.status(200).json({ message: "user found", user });
      })
      .catch((error) => {
        res.status(400).json({ message: "user found", error });
      });
  };
  
  module.exports.getSearchedUSers = (req, res) => {
    const query = req.query.q;
    User.find(
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
        res.status(404).json({ nopollsfound: "No users found", err })
      );
  };
  
  module.exports.getUser = (req, res) => {
    const { role } = req.body;
    User.findOne(role)
      .then((user) => {
        res.status(200).json({ message: "user found", user });
      })
      .catch((error) => {
        res.status(400).json({ message: "user found", error });
      });
  };
  module.exports.getUserById = (req, res) => {
    User.findById({ _id: req.params.id })
      .then((user) =>
        res.status(200).json({ message: "user by id retrieved", user })
      )
      .catch((err) =>
        res.status(400).json({ message: "user by id not retrieved", err })
      );
  };
  module.exports.getOneUserAndUpdate = (req, res) => {
    const pollId = req.params.id;
    const { username, email } = req.body;
    if (username.length == 0 || email.length == 0) {
      return res.status(400).json({ messageRequired: "Missing credentials" });
    }
    if (username.length < 5) {
      return res
        .status(400)
        .json({ messageUsername: "Username must have at least 5 chars" });
    }
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        messageEmail: "Email entered does not meet format requirements",
      });
    } else {
      User.findByIdAndUpdate(
        { _id: req.params.id },
        { username: username, email: email },
  
        { new: true }
      )
        .then((updatedUser) =>
          res.status(200).json({ message: "Updated succesfully", updatedUser })
        )
        .catch((err) => res.status(400).json({ message: "not updated", err }));
    }
  };
  
  module.exports.deleteUser = (req, res) => {
    const { id } = req.params;
  
    User.findByIdAndDelete(id)
      .then((deletedUser) =>
        res.status(200).json({ message: "user deleted", deletedUser })
      )
      .catch((err) => res.status(400).json({ message: "error", err }));
  };
  
  module.exports.deleteUsers = (req, res) => {
    User.deleteMany()
      .then((users) => res.status(200).json({ message: "deleted", users }))
      .catch((err) => res.status(400).json({ message: "not deleted", err }));
  };
  