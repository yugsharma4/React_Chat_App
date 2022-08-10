import React, { useEffect, useRef, useState } from "react";
import { user } from "../Join/Join";
import socketIO from "socket.io-client";
import "./Chat.css";
import sendLogo from "../../images/send-logo.png";
import Message from "../Message/Message";
import ReactScrollToBottom from "react-scroll-to-bottom";
import close from "../../images/close.jpg";

const ENDPOINT = "http://localhost:4500";
let socket;
const Chat = () => {
  socket = socketIO(ENDPOINT, { transports: ["websocket"] });
  const [id, setId] = useState("");
  const [messages, setMessages] = useState([]);

  //Sending message
  const send = () => {
    const message = document.getElementById("chatInput").value;
    socket.emit("message", {
      message,
      id,
    });
    document.getElementById("chatInput").value = "";
  };

  useEffect(() => {
    socket.on("connect", () => {
      setId(socket.id);
    });

    socket.emit("joined", { user });

    socket.on("welcome", (data) => {
      setMessages([...messages, data]);
      //   console.log(data.user, data.message);
    });

    socket.on("userJoined", (data) => {
      setMessages([...messages, data]);
      //   console.log(data.user, data.message);
    });

    socket.on("leave", (data) => {
      setMessages([...messages, data]);
      //   console.log(data.user, data.message);
    });

    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, []);

  useEffect(() => {
    socket.on("sendMessage", (data) => {
      setMessages([...messages, data]);
      //   console.log(data.user, data.message, data.id);
    });

    return () => {
      socket.off();
    };
  }, [messages]);

  return (
    <div className="chatPage">
      <div className="chatContainer">
        <div className="header">
          <h2>Textra</h2>
          <a href="/" className="closeBtn">
            <img src={close} alt="close" />
          </a>
        </div>
        <ReactScrollToBottom className="chatBox">
          {messages.map((item, i) => (
            <Message
              key={i}
              user={item.id == id ? "" : item.user}
              message={item.message}
              classs={item.id === id ? "right" : "left"}
            />
          ))}
        </ReactScrollToBottom>
        <div className="inputBox">
          <input
            onKeyDownCapture={(e) => (e.key == "Enter" ? send() : null)}
            type="text"
            id="chatInput"
          />
          <button onClick={send} className="sendBtn">
            <img src={sendLogo} alt="Send" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
