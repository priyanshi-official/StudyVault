import React from 'react'
import {FaThLarge} from "react-icons/fa";
import {FaCalendarAlt} from "react-icons/fa";
import {FaFolder} from "react-icons/fa";
import {FaInfoCircle} from "react-icons/fa";
import {FaBook} from "react-icons/fa";

import logo from '../assets/Logo.svg'
import { Link } from 'react-router-dom'
import './PrivateNavbar.css'

const PrivateNavbar = () => {
  return (
    <div className='privateNavbar-container'>

        <div className="privatenav-left">
                <img src={logo} alt="StudyVault"/>
                <h1>Study<span className="accent">Vault</span></h1>
        </div>

        <div className="privatenav-right">
            <p><Link to="/dashboard" className="option"><FaThLarge/>Dashboard</Link></p>
            <p><Link to="/about" className="option"><FaInfoCircle/>About</Link></p>
            <p><Link to="/notes" className="option"><FaBook/>Notes</Link></p>
            <p><Link to="/planner" className="option"><FaCalendarAlt/>Planner</Link></p>
            <p><Link to="/resources" className="option"><FaFolder/>Resources</Link></p>
        </div>
        
    </div>
  )
}

export default PrivateNavbar
