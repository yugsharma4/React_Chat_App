import React, { useEffect, useState } from "react";
import { user } from "../Join/Join";
import socketIO from "socket.io-client";
import "./Chat.css";
import sendLogo from "../../images/send-logo.png";

const ENDPOINT = "http://localhost:4500";
let socket;
const Chat = () => {
  socket = socketIO(ENDPOINT, { transports: ["websocket"] });
  const [id, setId] = useState("");

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
      console.log(data.user, data.message);
    });

    socket.on("userJoined", (data) => {
      console.log(data.user, data.message);
    });

    socket.on("leave", (data) => {
      console.log(data.user, data.message);
    });

    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, []);

  useEffect(() => {
    socket.on("sendMessage", (data) => {
      console.log(data.user, data.message, data.id);
    });
  }, []);

  return (
    <div className="chatPage">
      <div className="chatContainer">
        <div className="header"></div>
        <div className="chatBox"></div>
        <div className="inputBox">
          <input type="text" id="chatInput" />
          <button onClick={send} className="sendBtn">
            <img src={sendLogo} alt="Send" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
