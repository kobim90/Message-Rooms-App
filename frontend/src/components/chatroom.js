import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidv4 } from 'uuid';

import "./chatroom.css";

const Chatroom = ({ chatroomId, chatroomName, roomLeaveHandler }) => {
  const { socket } = useSelector((state) => state.socket);
  const { user: currentUser } = useSelector((state) => state.auth);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const messagesEndRef = useRef(null);

  const sendData = () => {
    if (text.trim() !== "") {
      const message = {
        id: uuidv4(),
        userId: currentUser.id,
        username: currentUser.username,
        text,
        delivered: false,
        seen: false,
      };
      socket.emit("chat", { ...message, room: chatroomId });
      setText("");
      setMessages((prev) => [...prev, message]);
    }
  };

  const leaveRoomHandler = () => {
    socket.emit("leaveRoom", { chatroomId, currentUser });
    roomLeaveHandler();
  };

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // socket.emit("joinRoom", {
    //   chatroomId,
    //   currentUser,
    // });

    socket.on("message", function (data) {
      setMessages((prev) => [...prev, data]);
    });
  }, []);

  useEffect(() => {
    socket.on("message1", function (data) {
      setMessages((prev) => {
        let tmp = [...prev];
        console.log(prev[prev.length - 1].delivered);
        if (prev[prev.length - 1].id === data.id && prev[prev.length - 1].delivered !== data.delivered) {
          tmp.pop();
        }
        return [...tmp, data];
      });
    });
  }, [socket]);

  useEffect(scrollToBottom, [messages]);

  useEffect( () =>{
    setMessages([])
  }, [chatroomId])

  return (
    <>
      <div className="chat container-fluid">
        <div>
          <div className="row room-name">
            <h2>
              <span style={{marginLeft: "1rem"}}>{`${chatroomName[0].toUpperCase()}${chatroomName.slice(1)}`}:</span>
            </h2>
          </div>
          
        </div>
        <div className="chat-message">
            {messages.map((i) => {
              if (i.username === currentUser.username) {
                return (
                  <div className="row">
                    <div className="message col-sm-auto">
                      <p>
                        {i.text}
                        <span>
                          {i.delivered ? (
                            <>
                              <FontAwesomeIcon icon={faCheck} />
                              <FontAwesomeIcon icon={faCheck} />
                            </>
                          ) : (
                            <FontAwesomeIcon icon={faCheck} />
                          )}
                        </span>
                      </p>
                    </div>
                  </div>
                );
              } else {
                return (
                  <div className="row">
                    <div className="col"></div>
                    <div className="message mess-right col-sm-auto">
                      <span>{i.username}</span>
                      <p>
                        {i.text}
                        <span>
                          {i.delivered ? (
                            <>
                              <FontAwesomeIcon icon={faCheck} />
                              <FontAwesomeIcon icon={faCheck} />
                            </>
                          ) : (
                            <FontAwesomeIcon icon={faCheck} />
                          )}
                        </span>{" "}
                      </p>
                    </div>
                  </div>
                );
              }
            })}
            <div ref={messagesEndRef} />
          </div>
        <div class="input-group send-message">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                sendData();
              }
            }}
            class="form-control"
            placeholder="Message"
          />
          <button
            class="btn btn-success btn-chat"
            type="button"
            onClick={sendData}
          >
            Send
          </button>
          <button
            class="btn btn-danger btn-chat"
            onClick={leaveRoomHandler}
            type="button"
          >
            Leave Room
          </button>
        </div>
      </div>
    </>
  );
};

export default Chatroom;
