import React from "react";
import { Routes, Route} from "react-router-dom";
import Home from "./pages//Home";
import Login from "./pages//Login";
import Signup from "./pages//Signup";
import Chatbot from "./pages//Chatbot";

function App() {
  return (
    <div style={{ minHeight: "1000vh" }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/chatbot" element={<Chatbot />} />
      </Routes>
    </div>
  );
}


export default App;


