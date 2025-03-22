import React from "react";
import { Routes, Route} from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";

function App() {
  return (
    <div style={{ minHeight: "100vh" }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
