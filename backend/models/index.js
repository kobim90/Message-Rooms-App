const mongoose = require("mongoose");

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.room = require("./room.model");

db.ROOMS = ["news", "medicine", "sports", "gaming", "coding"];

module.exports = db;
