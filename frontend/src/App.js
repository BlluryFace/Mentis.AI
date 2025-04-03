import React from "react";
import { Routes, Route} from "react-router-dom";
import Home from "./pages//Home";
import Login from "./pages//Login";
import Companion from "./pages//Companion";
import Signup from "./pages//Signup";


function App() {
  return (
    <div style={{ minHeight: "1000vh" }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/companion" element={<Companion />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}


export default App;