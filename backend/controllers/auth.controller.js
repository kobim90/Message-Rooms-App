const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Room = db.room;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

const signup = async (req, res) => {
  try {
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });
    await user.save(user);
    res.send({ message: "User was registered successfully!" });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const signin = async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
    });
    let validPassword = bcrypt.compareSync(req.body.password, user.password);

    if (!validPassword)
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });

    let token = jwt.sign({ id: user.id }, config.secret);
    res.status(200).send({
      id: user._id,
      username: user.username,
      email: user.email,
      accessToken: token,
    });
  } catch (error) {
    res.status(500).send({ message: "User not found" });
  }
};

const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find({});
    const roomsMap = [];
    rooms.forEach((room) => {
      roomsMap.push({
        id: room._id,
        name: room.name,
        description: room.description,
      });
    });
    res.status(200).send(roomsMap);
  } catch (error) {
    res.status(500).send({ message: "Rooms not found" });
  }
};

module.exports = {
  signup,
  signin,
  getRooms,
};
