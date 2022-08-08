import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Join from "./components/Join/Join";
import Chat from "./components/Chat/Chat";
// import socketIO from "socket.io-client";

// const ENDPOINT = "http://localhost:4500/";

// const socket = socketIO(ENDPOINT, { transports: ["websocket"] });

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Join />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </Router>
  );
}

export default App;
