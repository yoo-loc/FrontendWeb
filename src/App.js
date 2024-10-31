import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./components/Home";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Post from "./components/Post";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/post" element={<Post />} />
            </Routes>
        </Router>
    );
}

export default App;