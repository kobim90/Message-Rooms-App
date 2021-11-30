const mongoose = require("mongoose");
const Room = mongoose.model(
  "Room",
  new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true}
  })
);

module.exports = Room;