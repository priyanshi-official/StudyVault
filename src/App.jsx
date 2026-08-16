import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Landing from "./Pages/Landing.jsx";
import Login from "./Pages/Login.jsx";
import Register from "./Pages/Register.jsx";

import PrivateLayout from "./layouts/PrivateLayout.jsx";
import PublicLayout from "./layouts/PublicLayout.jsx";

import Dashboard from "./Pages/Dashboard.jsx";
import About from "./Pages/About.jsx";
import Notes from "./Pages/Notes.jsx";
import Planner from "./Pages/Planner.jsx";
import Resources from "./Pages/Resources.jsx";


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
