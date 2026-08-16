import React from 'react'
import './Landing.css'
import landingsvg from '../assets/landingsvg.webp'
import { Link } from 'react-router-dom'

const Landing = () => {
  return (
    <div className='landing-page'>

      <div className="landing-left">
        <span className="punch">— PLAN . FOCUS . ACHIEVE —</span>
        <h1>Study<span className="accent">Vault</span></h1>
        <h3>"Plan Smarter. Study Better."</h3>
        <p>Your daily tasks and weekly goals, organized in one place — welcome to StudyVault.</p>
        
        <div className="cta">
          <Link to="/register" className="cta-btn">Get Started</Link>
          <Link to="/login" className="cta-link">Already have an account?</Link>
        </div>
      </div>

      <div className="landing-right">
         <img src={landingsvg} alt="Student with books and backpack" />
      </div>

    </div>
  )
}

export default Landing