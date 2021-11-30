const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
// const db = require("../models");

const checkToken = (req, res, next) => {
  console.log("check token");
  let token = req.headers["x-access-token"];

  if (!token) return res.status(403).send({ message: "NO Token" });

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) return res.status(401).send({ message: "Unauthorized!!!" });
    req.userId = decoded.id;
    next();
  });
};

const checkTokenSocket = (socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) next(new Error("unauthorized"));
  const decoded = jwt.verify(token, config.secret);
  socket.userId = decoded.id;
  console.log("authenticated", socket.userId);
  next();
};

const authJwt = {
  checkToken,
  checkTokenSocket
};

module.exports = authJwt;
