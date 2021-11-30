const express = require("express");
const cors = require("cors");
const app = express();
const dbConfig = require("./config/db.config");
const socket = require("socket.io");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const authJwt = require("./middlewares/authJwt")
// const socketController = require("./controllers/socket_controller/auth.controller")
// const dotenv = require("dotenv");
// dotenv.config();

var corsOption = {
  origin: "*",
};

app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'views')));

const db = require("./models");
const Room = db.room;

const connect = async () => {
  try {
    await db.mongoose.connect(process.env.CONNECTION);

    console.log("Successfully connect to MongoDB.");
    // initial();
  } catch (error) {
    console.error("Connection error", error);
    process.exit();
  }
};

connect();

// creating rooms
function initial() {
  for (const room of db.ROOMS) {
    new Room({
      name: room,
      description: `Everything related to ${room}...`
    }).save((err) => {
      if (err) {
        console.log("error", err);
      }
      console.log("added 'room' to rooms collection");
    });
  }
}

app.get("/", (req, res) => {
  res.json({ message: "Welcome to message application." });
});

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

app.use("/auth", authRoutes);
app.use("/user", userRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'views', 'index.html'));
})

const io = socket(server, {
  cors: {
    origin: "*",
  },
});


const wrap = middleware => (socket, next) => middleware(socket, next);

io.use (wrap(authJwt.checkTokenSocket));

io.on("connection", (socket) => {
  console.log("Connected: " + socket.userId);

  socket.on("disconnect", () => {
    console.log("Disconnected: " + socket.userId);
  });

  // join room
  socket.on("joinRoom", ({ chatroomId, currentUser: user }) => {
    socket.join(chatroomId);
    console.log(user.username, " joined room ", chatroomId);
    socket.emit("message", {
      userId: user.id,
      username: user.username,
      text: `Welcome ${user.username}`,
    });

    //displays a joined room message to all other room users except that particular user
    socket.broadcast.to(chatroomId).emit("message", {
      userId: user.id,
      username: user.username,
      text: `${user.username} has joined the chat`,
    });
  });

  // socket.on("joinRoom", socketController.joinRoom)

  //user sending message
  socket.on("chat", (data) => {
    io.to(data.room).emit("message1", {
      ...data,
      delivered: true,
    });
  });

  // marks seen message
  socket.on("markSeen", function (data) {
    socket.emit("markedSeen", {
      ...data,
      seen: true,
    });
  });

  // leave current room
  socket.on("leaveRoom", ({ chatroomId, currentUser: user}) => {
    socket.leave(chatroomId);
    console.log("A user left chatroom: " + chatroomId);
  });
});

const socketIoObject = io;
module.exports.ioObject = socketIoObject;