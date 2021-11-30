// var socket = require("../../server");

// const joinRoom = ({ chatroomId, currentUser: user }) => {
//     socket.ioObject.sockets.join(chatroomId);
//     console.log(user.username, " joined room ", chatroomId);
//     socket.ioObject.sockets.emit("message", {
//       userId: user.id,
//       username: user.username,
//       text: `Welcome ${user.username}`,
//     });

//     //displays a joined room message to all other room users except that particular user
//     socket.ioObject.sockets.broadcast.to(chatroomId).emit("message", {
//       userId: user.id,
//       username: user.username,
//       text: `${user.username} has joined the chat`,
//     });
// }

// module.exports = {
//     joinRoom,
// }