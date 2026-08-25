import React from 'react'
import image2 from '../assets/register1.jpg'
import './Register.css'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

const Register = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")

  let valid = true

  function Submit(e){
    e.preventDefault();
    if(username === ""){
      setUsernameError("Inavlid username")
      valid = false
    }
    if(email ==="" || !email.includes('@')){
      setEmailError("Invalid email")
      valid = false
    }
    if(password === "" || password.length < 8){
      setPasswordError("Incorrect password")
      valid = false
    }
    
    if(valid){
      const user={username,
        email
      }

      localStorage.setItem("user", JSON.stringify(user))
      navigate("/dashboard")
    }
  }


  return (
    <div className='register'>
    
          <div className="register-left">
            <img src={image2} alt="" />
          </div>
    
          <div className="register-right">
            <h2>Create Your Account </h2>
            <h5>Start organizing your study life today.</h5>
    
            <form onSubmit={Submit}>
                <label htmlFor="username">Username</label>
                <input type="text" name="username" id="username" className='inp' placeholder='Enter your Username'
                value={username} onChange={(e)=>{
                  setUsername(e.target.value)
                  setUsernameError("")}}/>
                <p className='error'>{usernameError}</p>

                <label htmlFor="email">Email Address</label>
                <input type="email" name="email" id="email" className='inp' placeholder='Enter your Email Address'
                value={email}  onChange={(e)=>{
                  setEmail(e.target.value)
                  setEmailError("")}}/>
                <p className='error'>{emailError}</p>

                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" className='inp' placeholder='Enter your Password' 
                value={password} onChange={(e)=>{
                  setPassword(e.target.value)
                  setPasswordError("")}}/>
                <p className='error'>{passwordError}</p>
    
                <input type="submit" value="Register" className='register_btn'/>

                <p className='login-text'>Already have an account?
                <Link to="/login" className='login-link'>Login</Link> </p>
            </form>
    
          </div>
        </div>
  )
}

export default Register
