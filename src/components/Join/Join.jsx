import React from "react";
import "./Join.css";
import logo from "../../images/message-circle.svg";

const Join = () => {
  return (
    <div className="joinPage">
      <div className="joinContainer">
        <img src={logo} className="filter-black" alt="chat_logo" />
        <h1>Textra</h1>
        <input type="text" placeholder="Enter your name" id="joinInput" />
        <button type="button" className="joinBtn">
          Login
        </button>
      </div>
    </div>
  );
};

export default Join;
