import { SET_SOCKET } from "./type";

import { io } from "socket.io-client";

const setSocket = () => (dispatch) => {
  const socket = io("http://localhost:8080", {
    auth: {
      token: JSON.parse(localStorage.getItem("user")).accessToken,
    },
    Headers: "Access-Control-Allow-Origin",
  });

  dispatch({
    type: SET_SOCKET,
    payload: { socket: socket },
  });
};

export default setSocket;