import React from 'react'
import image1 from '../assets/login1.jpg'
import { Link, useNavigate } from 'react-router-dom'
import './Login.css'
import { useState } from 'react'

const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")

  function Login(e){
    e.preventDefault()

    let valid=true
    setEmailError("")
    setPasswordError("")

    if(email ==="" || !email.includes('@')){
      setEmailError("Invalid email")
      valid = false
    }
    if(password === "" || password.length < 8){
      setPasswordError("Incorrect password")
      valid = false
    }
    
    if(valid){
      navigate("/dashboard")
    }
  }

  return (
    <div className='login'>

      <div className="login-left">
        <img src={image1} alt="" />
      </div>

      <div className="login-right">
        <h2>Welcome to StudyVault..!</h2>
        <h3>Login</h3>

        <form onSubmit={Login}>
            <label htmlFor="email">Email Address</label>
            <input type="email" name="email" id="email" className='inp'placeholder='Enter your Email Address'
            value={email} onChange={(e)=>{
              setEmail(e.target.value)
              setEmailError("")}}/>
            <p className='error'>{emailError}</p>

            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" className='inp' placeholder='Enter your Password'
            value={password}  onChange={(e)=>{
              setPassword(e.target.value)
              setPasswordError("")}}/>
            <p className='error'>{passwordError}</p>

            <input type="submit" value="Login" className='login_btn'/>

            <p className='signup-text'>Don't have an account?{" "}
            <Link to="/register" className='signup-link'>Register</Link>
            </p>
</form>

      </div>
    </div>
  )
}

export default Login
