import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import {FaBook,FaCheckSquare,FaClock,FaFolderOpen,FaQuoteLeft,FaQuoteRight,} from "react-icons/fa";
import img from "../assets/user.webp";
import "./Dashboard.css";

const Dashboard = () => {

  const [user, setUser] = useState({username: "",email: "",})
  const [profileImage, setProfileImage] = useState(localStorage.getItem("profileImage") || img )

  const [isRunning, setIsRunning] = useState(false)
  const [seconds, setSeconds] = useState(0)

  const [studyTime, setStudyTime] = useState(() => {
    return Number(localStorage.getItem("studyTime")) || 0;
  })

  const [notesCount, setNotesCount] = useState(0)
  const [completedTasks, setCompletedTasks] = useState(0)

  const intervalRef = useRef(null)

  
  const startTimer = () => {
    if (isRunning)
       return
    setIsRunning(true)
    intervalRef.current = setInterval(() => {
      setSeconds((prev) => prev + 1)
    }, 1000)
  }

  const stopTimer = () => {
    clearInterval(intervalRef.current)
    setIsRunning(false)
    setStudyTime((prev) => prev + seconds)
    setSeconds(0)
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (!file)
       return
    const reader = new FileReader()
    reader.onload = () => {
      setProfileImage(reader.result)
      localStorage.setItem("profileImage", reader.result)
    }
    reader.readAsDataURL(file)
  }

  const loadDashboardData = () => {
    const notes = JSON.parse(localStorage.getItem("notes")) || []
    setNotesCount(notes.length)
    const tasks = JSON.parse(localStorage.getItem("tasks")) || []
    setCompletedTasks(
      tasks.filter((task) => task.completed).length
    )
  }


  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);


  useEffect(() => {
    localStorage.setItem("studyTime", studyTime);
  }, [studyTime]);


  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  // Load Notes & Tasks
  useEffect(() => {
    loadDashboardData();
    window.addEventListener("notesUpdated", loadDashboardData);
    window.addEventListener("tasksUpdated", loadDashboardData);
    return () => {
      window.removeEventListener("notesUpdated", loadDashboardData);
      window.removeEventListener("tasksUpdated", loadDashboardData);
    };
  }, []);

  

  return (
    <div className="dashboard_container">
      <div className="dashboard-left">

        <div className="top-left">
          <h1>Welcome back, {user.username}!</h1>
          <p>Let's make today productive</p>
        </div>

        <div className="mid1">
          <div className="card">
            <FaBook className="icon" id="ic1" />
            <h3 id="i1">{notesCount}</h3>
            <p>Notes</p>
          </div>

          <div className="card">
            <FaCheckSquare className="icon" id="ic2" />
            <h3 id="i2">{completedTasks}</h3>
            <p>Tasks Completed</p>
          </div>

          <div className="card">
            <FaClock className="icon" id="ic3" />
            <h3 id="i3">
              {Math.floor(studyTime / 60)}m{" "}
              {studyTime % 60}s
            </h3>
            <p>Study Hours</p>
          </div>
        </div>


        <div className="mid2">
            <h2> Productivity Overview</h2>

            <div className="progress-item">
              <div className="progress-header">
                <span>📝 Notes</span>
                <span>{notesCount}</span>
              </div>

              <div className="progress-bar">
                <div className="progress-fill"
                  style={{
                    width: `${Math.min((notesCount / 20) * 100, 100)}%`,
                  }}></div>
              </div>
            </div>

            <div className="progress-item">
              <div className="progress-header">
                <span>✅ Tasks Completed</span>
                <span>{completedTasks}</span>
              </div>

              <div className="progress-bar">
                <div className="progress-fill"
                  style={{
                    width: `${Math.min((completedTasks / 20) * 100, 100)}%`,
                  }}></div>
              </div>
            </div>

            <div className="progress-item">
              <div className="progress-header">
                <span>⏰ Study Time</span>
                <span>{Math.floor(studyTime / 60)}m {studyTime % 60}s</span>
              </div>

              <div className="progress-bar">
                <div className="progress-fill"
                  style={{
                    width: `${Math.min((studyTime / 18000) * 100, 100)}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>


        <div className="bottom-left">
          <h2>Quick Actions:</h2>
          <div className="bottom">
            <div className="action-cards">
              <FaFolderOpen />
              <Link to="/planner" className="to"><p>Add Task</p></Link>
            </div>

            <div className="action-cards">
              <FaBook />
              <Link to="/notes" className="to"> <p>Add Notes</p> </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-right">

        <div className="top-right">
          <label htmlFor="profile-upload">
            <img src={profileImage} alt="user" className="profile-img" />
          </label>

          <input type="file" id="profile-upload" accept="image/*" onChange={handleImageChange} hidden/>

          <h3>{user.username}</h3>
          <p>{user.email}</p>

        </div>
        <div className="mid-right">
          <FaQuoteLeft className="quoteL" /> <p>
            The beautiful thing about learning is nobody
            can take it away from you.</p>

          <FaQuoteRight className="quoteR" />
        </div>

        <div className="bottom">
          <button type="button" onClick={isRunning ? stopTimer : startTimer}>
            <FaClock /> {isRunning ? " Stop Timer" : " Start Timer"}
          </button>

          <p className="timer-display">
            {Math.floor(seconds / 60)}:
            {(seconds % 60)
              .toString()
              .padStart(2, "0")}
          </p>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;