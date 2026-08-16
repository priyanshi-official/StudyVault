import React from 'react'
import logo from '../assets/Logo.svg'
import './Navbar.css'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='nav'>

      <div className="nav-left">
        <img src={logo} alt="StudyVault"/>
        <h1>Study<span className="accent">Vault</span></h1>
      </div>

    <div className="nav-right">
        
        <button className='btn'><Link to="/register" className='buttons'>Register</Link></button>
        <button  className='btn'><Link to="/login" className='buttons'>Login</Link></button>
    </div>

    </div>
  )
}
export default Navbar
