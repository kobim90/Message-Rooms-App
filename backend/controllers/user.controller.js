const db = require("../models");
const User = db.user;
const Room = db.room;

const getUser = async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
    });
    if (!user) {
      res.status(500).send({ message: "User not found" });
      return;
    }
    res.status(200).send({
      id: user._id,
      username: user.username,
      email: user.email,
    });
  } catch (err) {
    res.status(403).send({ message: err.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    if (!users) {
      res.status(500).send({ message: "Users not found" });
      return;
    }
    const usersMap = [];
    users.forEach((user) => {
      usersMap.push({
        id: user._id,
        username: user.username,
        email: user.email,
      });
    });

    res.status(200).send(usersMap);
  } catch (err) {
    res.status(403).send({ message: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.deleteOne({ username: req.body.username });
    if (!user) {
      res.status(500).send({ message: "Users not found" });
      return;
    }
    res.status(200).send({ message: "User deleted!" });
  } catch (err) {
    res.status(403).send({ message: err.message });
  }
};

const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find({});
    if (!rooms) {
      res.status(500).send({ message: "Rooms not found" });
      return;
    }
    const roomsMap = [];
    rooms.forEach((room) => {
      roomsMap.push({
        id: room._id,
        name: room.name,
      });
    });

    res.status(200).send(roomsMap);
  } catch (err) {
    res.status(403).send({ message: err.message });
  }
};

module.exports = {
  getUser,
  getUsers,
  deleteUser,
  getRooms,
};
