import {combineReducers} from "redux";
import auth from "./auth";
import message from "./message";
import socket from "./socket";

export default combineReducers({
    auth,
    message,
    socket
});