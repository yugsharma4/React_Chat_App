import React, { useState } from "react";
import "./Join.css";
import logo from "../../images/message-circle.svg";
import { Link } from "react-router-dom";
let user;

const Join = () => {
  const [name, setName] = useState("");

  const sendUser = () => {
    user = document.getElementById("joinInput").value;
    document.getElementById("joinInput").value = "";
  };
  return (
    <div className="joinPage">
      <div className="joinContainer">
        <img src={logo} className="filter-black" alt="chat_logo" />
        <h1>Textra</h1>
        <input
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Enter your name"
          id="joinInput"
        />
        <Link onClick={(e) => (!name ? e.preventDefault() : null)} to="/chat">
          <button onClick={sendUser} type="button" className="joinBtn">
            Login
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Join;
export { user };
