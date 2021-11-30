const db = require("../models");
const User = db.user;

const checkExistingUsernameOrEmail = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    const email = await User.findOne({ email: req.body.email });
    if (user) {
      res.status(500).send({ message: "Failed! Username is already in use!" });
      return;
    }
    if (email) {
      res.status(500).send({ message: "Failed! Email is already in use!" });
      return;
    }
    next();
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err });
  }
};

const verifySignUp = {
  checkExistingUsernameOrEmail,
};

module.exports = verifySignUp;
