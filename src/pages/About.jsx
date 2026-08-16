import React from 'react'
import { Link } from 'react-router-dom'
import aboutimg from '../assets/about.png'
import {FaBook} from "react-icons/fa";
import {FaCheckSquare} from "react-icons/fa";
import {FaClock} from "react-icons/fa";
import {FaFolderOpen} from "react-icons/fa";
import { FaQuoteLeft} from "react-icons/fa";
import { FaArrowRight} from "react-icons/fa";
import './About.css'
import logo from "../assets/Logo.svg";

const About = () => {
  return (
    <div className='about-container'>
      <div className="section1">
        <div className="sec1-left">
          <h1>About Study<span className="accent">Vault</span></h1>
          <span className="punch">— PLAN . FOCUS . ACHIEVE —</span>
          <p>StudyVault helps students organize notes,
            manage study plans, track progress and
            stay productive from one place.</p>
            <button><Link to="/dashboard">Explore Dashboard</Link></button>
        </div>

        <div className="sec1-right">
              <img src={logo} alt="StudyVault"/>
              <h1>Study<span className="accent">Vault</span></h1>
        </div>
      </div>


      <div className="section2">
                  <div className="card">
                    <FaBook className="icon" />
                    <h3>Smart Notes</h3>
                    <p>Organize all your notes</p>
                  </div>
                  <div className="card">
                    <FaCheckSquare className="icon"/>
                    <h3>Study Planner</h3>
                    <p>Plan your day</p>
                  </div>
                  <div className="card">
                    <FaFolderOpen className="icon"/>
                    <h3>Resources</h3>
                    <p>Saves PDFs</p>
                  </div>
                  <div className="card">
                    <FaClock className="icon" />
                    <h3>Timer</h3>
                    <p>To stay focused</p>
                  </div>
      </div>


      <div className="section3">
        <h1>How Study<span className="accent">Vault</span> Works</h1>
        <div className="cards-sec"><div className="card">
          <h3>Register</h3>
          <p>Create your account and get started</p>
        </div>
        <FaArrowRight className="arrow" />
        <div className="card">
          <h3>Add Notes</h3>
          <p>Create and organize your study notes</p>
        </div>
        <FaArrowRight className="arrow" />
        <div className="card">
          <h3>Plan Tasks</h3>
          <p>Plan your tasks and set your goals</p>
        </div>
        <FaArrowRight className="arrow" />
        <div className="card">
          <h3>Track Progress</h3>
          <p>Track your progress</p>
        </div>
        <FaArrowRight className="arrow" />
        <div className="card">
          <h3>Achieve Goals</h3>
          <p>Achieve your goals</p>
        </div></div>
      </div>

      <div className="section4">
        <h1>Success is the sum of small efforts, repeated day in and day out.</h1>
      </div>


      <div className="footer">
         <p> ©2026 Study<span className='vault'>Vault</span>.  All rights reserved.</p>
      </div>
   </div>
  )
}

export default About
