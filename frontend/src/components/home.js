import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import AuthServices from "../services/auth.services";
import setSocket from "../actions/socket";
import { logout } from "../actions/auth";
import Chatroom from "./chatroom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faNewspaper,
  faFutbol,
  faGamepad,
  faStethoscope,
  faLaptopCode,
  faUserCircle,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

import "./home.css";

const Home = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const { socket } = useSelector((state) => state.socket);
  const [rooms, setRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState({});
  const dispatch = useDispatch();
  const icons = {
    news: faNewspaper,
    sports: faFutbol,
    gaming: faGamepad,
    medicine: faStethoscope,
    coding: faLaptopCode,
  };

  const updateCurrentRoom = (id, name) => {
    if (currentRoom.id) {
      socket.emit("leaveRoom", { chatroomId: currentRoom.id });
    }
    if (currentRoom.id !== id) {
      socket.emit("joinRoom", {
        chatroomId: id,
        currentUser,
      });
      setCurrentRoom({ id, name });
    }
  };

  const roomLeaveHandler = () => {
    setCurrentRoom({});
  };

  const getRooms = async () => {
    try {
      const res = await AuthServices.getRooms();
      setRooms((prev) => {
        return res;
      });
    } catch (error) {
      console.log(error);
    }
  };

  const logOut = () => {
    socket.disconnect();
    dispatch(logout());
  };

  useEffect(() => {
    dispatch(setSocket());
    getRooms();
  }, []);

  return (
    <div className="container">
      <div className="test row main justify-content-center align-items-center">
        <div className="row main-wrapper">
          <div className="col-sm-12 col-md-auto">
            <div className="user-row">
              <div className="avatar">
                <FontAwesomeIcon icon={faUserCircle} size="3x" />
                <h3>
                  <strong>{currentUser.username.toUpperCase()}</strong>
                </h3>
              </div>
              <button onClick={logOut}>
                <FontAwesomeIcon icon={faSignOutAlt} size="2x" />
              </button>
            </div>
            <ul class="list-group list-group-flush">
              {rooms.map((room, index) => (
                <button className="room-button" onClick={(e) => updateCurrentRoom(room.id, room.name)}>
                  <li class="list-group-item rooms" key={index}>
                    <p className="room-icon">
                      <FontAwesomeIcon icon={icons[room.name]} size="2x" />
                    </p>
                    <div>
                      <strong>{`${room.name[0].toUpperCase()}${room.name.slice(
                        1
                      )}`}</strong>
                      <p className="room-description">{room.description}</p>
                    </div>
                  </li>
                </button>
              ))}
            </ul>
          </div>
          <div className="col equal">
            {currentRoom.name && (
              <Chatroom
                chatroomId={currentRoom.id}
                chatroomName={currentRoom.name}
                roomLeaveHandler={roomLeaveHandler}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

