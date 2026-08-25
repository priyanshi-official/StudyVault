import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Landing from "./pages/Landing.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

import PrivateLayout from "./layouts/PrivateLayout.jsx";
import PublicLayout from "./layouts/PublicLayout.jsx";

import Dashboard from "./pages/Dashboard.jsx";
import About from "./pages/About.jsx";
import Notes from "./pages/Notes.jsx";
import Planner from "./pages/Planner.jsx";
import Resources from "./pages/Resources.jsx";


const App = () => {
  return (
    <div className="app-container">
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route element={<PrivateLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/planner" element={<Planner />} />
          <Route path="/resources" element={<Resources />} />
          
        </Route>
      </Routes>
    </div>
  );
};

export default App;
